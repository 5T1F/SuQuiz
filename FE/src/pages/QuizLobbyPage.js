import React, { useState } from "react";

import Container from "../components/Container";
import RankingList from "../feature/quizLobby/RankingList";

import styles from "./QuizLobbyPage.module.css";

export default function QuizLobbyPage() {
  return (
    <Container>
      <h1>퀴즈 로비</h1>
      <div className="flex">
        <div className="w-2/6 h-[90vh] p-1 border-4 border-red-500">
          <RankingList />
        </div>
      </div>
    </Container>
  );
}
