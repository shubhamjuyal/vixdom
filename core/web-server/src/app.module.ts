import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FileUploadController } from './file-upload/file-upload.controller'
import { FileUploadService } from './file-upload/file-upload.service'

@Module({
  imports: [],
  controllers: [AppController, FileUploadController],
  providers: [AppService, FileUploadService],
})
export class AppModule {}
