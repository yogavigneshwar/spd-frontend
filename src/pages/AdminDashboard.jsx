import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    coaches: 0,
    attendance: 0,
    performance: 0,
    results: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://spd-backend-production.up.railway.app/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  const cardStyle = {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    minHeight: "180px",
    cursor: "pointer",
    transition: "0.3s",
    position: "relative",
    zIndex: 10,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>
        <h1
          style={{
            fontSize: "48px",
            color: "#facc15",
            marginBottom: "10px",
            fontWeight: "900",
          }}
        >
          Admin Dashboard 📊
        </h1>

        <p
          style={{
            color: "#dbeafe",
            fontSize: "18px",
            marginBottom: "40px",
          }}
        >
          Real-time academy insights & analytics
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          <div
            className="dashboard-card"
            role="button"
            style={cardStyle}
            onClick={() => navigate("/students")}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
              👨‍🎓 Total Students
            </h2>

            <p
              style={{
                fontSize: "56px",
                fontWeight: "900",
                color: "#facc15",
              }}
            >
              {stats.students}
            </p>
          </div>

          <div
            className="dashboard-card"
            role="button"
            style={cardStyle}
            onClick={() => navigate("/coaches")}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
              🏃 Total Coaches
            </h2>

            <p
              style={{
                fontSize: "56px",
                fontWeight: "900",
                color: "#facc15",
              }}
            >
              {stats.coaches}
            </p>
          </div>

          <div
            className="dashboard-card"
            role="button"
            style={cardStyle}
            onClick={() => navigate("/attendance-history")}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
              ✅ Today Attendance
            </h2>

            <p
              style={{
                fontSize: "56px",
                fontWeight: "900",
                color: "#facc15",
              }}
            >
              {stats.attendance}
            </p>
          </div>

          <div
            className="dashboard-card"
            role="button"
            style={cardStyle}
            onClick={() => navigate("/performance")}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
              📈 Performance Records
            </h2>

            <p
              style={{
                fontSize: "56px",
                fontWeight: "900",
                color: "#facc15",
              }}
            >
              {stats.performance}
            </p>
          </div>

          <div
            className="dashboard-card"
            role="button"
            style={cardStyle}
            onClick={() => navigate("/student-results")}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
              🏆 Competition Results
            </h2>

            <p
              style={{
                fontSize: "56px",
                fontWeight: "900",
                color: "#facc15",
              }}
            >
              {stats.results}
            </p>
          </div>
        </div>

        <p
          style={{
            marginTop: "50px",
            textAlign: "center",
            color: "#dbeafe",
          }}
        >
          Powered by Skipnot AD Studios 🚀
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;