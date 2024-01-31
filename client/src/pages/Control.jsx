import { Button, Container, Stack } from "@mui/material";
import Board from "./components/Board";
import socket from "../socket";
import { useSelector } from "react-redux";

export default function Control() {
  function startGame() {
    socket.emit("start");
  }

  const game = useSelector((state) => state.game.game);

  return (
    <Container maxWidth="md">
      <Board />

      {!game.start && (
        <Stack
          direction="row"
          spacing={2}
          mt={2}
          alignItems="center"
          justifyContent="center"
        >
          <Button variant="contained" color="primary" onClick={startGame}>
            Start
          </Button>
        </Stack>
      )}
    </Container>
  );
}
