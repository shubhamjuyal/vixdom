import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { Response } from "express";
import { ChatService } from "./chat.service";
import { ChatDto } from "./chat.dto";
import { File as MulterFile } from "multer";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/")
  async uploadFile(
    @UploadedFile() file: MulterFile,
    @Body() chatDto: ChatDto,
    @Res() res: Response
  ) {
    // console.log("chatDto: ", chatDto);
    // // extract file data
    // const fileData = this.chatService.extractSheetData(file);
    // if (!fileData) throw new BadRequestException("File is not provided");
    // //return stram response
    const streamingResponse = await this.chatService.chat(
      chatDto /*, fileData*/
    );
    res.setHeader("Content-Type", "text/event-stream");
    if (streamingResponse.body) {
      streamingResponse.body.pipeTo(
        new WritableStream({
          write(chunk) {
            res.write(chunk);
          },
          close() {
            res.end();
          },
        })
      );
    }
  }
}
