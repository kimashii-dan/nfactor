export interface Feedback {
  id: number;
  title: string;
  description: string;
  category: "UI" | "Performance" | "Feature";
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

export type FilterCategory = "all" | "UI" | "Performance" | "Feature";
export type Theme = "system" | "light" | "dark";

export type GeminiResponse = {
  text: string
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};