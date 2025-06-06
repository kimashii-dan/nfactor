import React from "react";
import { useFeedbackStore } from "@/store/feedbackStore";
import { FeedbackItem } from "./FeedbackItem";

export const FeedbackList: React.FC = () => {
  const { getFilteredAndSortedFeedbacks } = useFeedbackStore();
  const feedbacks = getFilteredAndSortedFeedbacks();

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No feedback yet. Be the first to share your ideas!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
};
