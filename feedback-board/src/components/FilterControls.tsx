import React from "react";
import { Filter } from "lucide-react";
import { useFeedbackStore } from "@/store/feedbackStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FilterCategory } from "@/types";

export const FilterControls: React.FC = () => {
  const { filter, setFilter, feedbacks } = useFeedbackStore();

  const filterOptions: { value: FilterCategory; label: string }[] = [
    { value: "all", label: "All Categories" },
    { value: "UI", label: "UI" },
    { value: "Performance", label: "Performance" },
    { value: "Feature", label: "Feature" },
  ];

  const getFilteredCount = (category: FilterCategory) => {
    if (category === "all") return feedbacks.length;
    return feedbacks.filter((f) => f.category === category).length;
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={filter === option.value ? "default" : "outline"}
                  className="cursor-pointer text-sm"
                  onClick={() => setFilter(option.value)}
                >
                  {option.label} ({getFilteredCount(option.value)})
                </Badge>
              ))}
            </div>
          </div>

    
        </div>
      </CardContent>
    </Card>
  );
};
