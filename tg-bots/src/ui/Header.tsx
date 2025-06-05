import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useChatsStore } from "@/store/useChatsStore";
import { useLocation } from "react-router";

export function Header() {
  const location = useLocation();
  const name = location.pathname.split("/").pop();
  const { chats } = useChatsStore();
  const chat = chats.find((chat) => chat.title === name);
  return (
    <header className="flex bg-sidebar h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex justify-between w-full items-center gap-1 p-3  lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {location.pathname !== "/" && (
          <div className="flex gap-2">
            {chat && <chat.icon />}
            <h1 className="text-lg font-semibold">{name} 🟢</h1>
          </div>
        )}

        <ModeToggle />
      </div>
    </header>
  );
}
