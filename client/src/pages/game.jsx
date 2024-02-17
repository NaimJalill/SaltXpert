import { Box, Container, Stack, Typography } from "@mui/material";
import Dice from "react-dice-roll";
import Board from "./components/Board";
import { useSelector } from "react-redux";
import { useRollMutation } from "../features/game/gameApi";
import Card from "./components/card";
import Inventory from "./components/inventory";
import Side from "./components/side";
import Winner from "./components/Winner";

function Game() {
  const [rollMutation] = useRollMutation();
  const game = useSelector((state) => state.game.game);
  const id = localStorage.getItem("saltxpert-id");

  const player = game?.players.find((player) => player.id === id);

  const currentPlayer = game?.players.find(
    (player) => player.id === game?.turn
  );

  async function roll(value) {
    await rollMutation({ value });
  }

  return (
    <Container>
      <Board />
      {game?.start ? (
        <Stack spacing={2} mt={2} alignItems="center" justifyContent="center">
          <Typography variant="h6">
            {player?.id === game?.turn
              ? "Your turn"
              : `Turn: ${currentPlayer?.name}`}
          </Typography>
          {!game?.start || player?.id !== game?.turn ? (
            ""
          ) : (
            <Dice
              onRoll={(value) => roll(value)}
              size={50}
              faceBg="rgba(0,0,0,0.5)"
            />
          )}
        </Stack>
      ) : (
        <Stack spacing={2} mt={2} alignItems="center" justifyContent="center">
          <Typography variant="h6">Waiting to start...</Typography>
        </Stack>
      )}
      <Card />
      <Box flexGrow={1} />
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        alignItems="center"
        justifyContent="center"
      >
        <Inventory />
      </Stack>
      <Side />
      <Winner />
    </Container>
  );
}

export default Game;
