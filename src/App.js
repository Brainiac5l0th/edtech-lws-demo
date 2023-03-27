import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/ui/admin";
import { StudentLayout } from "./components/ui/student";
import {
  AdminLogin,
  Assignment,
  AssignmentMark,
  Dashboard,
  Quizzes,
  Videos,
} from "./pages/adminPortal";
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
        {/* student routes start  */}
        <Route path="/">
          <Route index element={<StudentLogin />} />
          <Route path="register" element={<Registration />} />
          <Route element={<StudentLayout />}>
            <Route path="video/:id" element={<CoursePlayer />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Route>
        {/* student routes end  */}

        {/* admin routes start */}
        <Route path="/admin">
          <Route index element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="videos" element={<Videos />} />
            <Route path="assignment" element={<Assignment />} />
            <Route path="assignment-mark" element={<AssignmentMark />} />
          </Route>
        </Route>
        {/* admin routes end */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
