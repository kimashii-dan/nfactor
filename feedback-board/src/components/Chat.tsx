import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { useFeedbackStore } from "@/store/feedbackStore";
import type { ChatMessage, Feedback } from "@/types";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectGroup } from "@radix-ui/react-select";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello there! Welcome to the feedback board! Select a feedback to get an explanation and opinion.",
    },
  ]);
  const feedbacks = useFeedbackStore((s) => s.feedbacks);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: api.generateResponse,
    onSuccess: (data) => {
      const geminiResponse: ChatMessage = { role: "assistant", content: data.text };
      setMessages((prevMessages) => [...prevMessages, geminiResponse]);
    },
    onError: (error) => {
      const newGeminiMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error.",
      };
      console.error("Error generating response:", error);
      setMessages((prevMessages) => [...prevMessages, newGeminiMessage]);
    },
  });

  const handleSendFeedback = () => {
    if (!selectedFeedbackId) return;
    const fb = feedbacks.find((f) => f.id === selectedFeedbackId) || null;
    if (!fb) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `Selected feedback: "${fb.title}"` },
    ]);
    mutation.mutate(fb as Feedback);
  };

  const handleSelect = (value: string) => {
    const id = Number(value);
    setSelectedFeedbackId(id);
  };

  const chatEnd = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  return (
    <Card className="flex flex-col w-60 h-95 md:w-80 md:h-96 py-2 m-0">
      <ScrollArea className="px-5 pt-5 h-10/12 w-full overflow-hidden">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <Card
              key={index}
              className={`bg-accent rounded-md mb-3 p-3 gap-0 w-fit max-w-2/3 ${
                message.role === "user" ? "self-end" : "self-start"
              }`}
            >
              <p
                className={`
              ${
                message.role === "user" ? "text-primary" : "text-blue-300"
              } text-sm font-semibold`}
              >
                {message.role === "user" ? "You" : "Assistant"}
              </p>
              <p className="md:text-sm text-xs">{message.content}</p>
            </Card>
          ))}

          {mutation.isPending && (
            <Card className="bg-accent rounded-md mb-3 p-3 gap-0 w-2/3">
              <p className="md:text-sm text-xs font-semibold text-blue-300">
                Assistant
              </p>
              <p className="md:text-sm text-xs animate-pulse">Thinking...</p>
            </Card>
          )}

          <div ref={chatEnd} />
        </div>
      </ScrollArea>

      <div className="flex flex-col gap-2 w-full h-fit p-4 border-t">
        <Select value={selectedFeedbackId?.toString() ?? ""} onValueChange={handleSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select feedback..." />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectGroup>
            {feedbacks.map((fb) => (
              <SelectItem key={fb.id} value={fb.id.toString()}>
                {fb.title}
              </SelectItem>
            ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSendFeedback}
          disabled={!selectedFeedbackId || mutation.isPending}
        >
          {mutation.isPending ? "Sending..." : "Send to Assistant"}
        </Button>
      </div>
    </Card>
  );
}