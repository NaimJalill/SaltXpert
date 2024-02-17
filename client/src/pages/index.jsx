import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./Login";
import Game from "./game";
import Control from "./Control";
import SocketLayout from "../layout/SocketLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SocketLayout />}>
      <Route index element={<Login />} />
      <Route path="game" element={<Game />} />
      <Route path="control" element={<Control />} />
    </Route>
  )
);

export default router;
