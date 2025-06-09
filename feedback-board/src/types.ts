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
export type Theme = "light" | "dark";