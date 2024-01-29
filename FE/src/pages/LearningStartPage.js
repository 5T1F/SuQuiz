import Container from "../components/Container";
import SideMenu from "../feature/Learning/SideMenu";
import React from "react";
import { useLocation } from "react-router-dom";

export default function LearningPage() {
  const location = useLocation();
  const { selectedMain, selectedSub } = location.state;

  return (
    <>
      <Container>
        <h1>학습 시작 페이지</h1>
        <SideMenu selectedMain={selectedMain} selectedSub={selectedSub}></SideMenu>
      </Container>
    </>
  );
}
