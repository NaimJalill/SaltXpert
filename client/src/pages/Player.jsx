import {
  Container,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
import Board from "./components/Board";
import { useSelector, useDispatch } from "react-redux";
import { setClosed, setDisabled } from "../features/game/gameSlice";
import { useEffect, useState } from "react";
import socket from "../socket";
import Dice from "react-dice-roll";

function Card() {
  const card = useSelector((state) => state.game.card);
  const game = useSelector((state) => state.game.game);
  const data = JSON.parse(localStorage.getItem("data"));

  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  function handleAnswer() {
    if (card.item?.card?.needProfessor) {
      socket.emit("needProfessor", answer);
      dispatch(setDisabled());
    } else {
      socket.emit("answer", answer);
      dispatch(setClosed());
    }
  }

  useEffect(() => {
    setAnswer("");
  }, [card.open]);

  return (
    <Dialog
      open={card.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Card</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>{card.item?.card?.question}</Typography>

          {card.item?.card?.needProfessor ? (
            <TextField
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              fullWidth
              disabled={card.disabled || data.id !== game.turn}
            />
          ) : (
            <FormControl disabled={card.disabled || data.id !== game.turn}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={card.disabled || data.id !== game.turn}
              >
                {card.item?.card?.multipleChoice.map((choice, index) => (
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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleAnswer}
          color="primary"
          disabled={card.disabled || data.id !== game.turn}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Player() {
  const game = useSelector((state) => state.game.game);
  const data = JSON.parse(localStorage.getItem("data"));

  function roll(value) {
    socket.emit("roll", value);
  }

  return (
    <Container>
      <Board />
      {game.start ? (
        <Stack spacing={2} mt={2} alignItems="center" justifyContent="center">
          <Typography variant="h6">
            Turn: {game.players[game.turn]?.name}
          </Typography>
          {!game.start || data.id !== game.turn ? (
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
    </Container>
  );
}
