import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../config";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import {
  useAcceptMutation,
  useAnswerMutation,
  useProfessorMutation,
  useSkipMutation,
} from "../../features/game/gameApi";
import dayjs from "dayjs";

function getTitlePeople(type, name) {
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

function getTitle(type) {
  switch (type) {
    case "purple green":
      return "Purple/Green";
    case "purple red":
      return "Purple/Red";
    case "purple orange":
      return "Purple/Orange";
    case "green green":
      return "Green/Green";
    case "green red":
      return "Green/Red";
    case "green orange":
      return "Green/Orange";
    case "chance":
      return "You got chance!";
    case "penalty":
      return "Oh no! You got penalty!";
    case "note":
      return "You got note!";
    case "exam":
      return "You got exam!";
  }
}

function Card() {
  const game = useSelector((state) => state.game.game);

  const [answerMutation] = useAnswerMutation();
  const [acceptMutation] = useAcceptMutation();
  const [professorMutation] = useProfessorMutation();
  const [skipMutation] = useSkipMutation();

  const card = game?.currentCard;

  const player = game?.players.find(
    (player) => player.id === localStorage.getItem("saltxpert-id")
  );

  const current = game?.players.find((player) => player.id === game?.turn);

  const professor = game?.professor;

  const [answer, setAnswer] = useState("");

  async function handleAnswer() {
    if (card.card?.needProfessor) {
      await professorMutation({ answer });
    } else {
      await answerMutation({ answer });
    }
  }

  async function handleAccept() {
    await acceptMutation();
  }

  async function handleSkip() {
    await skipMutation();
  }

  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    setAnswer("");
  }, [card]);

  return (
    <Dialog
      open={card !== null}
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
            {player.id === game.turn
              ? getTitle(card?.type)
              : getTitlePeople(card?.type, current?.name)}
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
                {card.card?.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card.card?.note !== "" && `Note: ${card?.card?.note}`}
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
          {card?.type === "note" && player.id === game.turn && (
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
                      src={`${API}${card.card?.image}`}
                      sx={{ width: "100%", height: "auto" }}
                    />
                  </Stack>
                )}
                <Typography>{parse(card?.card?.question || "")}</Typography>

                {card?.card?.needProfessor && player.id === game.turn ? (
                  <TextField
                    sx={{ mt: 2 }}
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer || professor}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={
                      (professor !== "" && professor !== null) ||
                      player.id !== game.turn
                    }
                    variant="outlined"
                    required
                  />
                ) : (
                  <FormControl disabled={player.id !== game.turn}>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={player.id !== game.turn}
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
      <DialogActions>
        {card?.type === "exam" &&
          player?.id === game?.turn &&
          player?.cards
            .filter((c) => c.type === "chance")
            ?.find((c) => c.card.id === 2) && (
            <Button
              onClick={async () => {
                await handleSkip();
              }}
              color="primary"
              variant="contained"
            >
              Use Change Card
            </Button>
          )}

        {card?.type !== "chance" &&
          card?.type !== "penalty" &&
          card?.type !== "note" &&
          player.id === game.turn && (
            <Button
              onClick={handleAnswer}
              variant="contained"
              color="primary"
              disabled={
                (professor !== "" && professor !== null) ||
                player.id !== game.turn
              }
            >
              Submit
            </Button>
          )}

        {(card?.type === "chance" ||
          card?.type === "penalty" ||
          card?.type === "note") &&
          player.id === game.turn && (
            <Button
              onClick={handleAccept}
              color="primary"
              disabled={player.id !== game.turn}
              variant="contained"
            >
              Accept
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
}

export default Card;
