import type { Feedback, FilterCategory, Theme } from "@/types";
import { create } from "zustand";
import api from "@/api";

interface FeedbackState {
  feedbacks: Feedback[];
  filter: FilterCategory;
  theme: Theme;
  editingFeedback: Feedback | null;

  fetchFeedbacks: () => Promise<void>;
  addFeedback: (feedback: Omit<Feedback, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateFeedback: (id: number, updates: Partial<Feedback>) => Promise<void>;
  deleteFeedback: (id: number) => Promise<void>;
  // upvoteFeedback: (id: number) => Promise<void>;
  // downvoteFeedback: (id: number) => Promise<void>;
  setFilter: (filter: FilterCategory) => void;
  setTheme: (theme: Theme) => void;
  setEditingFeedback: (feedback: Feedback | null) => void;
  getFilteredFeedbacks: () => Feedback[];
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  feedbacks: [],
  filter: "all",
  theme: "light",
  editingFeedback: null,

  fetchFeedbacks: async () => {
    const feedbacks = await api.getFeedbacks();
    set({ feedbacks });
  },

  addFeedback: async (feedbackData) => {
    const feedback = await api.createFeedback(feedbackData);
    set((state) => ({ feedbacks: [...state.feedbacks, feedback] }));
  },

  updateFeedback: async (id, updates) => {
    const feedback = await api.updateFeedback(id, updates);
    set((state) => ({
      feedbacks: state.feedbacks.map((f) => (f.id === id ? feedback : f)),
    }));
  },

  deleteFeedback: async (id) => {
    await api.deleteFeedback(id);
    set((state) => ({
      feedbacks: state.feedbacks.filter((f) => f.id !== id),
    }));
  },

  // upvoteFeedback: async (id) => {
  //   const feedback = await api.updateFeedback(id, {})
  //   if (feedback) {
  //     await get().updateFeedback(id, { upvotes: feedback.upvotes + 1 });
  //   }
  // },

  // downvoteFeedback: async (id) => {
  //   const feedback = get().feedbacks.find((f) => f.id === id);
  //   if (feedback) {
  //     await get().updateFeedback(id, { downvotes: feedback.downvotes + 1 });
  //   }
  // },

  setFilter: (filter) => set({ filter }),
  setTheme: (theme) => set({ theme }),
  setEditingFeedback: (feedback) => set({ editingFeedback: feedback }),

  getFilteredFeedbacks: () => {
    const { feedbacks, filter } = get();
    if (filter === "all") return feedbacks;
    return feedbacks.filter((f) => f.category === filter);
  },
}));