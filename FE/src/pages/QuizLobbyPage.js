import React, { useState } from "react";

import Container from "../components/Container";
import RankingList from "../feature/quizLobby/RankingList";
import QuizSelect from "../feature/quizLobby/QuizSelect";

import styles from "./QuizLobbyPage.module.css";

export default function QuizLobbyPage() {
  return (
    <Container>
      <div className="flex">
        <div className="w-2/6 h-[90vh] p-1 border-4 border-red-500">
          <RankingList />
        </div>
        <div className="w-4/6 h-[90vh] p-1 border-4 border-violet-500">
          <QuizSelect />
        </div>
      </div>
    </Container>
  );
}
