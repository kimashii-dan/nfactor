import type { Feedback, SortOption, FilterCategory, Theme } from "@/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface FeedbackState {
  feedbacks: Feedback[];
  filter: FilterCategory;
  sort: SortOption;
  theme: Theme;
  editingFeedback: Feedback | null;

  addFeedback: (
    feedback: Omit<Feedback, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateFeedback: (id: string, updates: Partial<Feedback>) => void;
  deleteFeedback: (id: string) => void;
  upvoteFeedback: (id: string) => void;
  downvoteFeedback: (id: string) => void;
  setFilter: (filter: FilterCategory) => void;
  setSort: (sort: SortOption) => void;
  setTheme: (theme: Theme) => void;
  setEditingFeedback: (feedback: Feedback | null) => void;
  getFilteredAndSortedFeedbacks: () => Feedback[];
}

export const useFeedbackStore = create<FeedbackState>()(
  devtools(
    persist(
      (set, get) => ({
        feedbacks: [],
        filter: "all",
        sort: "most-upvoted",
        theme: "light",
        editingFeedback: null,

        addFeedback: (feedbackData) => {
          const newFeedback: Feedback = {
            ...feedbackData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set((state) => ({
            feedbacks: [...state.feedbacks, newFeedback],
          }));
        },

        updateFeedback: (id, updates) => {
          set((state) => ({
            feedbacks: state.feedbacks.map((feedback) =>
              feedback.id === id
                ? { ...feedback, ...updates, updatedAt: new Date() }
                : feedback
            ),
          }));
        },

        deleteFeedback: (id) => {
          set((state) => ({
            feedbacks: state.feedbacks.filter((feedback) => feedback.id !== id),
          }));
        },

        upvoteFeedback: (id) => {
          set((state) => ({
            feedbacks: state.feedbacks.map((feedback) =>
              feedback.id === id
                ? { ...feedback, upvotes: feedback.upvotes + 1 }
                : feedback
            ),
          }));
        },

        downvoteFeedback: (id) => {
          set((state) => ({
            feedbacks: state.feedbacks.map((feedback) =>
              feedback.id === id
                ? { ...feedback, downvotes: feedback.downvotes + 1 }
                : feedback
            ),
          }));
        },

        setFilter: (filter) => set({ filter }),
        setSort: (sort) => set({ sort }),
        setTheme: (theme) => set({ theme }),
        setEditingFeedback: (feedback) => set({ editingFeedback: feedback }),

        getFilteredAndSortedFeedbacks: () => {
          const { feedbacks, filter, sort } = get();

          let filtered = feedbacks;
          if (filter !== "all") {
            filtered = feedbacks.filter(
              (feedback) => feedback.category === filter
            );
          }

          return filtered.sort((a, b) => {
            switch (sort) {
              case "most-upvoted":
                return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
              case "most-recent":
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              default:
                return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
            }
          });
        },
      }),
      {
        name: "feedback-storage",
      }
    ),
    {
      name: "feedback-store",
    }
  )
);
