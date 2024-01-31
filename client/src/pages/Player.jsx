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
  Box,
  Slide,
  IconButton,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import Board from "./components/Board";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import socket from "../socket";
import Dice from "react-dice-roll";
import { API } from "../config";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  }
}

function Card() {
  const card = useSelector((state) => state.game.card);
  const game = useSelector((state) => state.game.game);
  const data = JSON.parse(localStorage.getItem("data"));
  const professor = useSelector((state) => state.game.professor);
  const name = useSelector(
    (state) => state.game?.game?.players[state.game?.game?.turn]?.name ?? ""
  );

  const [answer, setAnswer] = useState("");

  function handleAnswer() {
    if (card.item?.card?.needProfessor) {
      socket.emit("needProfessor", answer);
    } else {
      socket.emit("answer", answer);
    }
  }

  function handleAccept() {
    socket.emit("acceptCard");
  }

  useEffect(() => {
    setAnswer("");
  }, [card.item]);

  return (
    <Dialog
      open={card.item}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {/* {getTitle(card.item?.type)} */}
        {data.id === game.turn
          ? getTitle(card.item?.type)
          : getTitlePeople(card.item?.type, name)}
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

                {card.item?.card?.needProfessor && data.id === game.turn ? (
                  <TextField
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                    fullWidth
                    disabled={
                      (professor !== "" && professor !== null) ||
                      data.id !== game.turn
                    }
                    variant="outlined"
                  />
                ) : (
                  <FormControl disabled={data.id !== game.turn}>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={data.id !== game.turn}
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
      <DialogActions>
        {card?.item?.type !== "chance" &&
          card?.item?.type !== "penalty" &&
          card?.item?.type !== "note" &&
          data.id === game.turn && (
            <Button
              onClick={handleAnswer}
              variant="contained"
              color="primary"
              disabled={
                (professor !== "" && professor !== null) ||
                data.id !== game.turn
              }
            >
              Submit
            </Button>
          )}

        {(card?.item?.type === "chance" ||
          card?.item?.type === "penalty" ||
          card?.item?.type === "note") &&
          data.id === game.turn && (
            <Button
              onClick={handleAccept}
              color="primary"
              disabled={data.id !== game.turn}
              variant="contained"
            >
              Accept
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
}

function Iventory() {
  const data = JSON.parse(localStorage.getItem("data"));
  const player = useSelector((state) => state.game.game.players[data.id]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Open Iventory ({player?.cards.length + player?.notes.length ?? 0})
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Inventory
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ m: 2, width: "100%" }}>
          {player?.cards?.length > 0 && (
            <Stack
              mt={2}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6">Chance</Typography>

              {player?.cards?.map((card, index) => (
                <Accordion key={index} fullWidth>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Chance {index + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {card.card.image && (
                      <Stack
                        direction="row"
                        p={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          component="img"
                          src={`${API}${card.card.image}`}
                          sx={{ height: 100 }}
                        />
                      </Stack>
                    )}

                    <Typography>{card.card.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {card.card.note !== "" && `Note: ${card.card.note}`}
                    </Typography>
                    <br />
                    <Box mt={2}>
                      <Button variant="contained" color="primary" size="small">
                        Use
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}

          {player?.notes?.length > 0 && (
            <Stack
              mt={2}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6">Note</Typography>

              {player?.notes?.map((note, index) => (
                <Accordion key={index} fullWidth>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Note {index + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {note.card.image && (
                      <Stack
                        direction="row"
                        p={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          component="img"
                          src={`${API}${note.card.image}`}
                          sx={{ height: 100 }}
                        />
                      </Stack>
                    )}

                    <Typography>{note.card.text}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}
        </Box>
      </Dialog>
    </>
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
            {data.id === game.turn
              ? "Your turn"
              : `Turn: ${game.players[game.turn]?.name}`}
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
      <Box flexGrow={1} />
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        alignItems="center"
        justifyContent="center"
      >
        <Iventory />
      </Stack>
    </Container>
  );
}
