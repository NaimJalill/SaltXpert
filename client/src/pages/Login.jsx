import { Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    socket.on("joined", (data) => {
      localStorage.setItem("data", JSON.stringify(data));
      navigate("/game");
    });
  }, [navigate]);

  const handleJoin = () => {
    socket.emit("join", name);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Stack spacing={2} mt={10}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <Button variant="contained" onClick={handleJoin}>
            Join
          </Button>
        </Stack>
      </Container>
    </>
  );
}
