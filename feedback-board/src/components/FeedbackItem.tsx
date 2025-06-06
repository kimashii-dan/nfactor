import React from "react";
import { ThumbsUp, ThumbsDown, Edit, Trash } from "lucide-react";
import { useFeedbackStore } from "@/store/feedbackStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Feedback } from "@/types";

interface FeedbackItemProps {
  feedback: Feedback;
}

export const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  const {
    upvoteFeedback,
    downvoteFeedback,
    deleteFeedback,
    setEditingFeedback,
  } = useFeedbackStore();

  const categoryVariants = {
    UI: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Performance:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Feature:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const netScore = feedback.upvotes - feedback.downvotes;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              className={
                categoryVariants[
                  feedback.category as keyof typeof categoryVariants
                ]
              }
            >
              {feedback.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDate(feedback.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingFeedback(feedback)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteFeedback(feedback.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <h3 className="text-lg font-semibold">{feedback.title}</h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {feedback.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => upvoteFeedback(feedback.id)}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {feedback.upvotes}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => downvoteFeedback(feedback.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              {feedback.downvotes}
            </Button>
          </div>

          <Badge
            variant={
              netScore > 0
                ? "default"
                : netScore < 0
                ? "destructive"
                : "secondary"
            }
          >
            Score: {netScore > 0 ? "+" : ""}
            {netScore}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
