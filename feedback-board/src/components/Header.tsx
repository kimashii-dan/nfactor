import React from "react";
import { Sun, Moon, Handshake } from "lucide-react";
import { useFeedbackStore } from "@/store/feedbackStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header: React.FC = () => {
  const { theme, setTheme, feedbacks } = useFeedbackStore();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Handshake className="md:h-8 md:w-8 text-primary" />
            </div>
            <div>
              <h1 className="md:text-2xl font-bold">Product Feedback Board</h1>
              <p className="md:text-sm text-xs text-muted-foreground">
                Share your ideas and vote on others
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              {feedbacks.length} feedback{feedbacks.length !== 1 ? "s" : ""}
            </Badge>
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              variant="outline"
              size="icon"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
