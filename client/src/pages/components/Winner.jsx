import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Stack,
  DialogActions,
  Button,
} from "@mui/material";
import { useEndMutation } from "../../features/game/gameApi";

function Winner() {
  const game = useSelector((state) => state.game.game);

  const [endMutation] = useEndMutation();

  return (
    <Dialog
      open={game?.winner?.length > 0}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        Congratulations to the winner!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack alignItems="center" justifyContent="center">
            {game?.winner?.map((winner) => (
              <Typography variant="h3" key={winner}>
                {game?.players.find((player) => player.id === winner)?.name}
              </Typography>
            ))}
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            await endMutation();
          }}
          variant="contained"
        >
          New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Winner;
