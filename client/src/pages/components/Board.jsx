// Board.js
import { Box, Paper, Stack, Typography } from "@mui/material";
import propTypes from "prop-types";
import { useSelector } from "react-redux";
import image from "../../assets/board.png";
import "./table.css";

const colors = ["darkred", "blue", "green", "darkorange"];

function Pawn(props) {
  const { position } = props;
  const game = useSelector((state) => state.game.game);

  return (
    <Stack alignItems="center" justifyContent="center" spacing={0.65} width={1}>
      <Stack direction="row" alignItems="center" spacing={0}>
        <Box
          sx={{
            width: { xs: "0.65em", sm: "1em", md: "1.2em", lg: "1em" },
            height: { xs: "0.65em", sm: "1em", md: "1.2em", lg: "1em" },
            backgroundColor: colors[0],
            borderRadius: "50%",
            display: position === game?.players[0]?.position ? "block" : "none",
            border: "1px solid white",
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.65}>
        <Box
          sx={{
            width: { xs: "0.65em", sm: "1em", md: "1.2em", lg: "1em" },
            height: { xs: "0.65em", sm: "1em", md: "1.2em", lg: "1em" },
            backgroundColor: colors[1],
            borderRadius: "50%",
            display: position === game?.players[1]?.position ? "block" : "none",
            border: "1px solid white",
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.65}>
        <Box
          sx={{
            width: { xs: "0.65em", sm: "1em", md: "1.2em", lg: "1em" },
            height: { xs: "0.65em", sm: "1em", md: "1.2em", lg: "1em" },
            backgroundColor: colors[3],
            borderRadius: "50%",
            display: position === game?.players[3]?.position ? "block" : "none",
            border: "1px solid white",
          }}
        />
        <Box
          sx={{
            width: { xs: "0.65em", sm: "1em", md: "1.2em", lg: "1em" },
            height: { xs: "0.65em", sm: "1em", md: "1.2em", lg: "1em" },
            backgroundColor: colors[2],
            borderRadius: "50%",
            display: position === game?.players[2]?.position ? "block" : "none",
            border: "1px solid white",
          }}
        />
      </Stack>
    </Stack>
  );
}

Pawn.propTypes = {
  position: propTypes.number.isRequired,
};

const Board = () => {
  const game = useSelector((state) => state.game.game);

  return (
    <>
      <Stack spacing={2} mt={2} alignItems="center" justifyContent="center">
        <Stack
          direction="row"
          spacing={2}
          mt={2}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Paper
            sx={{
              p: 2,
              border:
                game?.players[0]?.id === game?.turn
                  ? "5px solid black"
                  : "none",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: colors[0],
                  borderRadius: "50%",
                }}
              />
              {game?.players[0] ? (
                <Stack>
                  <Typography variant="h6">{game?.players[0].name}</Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">
                      Money: RM {game?.players[0].cash}
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <Stack>
                  <Typography variant="h6">
                    {game?.start ? "-" : "Waiting..."}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">Money: RM 0</Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Paper>
          <Paper
            sx={{
              p: 2,
              border:
                game?.players[1]?.id === game?.turn
                  ? "5px solid black"
                  : "none",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: colors[1],
                  borderRadius: "50%",
                }}
              />
              {game?.players[1] ? (
                <Stack>
                  <Typography variant="h6">{game?.players[1].name}</Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">
                      Money: RM {game?.players[1].cash}
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <Stack>
                  <Typography variant="h6">
                    {game?.start ? "-" : "Waiting..."}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">Money: RM 0</Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Stack>

        <Box
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover", // or 'contain' depending on your needs
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: { xs: "80vw", sm: "80vw", md: "60vw", lg: "30vw" },
            height: { xs: "80vw", sm: "80vw", md: "60vw", lg: "30vw" },
          }}
        >
          <table>
            <tbody>
              <tr>
                <td className="corner">
                  <Pawn position={20} />
                </td>
                <td className="horizontal">
                  <Pawn position={21} />
                </td>
                <td className="horizontal">
                  <Pawn position={22} />
                </td>
                <td className="horizontal">
                  <Pawn position={23} />
                </td>
                <td className="horizontal">
                  <Pawn position={24} />
                </td>
                <td className="horizontal">
                  <Pawn position={25} />
                </td>
                <td className="horizontal">
                  <Pawn position={26} />
                </td>
                <td className="horizontal">
                  <Pawn position={27} />
                </td>
                <td className="horizontal">
                  <Pawn position={28} />
                </td>
                <td className="horizontal">
                  <Pawn position={29} />
                </td>
                <td className="corner">
                  <Pawn position={30} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={19} />
                </td>
                <td rowSpan={9} colSpan={9}></td>
                <td className="vertical">
                  <Pawn position={31} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={18} />
                </td>
                <td className="vertical">
                  <Pawn position={32} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={17} />
                </td>
                <td className="vertical">
                  <Pawn position={33} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={16} />
                </td>
                <td className="vertical">
                  <Pawn position={34} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={15} />
                </td>
                <td className="vertical">
                  <Pawn position={35} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={14} />
                </td>
                <td className="vertical">
                  <Pawn position={36} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={13} />
                </td>
                <td className="vertical">
                  <Pawn position={37} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={12} />
                </td>
                <td className="vertical">
                  <Pawn position={38} />
                </td>
              </tr>
              <tr>
                <td className="vertical">
                  <Pawn position={11} />
                </td>
                <td className="vertical">
                  <Pawn position={39} />
                </td>
              </tr>
              <tr>
                <td className="corner">
                  <Pawn position={10} />
                </td>
                <td className="horizontal">
                  <Pawn position={9} />
                </td>
                <td className="horizontal">
                  <Pawn position={8} />
                </td>
                <td className="horizontal">
                  <Pawn position={7} />
                </td>
                <td className="horizontal">
                  <Pawn position={6} />
                </td>
                <td className="horizontal">
                  <Pawn position={5} />
                </td>
                <td className="horizontal">
                  <Pawn position={4} />
                </td>
                <td className="horizontal">
                  <Pawn position={3} />
                </td>
                <td className="horizontal">
                  <Pawn position={2} />
                </td>
                <td className="horizontal">
                  <Pawn position={1} />
                </td>
                <td className="corner">
                  <Pawn position={0} />
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          mt={2}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Paper
            sx={{
              p: 2,
              border:
                game?.players[3]?.id === game?.turn
                  ? "5px solid black"
                  : "none",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: colors[3],
                  borderRadius: "50%",
                }}
              />
              {game?.players[3] ? (
                <Stack>
                  <Typography variant="h6">{game?.players[3].name}</Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">
                      Money: RM {game?.players[3].cash}
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <Stack>
                  <Typography variant="h6">
                    {game?.start ? "-" : "Waiting..."}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">Money: RM 0</Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Paper>
          <Paper
            sx={{
              p: 2,
              border:
                game?.players[2]?.id === game?.turn
                  ? "5px solid black"
                  : "none",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: colors[2],
                  borderRadius: "50%",
                }}
              />
              {game?.players[2] ? (
                <Stack>
                  <Typography variant="h6">{game?.players[2].name}</Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">
                      Money: RM {game?.players[2].cash}
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <Stack>
                  <Typography variant="h6">
                    {game?.start ? "-" : "Waiting..."}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="caption">Money: RM 0</Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default Board;
