import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { File as MulterFile } from "multer";
import { FileUploadService } from "./file-upload.service";

@Controller("file-upload")
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post("/extract-data-types")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: MulterFile) {
    return this.fileUploadService.extractDataTypes(file);
  }
}
