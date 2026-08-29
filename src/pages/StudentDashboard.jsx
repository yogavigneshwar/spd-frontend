import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { generateMonthlyReportPDF } from "../utils/reportGenerator";

function StudentDashboard() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const student = JSON.parse(localStorage.getItem("student"));

  const API_URL = import.meta.env.VITE_API_URL || "https://spd-backend-production.up.railway.app";

  const cardStyle = {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "24px",
    padding: "30px",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    transition: "0.3s",
    position: "relative",
    zIndex: 10,
  };

  const handleDownloadMonthlyReport = async () => {
    if (!student || !student.id) {
      alert("No student session found. Please log in again.");
      return;
    }

    try {
      setIsDownloading(true);

      const [attendanceRes, performanceRes, resultsRes] = await Promise.all([
        axios.get(`${API_URL}/attendance/student/${student.id}`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/performance/student/${student.id}`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/results/student/${student.id}`).catch(() => ({ data: [] })),
      ]);

      generateMonthlyReportPDF({
        student,
        attendance: attendanceRes.data || [],
        performance: performanceRes.data || [],
        results: resultsRes.data || [],
      });
    } catch (error) {
      console.error("Error generating monthly report:", error);
      alert("Unable to generate report at this time. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="responsive-page-container" style={{ minHeight: "100vh", padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        <div>
          <h1
            className="responsive-title"
            style={{
              fontSize: "54px",
              color: "#facc15",
              margin: 0,
              fontWeight: "900",
            }}
          >
            Welcome, {student?.studentName} 🎓
          </h1>

          <p
            className="responsive-subtitle"
            style={{
              color: "#dbeafe",
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            Track your performance & academy journey
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={handleDownloadMonthlyReport}
            disabled={isDownloading}
            className="responsive-btn"
            style={{
              padding: "16px 24px",
              borderRadius: "18px",
              border: "none",
              background: "#facc15",
              color: "#0f172a",
              fontSize: "16px",
              fontWeight: "800",
              cursor: isDownloading ? "not-allowed" : "pointer",
              opacity: isDownloading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 8px 20px rgba(250, 204, 21, 0.25)",
            }}
          >
            {isDownloading ? "Generating PDF... ⏳" : "📥 Get Monthly Report (PDF)"}
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("student");
              navigate("/");
            }}
            className="responsive-btn"
            style={{
              padding: "16px 24px",
              borderRadius: "18px",
              border: "none",
              background: "#ef4444",
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Logout 🚪
          </button>
        </div>
      </div>

      <div
        className="responsive-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Monthly Report Action Card */}
        <div
          className="dashboard-card responsive-card"
          style={{
            ...cardStyle,
            border: "1px solid rgba(250, 204, 21, 0.4)",
            background: "linear-gradient(135deg, rgba(250, 204, 21, 0.15), rgba(255, 255, 255, 0.08))",
          }}
          onClick={handleDownloadMonthlyReport}
        >
          <h2 style={{ color: "#facc15" }}>📄 Monthly Report</h2>
          <p>{isDownloading ? "Generating PDF document..." : "Download official PDF progress & tracking report"}</p>
        </div>

        <div className="dashboard-card responsive-card" style={cardStyle} onClick={() => navigate("/attendance")}>
          <h2>📅 Attendance</h2>
          <p>View your attendance records</p>
        </div>

        <div className="dashboard-card responsive-card" style={cardStyle} onClick={() => navigate("/performance")}>
          <h2>📈 Performance</h2>
          <p>Track speed, stamina & strength</p>
        </div>

        <div className="dashboard-card responsive-card" style={cardStyle} onClick={() => navigate("/student-results")}>
          <h2>🏆 Results</h2>
          <p>Competition achievements & medals</p>
        </div>

        <div className="dashboard-card responsive-card" style={cardStyle} onClick={() => navigate("/student-qr")}>
          <h2>📷 My QR</h2>
          <p>Scan for attendance tracking</p>
        </div>

        <div className="dashboard-card responsive-card" style={cardStyle} onClick={() => navigate("/student-training")}>
          <h2>🏃 Training</h2>
          <p>Daily training schedules & drills</p>
        </div>
      </div>

      <p
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        Powered by Skipnot AD Studios 🚀
      </p>
    </div>
  );
}

export default StudentDashboard;