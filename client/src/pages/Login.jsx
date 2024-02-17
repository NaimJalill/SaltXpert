import { Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJoinMutation } from "../features/game/gameApi";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [join, { isLoading }] = useJoinMutation();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  async function handleJoin() {
    try {
      const { id } = await join({ name }).unwrap();
      localStorage.setItem("saltxpert-id", id);
      navigate("/game");
    } catch (error) {
      console.error("Failed to join game", error);
    }
  }

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
            sx={{ backgroundColor: "white" }}
          />
          <Button variant="contained" onClick={handleJoin} disabled={isLoading}>
            Join
          </Button>
        </Stack>
      </Container>
    </>
  );
}
