import { create } from "zustand";
import { items } from "@/initial-chats";

type Chat = (typeof items)[number];

interface ChatsState {
  chats: Chat[];
  addChat: (chat: Chat) => void;
}

export const useChatsStore = create<ChatsState>((set) => ({
  chats: items,
  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),
}));
