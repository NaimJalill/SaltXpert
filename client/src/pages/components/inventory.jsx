import { useState, forwardRef } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Slide,
  Toolbar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API } from "../../config";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Iventory() {
  const id = localStorage.getItem("saltxpert-id");
  const player = useSelector((state) =>
    state.game.game?.players.find((player) => player.id === id)
  );

  const [open, setOpen] = useState(false);

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
        <Box sx={{ width: "100%" }}>
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

                    <Typography>{parse(note.card.text)}</Typography>
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

export default Iventory;
