import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { NavLink } from "react-router";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogDemo } from "./DialogDemo";
import { useChatsStore } from "@/store/useChatsStore";
const name = location.pathname.split("/").pop();

export function AppSidebar() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const { chats } = useChatsStore();

  const [lastMessages, setLastMessages] = useState<Record<string, string>>({});

  // Load last message for each chat from localStorage
  useEffect(() => {
    const messagesMap: Record<string, string> = {};
    chats.forEach((chat) => {
      const storageKey = `messages_${chat.url}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const messages = JSON.parse(saved);
        if (Array.isArray(messages) && messages.length > 0) {
          messagesMap[chat.url] = messages[messages.length - 1].content;
        }
      }
    });
    setLastMessages(messagesMap);
  }, [chats]);

  const filteredChats = useMemo(() => {
    let result = chats;
    if (input) {
      result = result.filter((chat) =>
        chat.title.toLowerCase().includes(input.toLowerCase())
      );
    }
    if (filter !== "all") {
      result = result.filter((chat) => chat.type === filter);
    }
    return result;
  }, [chats, input, filter]);

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-5 p-5">
        <h1 className="text-xl font-semibold">Telegram clone</h1>
        <div className="flex flex-row gap-2">
          <Input
            placeholder="Search chat..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Select onValueChange={(value) => setFilter(value)} value={filter}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-bold">Search by</SelectLabel>
                <SelectItem className="cursor-pointer" value="all">
                  All
                </SelectItem>
                <SelectItem className="cursor-pointer" value="person">
                  Person
                </SelectItem>
                <SelectItem className="cursor-pointer" value="ai">
                  AI
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-5">
              <DialogDemo />
              <div className="">
                {filteredChats.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Card
                      className={`p-0 shadow-none border-none ${
                        name === item.title ? "bg-blue-400" : "bg-sidebar"
                      }`}
                    >
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex flex-row gap-2 p-3 rounded-xl items-center ${
                            isActive ? "bg-primary text-accent" : "bg-sidebar"
                          }`
                        }
                      >
                        <item.icon />
                        <div className="flex flex-col">
                          <span>{item.title}</span>
                          <span className="text-xs text-gray-400 truncate max-w-[150px]">
                            {lastMessages[item.url] || ""}
                          </span>
                        </div>
                      </NavLink>
                    </Card>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
