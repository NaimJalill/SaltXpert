import { useEffect, useState } from "react";
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
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useClearMutation } from "../../features/game/gameApi";

function Side() {
  const game = useSelector((state) => state.game.game);
  const [progress, setProgress] = useState(0);
  const player = game?.players.find(
    (player) => player.id === localStorage.getItem("saltxpert-id")
  );

  const [clearMutation] = useClearMutation();

  const location = useLocation();

  const current = game?.players.find((player) => player.id === game?.turn);

  useEffect(() => {
    let intervalId;

    if (game?.timeout) {
      const end = dayjs(game.timeout);

      intervalId = setInterval(() => {
        if (dayjs().isBefore(end)) {
          const p = end.diff(dayjs(), "second");
          setProgress(p);
        } else {
          clearInterval(intervalId);
          setProgress(-1);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
      setProgress(-1);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [game]);

  return (
    <Dialog
      open={game?.side !== null && game?.side !== "Exam Time" && game !== null}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">{game?.side}</Typography>
          <Typography variant="h6">
            {progress > 0 && `(${progress} s)`}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {game?.side === "Tutorial" && (
            <>
              {player?.id === game?.turn ? (
                <>
                  <Typography variant="h6">
                    You can open books in 60 seconds
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6">
                    Waiting for {current?.name} in Tutorial Class
                  </Typography>
                </>
              )}
            </>
          )}
          {game?.side === "Salt Lab" && (
            <>
              {player?.id === game?.turn ? (
                <>
                  <Typography variant="h6">
                    You need to explain a simple procedure for an experiment of
                    dissolved salt or dissolved salt
                  </Typography>
                </>
              ) : (
                <>
                  {location.pathname !== "/control" ? (
                    <Typography variant="h6">
                      {current?.name} need to explain a simple procedure for an
                      experiment of dissolved salt or dissolved salt
                    </Typography>
                  ) : (
                    <Typography variant="h6">
                      You need to verify the explanation of the student
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {location.pathname === "/control" && game?.side === "Salt Lab" && (
          <Button
            onClick={async () => {
              await clearMutation();
            }}
            variant="contained"
          >
            Exit Salt Lab
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default Side;
