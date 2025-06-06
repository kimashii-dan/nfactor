import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useFeedbackStore } from "@/store/feedbackStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const FeedbackForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"UI" | "Performance" | "Feature">(
    "Feature"
  );

  const addFeedback = useFeedbackStore((state) => state.addFeedback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addFeedback({
      title: title.trim(),
      description: description.trim(),
      category,
      upvotes: 0,
      downvotes: 0,
    });

    setTitle("");
    setDescription("");
    setCategory("Feature");
    setIsOpen(false);
  };

  const categoryVariants = {
    UI: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
    Performance:
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
    Feature:
      "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <Card
          className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <CardContent className="flex items-center justify-center p-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Plus className="h-5 w-5" />
              <span>Add new feedback</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief description of your feedback"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide more details about your feedback"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label>Category</Label>
                <div className="flex gap-2 mt-2">
                  {(["UI", "Performance", "Feature"] as const).map((cat) => (
                    <Badge
                      key={cat}
                      variant={category === cat ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        category === cat ? "" : categoryVariants[cat]
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit">Submit Feedback</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
