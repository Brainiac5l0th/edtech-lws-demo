import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/ui/student";
import {
  CoursePlayer,
  Leaderboard,
  Registration,
  StudentLogin,
} from "./pages/studentPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<StudentLogin />} />
          <Route path="register" element={<Registration />} />
          <Route element={<PrivateRoute />}>
          <Route path="video/:id" element={<CoursePlayer />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
