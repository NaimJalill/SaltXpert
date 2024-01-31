import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { useDispatch } from "react-redux";
import { setGame, setCard, setProfessor } from "../features/game/gameSlice";

export default function SocketLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("game", (game) => {
      dispatch(setGame(game));
    });

    socket.on("card", (card) => {
      dispatch(setCard(card));
    });

    socket.on("professor", (data) => {
      dispatch(setProfessor(data));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [dispatch, navigate]);

  return <Outlet />;
}
