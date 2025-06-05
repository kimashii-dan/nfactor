import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { Bot } from "lucide-react";
import type { Chat } from "@/shared/types";
import { useChatsStore } from "@/store/useChatsStore";
export function DialogDemo() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { addChat } = useChatsStore();

  function handleCreateChat(e: FormEvent) {
    e.preventDefault();
    console.log("Creating chat");
    const newChat: Chat = {
      title: name,
      url: `/${name.toLowerCase()}`,
      icon: Bot,
      type: "ai",
    };

    addChat(newChat);
    setName("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          Create chat with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreateChat}>
          <DialogHeader>
            <DialogTitle>Create chat with AI</DialogTitle>
            <DialogDescription>
              Start chatting with another AI chatbot.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
