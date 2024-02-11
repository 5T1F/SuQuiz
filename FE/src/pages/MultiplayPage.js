import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "../components/Container";

const MultiplayPage = () => {
  const location = useLocation();
  const { publisher, subscribers } = location.state;
  return (
    <Container>
      <div>
        <p>멀티플레이</p>
      </div>
    </Container>
  );
};

export default MultiplayPage;
