"use client";

import { useState, useRef, useEffect, KeyboardEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  text: string;
  sender: "bot" | "user";
}

const replies: { [key: string]: string } = {
  hello: "Hey, what's up?",
  "how are you?": "I'm finen, thank you.",
};

export const Chat: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);

  // Ref to scroll to the bottom of the chat messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const newUserMessage: Message = { text: trimmedInput, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    const reply = replies[trimmedInput.toLowerCase()];
    if (reply) {
      const newBotMessage: Message = { text: reply, sender: "bot" };
      // Simulate a slight delay for the bot reply
      setTimeout(() => {
        setMessages((prev) => [...prev, newBotMessage]);
      }, 500);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="flex flex-col w-full max-w-xl h-full">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`
                w-full px-4 py-3 rounded-lg 
                ${
                  message.sender === "bot"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-white text-gray-900"
                }
              `}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input & Send Button */}
        <form onSubmit={handleSubmit} className="w-full px-4 py-2">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
