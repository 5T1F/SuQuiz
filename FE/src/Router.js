import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import App from "./components/App";
import MainPage from "./pages/MainPage";
import QuizLobbyPage from "./pages/QuizLobbyPage";
import SingleplayPage from "./pages/SingleplayPage";
import WaitingPage from "./pages/WaitingPage";
import MultiplayPage from "./pages/MultiplayPage";
import SelectPage from "./pages/SelectPage";
import BookmarkPage from "./pages/BookmarkPage";
import LearningStartPage from "./pages/LearningStartPage";

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path="quizLobby" element={<QuizLobbyPage />} />
          <Route path="singleplay">
            <Route index element={<SingleplayPage />} />
          </Route>
          <Route path="multiplay">
            <Route index element={<WaitingPage />} />
            <Route path="start" element={<MultiplayPage />} />
          </Route>
          <Route path="learning">
            <Route index element={<SelectPage />} />
            <Route path="bookmark" element={<BookmarkPage />} />
            <Route path="start" element={<LearningStartPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
