import React, { useState } from "react";

import Container from "../components/Container";
import Rank from "../feature/quizLobby/Rank";
import styles from "./QuizLobbyPage.module.css";

export default function QuizLobbyPage() {
  return (
    <Container>
      <h1>퀴즈 로비</h1>
      <Rank />
      <div></div>
    </Container>
  );
}
