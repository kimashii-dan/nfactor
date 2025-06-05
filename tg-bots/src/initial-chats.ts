import { Angry, Frown, Smile } from "lucide-react";
import type { Chat } from "./shared/types";

export const items: Chat[] = [
  {
    title: "Maksim",
    url: "/maksim",
    icon: Smile,
    type: "person",
  },
  {
    title: "Anuar",
    url: "/anuar",
    icon: Frown,
    type: "person",
  },
  {
    title: "Olzhas",
    url: "/olzhas",
    icon: Angry,
    type: "person",
  },
];
