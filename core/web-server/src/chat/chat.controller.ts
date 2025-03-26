import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { ChatService } from "./chat.service";
import { ChatDto } from "./chat.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/")
  async uploadFile(@Body() chatDto: ChatDto, @Res() res: Response) {
    const streamingResponse = await this.chatService.chat(chatDto);
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
