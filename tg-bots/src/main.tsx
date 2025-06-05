import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./ui/MainLayout.tsx";
import App from "./app/App.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import TanstackProvider from "./lib/queryClient.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TanstackProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<App />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TanstackProvider>
    </ThemeProvider>
  </StrictMode>
);
