import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import YouTube from "@u-wave/react-youtube";
import { API } from "../config";
import Board from "./components/Board";
import {
  useStartMutation,
  useAnswerMutation,
  useEndMutation,
} from "../features/game/gameApi";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Side from "./components/side";
import Winner from "./components/Winner";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

function getTitle(type, name) {
  switch (type) {
    case "purple green":
      return name + " got Purple/Green";
    case "purple red":
      return name + " got Purple/Red";
    case "purple orange":
      return name + " got Purple/Orange";
    case "green green":
      return name + " got Green/Green";
    case "green red":
      return name + " got Green/Red";
    case "green orange":
      return name + " got Green/Orange";
    case "chance":
      return name + " got chance!";
    case "penalty":
      return "Oh no! " + name + " got penalty!";
    case "note":
      return name + " got note!";
    case "exam":
      return name + " got exam!";
  }
}

function CardQuestion() {
  const card = useSelector((state) => state.game.game?.currentCard);
  const professor = useSelector((state) => state.game.game?.professor);
  const game = useSelector((state) => state.game.game);
  const player = game?.players.find((player) => player.id === game?.turn);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;

    if (game?.timeout) {
      const end = dayjs(game.timeout);

      intervalId = setInterval(() => {
        if (dayjs().utcOffset(0).isBefore(end)) {
          const p = end.diff(dayjs().utcOffset(0), "second");
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
      open={(professor === "" || professor === null) && card !== null}
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
          <Typography variant="h4">
            {getTitle(card?.type, player?.name)}
          </Typography>
          <Typography variant="h6">
            {progress > 0 && `(${progress} s)`}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {card?.type === "chance" && (
            <Box>
              <Typography variant="h6" color="#000000">
                {card?.card?.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card?.card?.note !== "" && `Note: ${card?.card?.note}`}
              </Typography>
            </Box>
          )}
          {card?.type === "penalty" && (
            <Box>
              <Typography variant="h6" color="#000000">
                {card?.card?.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card?.card?.note !== "" && `Note: ${card?.card?.note}`}
              </Typography>
            </Box>
          )}
          {card?.type === "note" && (
            <Box>
              <Typography variant="h6" color="#000000">
                {parse(card.card?.text || "")}
              </Typography>
            </Box>
          )}
          {card?.type !== "chance" &&
            card?.type !== "penalty" &&
            card?.type !== "note" && (
              <Box>
                {card?.card?.image && (
                  <Stack
                    direction="row"
                    p={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      component="img"
                      src={`${API}${card?.card?.image}`}
                      sx={{ width: "100%", height: "auto" }}
                    />
                  </Stack>
                )}

                {card?.card?.youtube &&
                  card?.card?.youtube?.map((video, index) => (
                    <Box key={index} sx={{ mt: 2 }}>
                      <YouTube video={video} width="100%" height="auto" />
                    </Box>
                  ))}

                <Typography>{parse(card?.card?.question || "")}</Typography>

                {card?.card?.needProfessor ? (
                  ""
                ) : (
                  <FormControl disabled={true}>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      disabled={true}
                    >
                      {card?.card?.multipleChoice?.map((choice, index) => (
                        <FormControlLabel
                          value={index}
                          control={<Radio />}
                          label={choice}
                          key={index}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              </Box>
            )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

function Card() {
  const card = useSelector((state) => state.game.game?.currentCard);
  const game = useSelector((state) => state.game.game);
  const professor = useSelector((state) => state.game.game?.professor);
  const player = game?.players.find((player) => player.id === game?.turn);

  const [answer] = useAnswerMutation();

  async function handleAnswer(value) {
    await answer({ answer: value });
  }

  return (
    <Dialog
      open={professor !== "" && professor !== null && card !== undefined}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Card</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {card?.card?.image && (
            <Stack
              direction="row"
              p={1}
              alignItems="center"
              justifyContent="center"
            >
              <Box
                component="img"
                src={`${API}${card?.card?.image}`}
                sx={{ width: "100%", height: "auto" }}
              />
            </Stack>
          )}
          <Typography>{parse(card?.card?.question || "")}</Typography>
          <br />

          <Typography variant="h6">Schema:</Typography>
          <Typography>
            {" "}
            {parse(card?.card?.answer?.join(", ") || "")}
          </Typography>

          <Typography mt={2}>{player?.name}:</Typography>
          <TextField
            sx={{ mt: 2 }}
            value={professor}
            fullWidth
            multiline
            rows={3}
            disabled
            variant="outlined"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleAnswer("Yes")}
          color="primary"
          variant="contained"
        >
          Correct
        </Button>
        <Button
          onClick={() => handleAnswer("No")}
          color="error"
          variant="contained"
        >
          Wrong
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Control() {
  const [start] = useStartMutation();
  const [end] = useEndMutation();

  async function startGame() {
    await start();
  }

  const game = useSelector((state) => state.game.game);

  return (
    <Container maxWidth="md">
      <Board />
      <Card />
      <CardQuestion />
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        alignItems="center"
        justifyContent="center"
      >
        {!game?.start && (
          <Button variant="contained" color="primary" onClick={startGame}>
            Start
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            await end();
          }}
        >
          Reset
        </Button>
      </Stack>
      <Side />
      <Winner />
    </Container>
  );
}
