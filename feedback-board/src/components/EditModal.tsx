import React, { useState, useEffect } from "react";
import { useFeedbackStore } from "@/store/feedbackStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const EditModal: React.FC = () => {
  const { editingFeedback, updateFeedback, setEditingFeedback } =
    useFeedbackStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"UI" | "Performance" | "Feature">(
    "Feature"
  );

  useEffect(() => {
    if (editingFeedback) {
      setTitle(editingFeedback.title);
      setDescription(editingFeedback.description);
      setCategory(editingFeedback.category);
    }
  }, [editingFeedback]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFeedback || !title.trim() || !description.trim()) return;

    updateFeedback(editingFeedback.id, {
      title: title.trim(),
      description: description.trim(),
      category,
    });

    setEditingFeedback(null);
  };

  const categoryVariants = {
    UI: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200",
    Performance:
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
    Feature:
      "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    <Dialog
      open={!!editingFeedback}
      onOpenChange={() => setEditingFeedback(null)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Feedback</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

          <DialogFooter className="gap-2">
            <Button type="submit">Save Changes</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingFeedback(null)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
