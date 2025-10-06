// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/signin" replace />; // not logged in
  if (role && role !== userRole) return <Navigate to="/signin" replace />; // role mismatch

  return children;
}
