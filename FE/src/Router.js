import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import App from "./components/App";
import MainPage from "./pages/MainPage";
import QuizLobbyPage from "./pages/QuizLobbyPage";
import SingleplayPage from "./pages/SingleplayPage";
import MultiplayPage from "./pages/MultiplayPage";
import SelectPage from "./pages/SelectPage";
import LearningStartPage from "./pages/LearningStartPage";
import KakaoCallback from "./feature/auth/login/KakaoCallback";
import NaverCallback from "./feature/auth/login/NaverCallback";

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="auth">
            <Route path="kakao" element={<KakaoCallback />} />
            <Route path="naver" element={<NaverCallback />} />
          </Route>
          <Route index element={<MainPage />} />
          <Route path="quizLobby" element={<QuizLobbyPage />} />
          <Route path="singleplay">
            <Route index element={<SingleplayPage />} />
          </Route>
          <Route path="multiplay">
            <Route path=":sessionId" element={<MultiplayPage />} />
          </Route>
          <Route path="learning">
            <Route index element={<SelectPage />} />
            <Route path="start" element={<LearningStartPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
