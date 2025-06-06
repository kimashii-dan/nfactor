export interface Feedback {
  id: string;
  title: string;
  description: string;
  category: "UI" | "Performance" | "Feature";
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export type SortOption = "most-upvoted" | "most-recent" | "most-comments";
export type FilterCategory = "all" | "UI" | "Performance" | "Feature";
export type Theme = "light" | "dark";
