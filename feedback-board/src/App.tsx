import { useEffect } from "react";
import { useFeedbackStore } from "./store/feedbackStore";
import { Header } from "./components/Header";
import { FeedbackForm } from "./components/FeedbackForm";
import { FilterControls } from "./components/FilterControls";
import { FeedbackList } from "./components/FeedbackList";
import { EditModal } from "./components/EditModal";

function App() {
  const theme = useFeedbackStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <FeedbackForm />
        <FilterControls />
        <FeedbackList />
      </main>

      <EditModal />
    </div>
  );
}

export default App;
