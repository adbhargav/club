import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/StudentDashboard/DashboardLayout.jsx";
import ViewProfile from "./pages/StudentDashboard/ViewProfile.jsx";
import TakeAssignments from "./pages/StudentDashboard/TakeAssignments.jsx";
import ViewNotices from "./pages/StudentDashboard/ViewNotices.jsx";
import ViewEvents from "./pages/StudentDashboard/ViewEvents.jsx";
import SubmitProjects from "./pages/StudentDashboard/SubmitProjects.jsx";
import StatsProgress from "./pages/StudentDashboard/StatsProgress.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<ViewProfile />} />
          <Route path="assignments" element={<TakeAssignments />} />
          <Route path="notices" element={<ViewNotices />} />
          <Route path="events" element={<ViewEvents />} />
          <Route path="projects" element={<SubmitProjects />} />
          <Route path="stats" element={<StatsProgress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
