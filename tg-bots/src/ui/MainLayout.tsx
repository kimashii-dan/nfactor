import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <Header />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
