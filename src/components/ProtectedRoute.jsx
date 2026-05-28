import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const adminLoggedIn = localStorage.getItem("admin");
  const studentLoggedIn = localStorage.getItem("student");
  const coachLoggedIn = localStorage.getItem("coach");

  if (role === "admin" && !adminLoggedIn) {
    return <Navigate to="/" />;
  }

  if (role === "student" && !studentLoggedIn) {
    return <Navigate to="/student-login" />;
  }

  if (role === "coach" && !coachLoggedIn) {
    return <Navigate to="/coach-login" />;
  }

  return children;
}

export default ProtectedRoute;