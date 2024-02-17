import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { setGame } from "../features/game/gameSlice";

export default function SocketLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const load = useSelector((state) => state.game.load);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("game", (game) => {
      dispatch(setGame(game));

      if (location.pathname === "/control") {
        return;
      }

      const id = localStorage.getItem("saltxpert-id");

      if (game?.end || game === null) {
        localStorage.removeItem("saltxpert-id");
        navigate("/");
        return;
      }

      if (game.players.some((player) => player.id === id)) {
        if (location.pathname === "/") navigate("/game");
      } else {
        localStorage.removeItem("saltxpert-id");
        if (location.pathname === "/game") navigate("/");
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("game");
    };
  }, [dispatch, location.pathname, navigate]);

  if (!load) return <div>Loading...</div>;

  return <Outlet />;
}
