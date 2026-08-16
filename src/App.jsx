import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StudentQR from "./pages/StudentQR";
import StudentTraining from "./pages/StudentTraining";
import StudentResults from "./pages/StudentResults";

import CoachDashboard from "./pages/CoachDashboard";
import CoachQRScanner from "./pages/CoachQRScanner";
import CoachPerformanceEntry from "./pages/CoachPerformanceEntry";
import CoachResultsEntry from "./pages/CoachResultsEntry";

import AddStudent from "./pages/AddStudent";
import AddCoach from "./pages/AddCoach";

import Students from "./pages/Students";
import Coaches from "./pages/Coaches";

import Attendance from "./pages/Attendance";
import Performance from "./pages/Performance";
import AttendanceHistory from "./pages/AttendanceHistory";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/student-login" element={<Navigate to="/" replace />} />
        <Route path="/coach-login" element={<Navigate to="/" replace />} />

        {/* Admin Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
                      <Route
              path="/attendance-history"
              element={
                <ProtectedRoute role="admin">
                  <AttendanceHistory />
                </ProtectedRoute>
              }
            />
        <Route
          path="/add-student"
          element={
            <ProtectedRoute role="admin">
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-coach"
          element={
            <ProtectedRoute role="admin">
              <AddCoach />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute role="admin">
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coaches"
          element={
            <ProtectedRoute role="admin">
              <Coaches />
            </ProtectedRoute>
          }
        />

        {/* Student Protected */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-qr"
          element={
            <ProtectedRoute role="student">
              <StudentQR />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-training"
          element={
            <ProtectedRoute role="student">
              <StudentTraining />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-results"
          element={
            <ProtectedRoute role="student">
              <StudentResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute role="student">
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/performance"
          element={
            <ProtectedRoute role="student">
              <Performance />
            </ProtectedRoute>
          }
        />

        {/* Coach Protected */}
        <Route
          path="/coach-dashboard"
          element={
            <ProtectedRoute role="coach">
              <CoachDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach-scanner"
          element={
            <ProtectedRoute role="coach">
              <CoachQRScanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach-performance-entry"
          element={
            <ProtectedRoute role="coach">
              <CoachPerformanceEntry />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach-results-entry"
          element={
            <ProtectedRoute role="coach">
              <CoachResultsEntry />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;