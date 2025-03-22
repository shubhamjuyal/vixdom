import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { File as MulterFile } from "multer";

@Controller("file-upload")
export class FileUploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: (req, file, callback) => {
        // Validate for csv
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(
            new BadRequestException("Only CSV files are allowed!"),
            false
          );
        }
        callback(null, true);
      },
    })
  )
  uploadFile(@UploadedFile() file: MulterFile) {
    if (!file) {
      throw new BadRequestException("File is not provided");
    }
    const fileContent = file.buffer.toString("utf8");
    const firstLine = fileContent.split(/\r?\n/)[0];
    const headers = firstLine.split(",").map((header) => header.trim());

    return {
      message: "File upload successfully.",
      fileName: file.originalname,
      headers: headers.map((_) => {
        return { name: _, dataType: "Text" };
      }),
    };
  }
}
