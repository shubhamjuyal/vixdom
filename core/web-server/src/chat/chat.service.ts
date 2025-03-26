import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";
import { Injectable } from "@nestjs/common";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatDto } from "./chat.dto";
import { ChatOpenAI } from "@langchain/openai";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { formatDocumentsAsString } from "langchain/util/document";
import { ConfigService } from "@nestjs/config";

const loader = new JSONLoader("src/data/states.json", [
  "/state",
  "/code",
  "/nickname",
  "/website",
  "/admission_date",
  "/admission_number",
  "/capital_city",
  "/capital_url",
  "/population",
  "/population_rank",
  "/constitution_url",
  "/twitter_url",
]);

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `Answer the user's questions based only on the following context. If the answer is not in the context, reply politely that you do not have that information available.:
==============================
Context: {context}
==============================
Current conversation: {chat_history}

user: {question}
assistant:`;

@Injectable()
export class ChatService {
  constructor(private configService: ConfigService) {}
  async chat(req: ChatDto) {
    try {
      const { sessionId, messages } = req;
      const apiKey = this.configService.get<string>("OPENAI_API_KEY");
      const formattedPreviousMessages = messages
        .slice(0, -1)
        .map(formatMessage);
      const currentMessageContent = messages[messages.length - 1].content;
      const docs = await loader.load();
      const prompt = PromptTemplate.fromTemplate(TEMPLATE);
      const model = new ChatOpenAI({
        apiKey: apiKey,
        model: "gpt-3.5-turbo",
        temperature: 0,
        streaming: true,
        verbose: true,
      });
      const parser = new HttpResponseOutputParser();
      const chain = RunnableSequence.from([
        {
          question: (input) => input.question,
          chat_history: (input) => input.chat_history,
          context: () => formatDocumentsAsString(docs),
        },
        prompt,
        model,
        parser,
      ] as any);
      const stream = await chain.stream({
        chat_history: formattedPreviousMessages.join("\n"),
        question: currentMessageContent,
      });

      return new StreamingTextResponse(
        stream.pipeThrough(createStreamDataTransformer())
      );
    } catch (e: any) {
      return Response.json({ error: e.message }, { status: e.status ?? 500 });
    }
  }
}
