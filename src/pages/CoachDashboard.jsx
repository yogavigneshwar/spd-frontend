import { useNavigate } from "react-router-dom";

function CoachDashboard() {
  const navigate = useNavigate();

  const coach = JSON.parse(
    localStorage.getItem("coach")
  );

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
            Welcome Coach 🏃
          </h1>

          <p
            style={{
              color: "#dbeafe",
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            Manage athlete performance & training
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("coach");
            navigate("/coach-login");
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
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        <div
          className="dashboard-card"
          role="button"
          style={cardStyle}
          onClick={() =>
            navigate("/coach-scanner")
          }
        >
          <h2 style={{ fontSize: "28px" }}>
            📷 QR Attendance
          </h2>

          <p style={{ color: "#dbeafe" }}>
            Scan student QR for attendance
          </p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          style={cardStyle}
          onClick={() =>
            navigate("/coach-performance-entry")
          }
        >
          <h2 style={{ fontSize: "28px" }}>
            📈 Performance Entry
          </h2>

          <p style={{ color: "#dbeafe" }}>
            Add athlete performance records
          </p>
        </div>

        <div
          className="dashboard-card"
          role="button"
          style={cardStyle}
          onClick={() =>
            navigate("/coach-results-entry")
          }
        >
          <h2 style={{ fontSize: "28px" }}>
            🏆 Competition Results
          </h2>

          <p style={{ color: "#dbeafe" }}>
            Add medals & competition results
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
}

export default CoachDashboard;