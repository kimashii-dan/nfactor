import getAIResponse from "@/api/chatbot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Chat } from "@/shared/types";
import { useChatsStore } from "@/store/useChatsStore";
import { useMutation } from "@tanstack/react-query";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useLocation } from "react-router";

type Message = {
  content: string;
  role: string;
  id: string;
};

function App() {
  const location = useLocation();
  const name = location.pathname.split("/").pop();
  const { chats } = useChatsStore();
  const currentChat = chats.find(
    (chat: Chat) => chat.url === location.pathname
  );

  const storageKey = `messages_${currentChat?.url || "default"}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const { isPending, mutate: sendToAI } = useMutation({
    mutationFn: (message: string) => getAIResponse(message),
    onSuccess: (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: new Date().toLocaleTimeString(),
          content: data ?? "Sorry, I couldn't generate a response.",
          role: "ai",
        },
      ]);
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      let initialMessage: Message;
      if (currentChat?.type === "person") {
        initialMessage = {
          content: `Hi, let's be friends. My name is ${name}. What is your name?`,
          role: "person",
          id: new Date().toLocaleTimeString(),
        };
      } else {
        initialMessage = {
          content: `Hi, I am AI assistant. Ask anything!`,
          role: "ai",
          id: new Date().toLocaleTimeString(),
        };
      }
      setMessages([initialMessage]);
    }
  }, [currentChat?.type, name, storageKey]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const userMessage = {
      id: new Date().toLocaleTimeString(),
      content: inputMessage,
      role: "user" as const,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");

    if (currentChat?.type === "ai") {
      sendToAI(inputMessage);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] w-full max-w-[700px] mx-auto">
      <ScrollArea className=" flex items-center overflow-hidden flex-1">
        <div className="flex flex-col p-5">
          {messages.map((message, index) => (
            <Card
              key={index}
              className={`bg-accent  rounded-md mb-3 p-3 gap-0 w-fit max-w-2/3 ${
                message.role === "user" ? "self-end" : "self-start"
              }`}
            >
              <h3>{message.content}</h3>
              <p className="text-gray-400">{message.id}</p>
            </Card>
          ))}
          {isPending && <div className="animate-pulse">loading...</div>}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form
          onSubmit={handleSendMessage}
          className="flex justify-center items-center gap-2"
        >
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="bg-background"
          />
          <Button variant="secondary" type="submit" className="">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
