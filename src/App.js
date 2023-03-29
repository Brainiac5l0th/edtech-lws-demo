import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/ui/admin";
import AuthenticateRoute from "./components/ui/common/AuthenticateRoute";
import PrivateRoute from "./components/ui/common/PrivateRoute";
import PublicRoute from "./components/ui/common/PublicRoute";
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
        <Route element={<AuthenticateRoute />}>
          {/* student routes start  */}
          <Route path="/">
            <Route element={<PublicRoute allowedRole={"student"} />}>
              <Route index element={<StudentLogin />} />
              <Route path="register" element={<Registration />} />
            </Route>

            <Route element={<PrivateRoute allowedRole={"student"} />}>
              <Route element={<StudentLayout />}>
                <Route path="course-video/:id" element={<CoursePlayer />} />
                <Route path="leaderboard" element={<Leaderboard />} />
              </Route>
            </Route>
          </Route>
          {/* student routes end  */}

          {/* admin routes start */}
          <Route path="/admin">
            <Route element={<PublicRoute allowedRole={"admin"} />}>
              <Route index element={<AdminLogin />} />
            </Route>

            <Route element={<PrivateRoute allowedRole={"admin"} />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="videos" element={<Videos />} />
                <Route path="assignment" element={<Assignment />} />
                <Route path="assignment-mark" element={<AssignmentMark />} />
              </Route>
            </Route>
          </Route>
          {/* admin routes end */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
