import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./Login";
import SocketLayout from "../Layout/SocketLayout";
import Player from "./Player";
import Control from "./Control";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
      <Route path="/game" element={<SocketLayout />}>
        <Route index element={<Player />} />
        <Route path="control" element={<Control />} />
      </Route>
    </Route>
  )
);

export default router;
