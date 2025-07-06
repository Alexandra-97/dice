"use client";

import { Container } from "@mui/material";
import { Game } from "./components/Game";
import { History } from "@/modules/dice-game/components/History";

export const DiceGame = () => {
  return (
    <Container maxWidth="sm" disableGutters sx={{ pt: 14, pb: 8 }}>
      <Game />
      <History />
    </Container>
  );
};
