import { IsString, IsNotEmpty } from "class-validator";

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsNotEmpty()
  messages: {
    role: string;
    content: string;
  }[];
}
