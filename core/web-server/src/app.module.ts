import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FileUploadController } from "./file-upload/file-upload.controller";
import { FileUploadService } from "./file-upload/file-upload.service";
import { ChatController } from "./chat/chat.controller";
import { ChatService } from "./chat/chat.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Allows access to env variables globally
    }),
  ],

  controllers: [AppController, FileUploadController, ChatController],
  providers: [AppService, FileUploadService, ChatService],
})
export class AppModule {}
