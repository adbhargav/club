import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout Components
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Student Dashboard
import DashboardLayout from "./pages/StudentDashboard/DashboardLayout.jsx";
import ViewProfile from "./pages/StudentDashboard/ViewProfile.jsx";
import TakeAssignments from "./pages/StudentDashboard/TakeAssignments.jsx";
import ViewNotices from "./pages/StudentDashboard/ViewNotices.jsx";
import ViewEvents from "./pages/StudentDashboard/ViewEvents.jsx";
import SubmitProjects from "./pages/StudentDashboard/SubmitProjects.jsx";
import StatsProgress from "./pages/StudentDashboard/StatsProgress.jsx";

// Admin Dashboard
import AdminLayout from "./pages/AdminDashboard/AdminLayout.jsx";
import CreateEvent from "./pages/AdminDashboard/CreateEvent.jsx";
import GiveAssignments from "./pages/AdminDashboard/GiveAssignments.jsx";
import IssueNotices from "./pages/AdminDashboard/IssueNotices.jsx";
import UploadGallery from "./pages/AdminDashboard/UploadGallery.jsx";
import ViewProjects from "./pages/AdminDashboard/ViewProjects.jsx";
import ViewStudents from "./pages/AdminDashboard/ViewStudents.jsx";
import ViewContacts from "./pages/AdminDashboard/ViewContacts.jsx";
import CreateTeamMember from "./pages/AdminDashboard/CreateTeamMember.jsx";

// Main Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import Team from "./pages/Team.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

// 🔑 Role-based Private Route
function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/signin" replace />; // not logged in
  if (role && role !== userRole) return <Navigate to="/signin" replace />; // role mismatch

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Student Dashboard Routes */}
            <Route
              path="/student-dashboard/*"
              element={
                <PrivateRoute role="student">
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              <Route path="profile" element={<ViewProfile />} />
              <Route path="assignments" element={<TakeAssignments />} />
              <Route path="notices" element={<ViewNotices />} />
              <Route path="events" element={<ViewEvents />} />
              <Route path="projects" element={<SubmitProjects />} />
              <Route path="stats" element={<StatsProgress />} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute role="admin">
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="give-assignments" element={<GiveAssignments />} />
              <Route path="issue-notices" element={<IssueNotices />} />
              <Route path="upload-gallery" element={<UploadGallery />} />
              <Route path="create-team" element={<CreateTeamMember />} />
              <Route path="view-projects" element={<ViewProjects />} />
              <Route path="view-students" element={<ViewStudents />} />
              <Route path="view-contacts" element={<ViewContacts />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
