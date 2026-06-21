import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));
  console.log("STUDENT =", student);

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

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div>
          <h1
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
            style={{
              color: "#dbeafe",
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            Track your performance & academy journey
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("student");
            navigate("/student-login");
          }}
          style={{
            padding: "16px 28px",
            borderRadius: "18px",
            border: "none",
            background: "#ef4444",
            color: "white",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Logout 🚪
        </button>
      </div>

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
          onClick={() => navigate("/attendance")}
        >
          <h2 style={{ fontSize: "28px" }}>📅 Attendance</h2>

          <p style={{ color: "#dbeafe" }}>
            View your attendance records
          </p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          style={cardStyle}
          onClick={() => navigate("/performance")}
        >
          <h2 style={{ fontSize: "28px" }}>📈 Performance</h2>

          <p style={{ color: "#dbeafe" }}>
            Track speed, stamina & strength
          </p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          style={cardStyle}
          onClick={() => navigate("/student-results")}
        >
          <h2 style={{ fontSize: "28px" }}>🏆 Results</h2>

          <p style={{ color: "#dbeafe" }}>
            Competition achievements & medals
          </p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          style={cardStyle}
          onClick={() => navigate("/student-qr")}
        >
          <h2 style={{ fontSize: "28px" }}>📷 My QR</h2>

          <p style={{ color: "#dbeafe" }}>
            Scan for attendance tracking
          </p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          style={cardStyle}
          onClick={() => navigate("/student-training")}
        >
          <h2 style={{ fontSize: "28px" }}>🏃 Training</h2>

          <p style={{ color: "#dbeafe" }}>
            Daily training schedules & drills
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
  );
  const student = JSON.parse(localStorage.getItem("student"));
console.log("DASHBOARD STUDENT =", student);
}

export default StudentDashboard;