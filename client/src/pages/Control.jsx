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
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { API } from "../config";
import socket from "../socket";
import Board from "./components/Board";

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
  }
}

function CardQuestion() {
  const card = useSelector((state) => state.game.card);
  const professor = useSelector((state) => state.game.professor);
  const name = useSelector(
    (state) => state.game?.game?.players[state.game?.game?.turn]?.name ?? ""
  );

  return (
    <Dialog
      open={card.item && (professor === "" || professor === null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {getTitle(card.item?.type, name)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {card?.item?.type === "chance" && (
            <Box>
              <Typography variant="h6" color="#000000">
                {card.item?.card?.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card.item?.card?.note !== "" &&
                  `Note: ${card.item?.card?.note}`}
              </Typography>
            </Box>
          )}
          {card?.item?.type === "penalty" && (
            <Box>
              <Typography variant="h6" color="#000000">
                {card.item?.card?.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card.item?.card?.note !== "" &&
                  `Note: ${card.item?.card?.note}`}
              </Typography>
            </Box>
          )}
          {card?.item?.type === "note" && (
            <Box>
              <Typography variant="h6" color="#000000">
                {card.item?.card?.text}
              </Typography>
            </Box>
          )}
          {card?.item?.type !== "chance" &&
            card?.item?.type !== "penalty" &&
            card?.item?.type !== "note" && (
              <Box>
                {card.item?.card?.image && (
                  <Stack
                    direction="row"
                    p={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      component="img"
                      src={`${API}${card.item?.card?.image}`}
                      sx={{ height: 100 }}
                    />
                  </Stack>
                )}
                <Typography>{card.item?.card?.question}</Typography>

                {card.item?.card?.needProfessor ? (
                  ""
                ) : (
                  <FormControl disabled={true}>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      disabled={true}
                    >
                      {card.item?.card?.multipleChoice?.map((choice, index) => (
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
  const card = useSelector((state) => state.game.card);
  const game = useSelector((state) => state.game.game);
  const professor = useSelector((state) => state.game.professor);

  function handleAnswer(value) {
    socket.emit("answer", value);
  }

  return (
    <Dialog
      open={professor !== "" && professor !== null}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Card</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>{card.item?.card?.question}</Typography>
          <Typography>Schema: {card.item?.card?.answer?.join(", ")}</Typography>

          <Typography mt={2}>
            {game?.players[game?.turn]?.name}: {professor}
          </Typography>
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
  function startGame() {
    socket.emit("start");
  }

  const game = useSelector((state) => state.game.game);

  return (
    <Container maxWidth="md">
      <Board />
      <Card />
      <CardQuestion />
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
