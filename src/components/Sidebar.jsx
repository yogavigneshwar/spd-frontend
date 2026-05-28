import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("coach");
    localStorage.removeItem("student");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "300px",
        minHeight: "100vh",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(18px)",
        borderRight: "1px solid rgba(255,255,255,0.2)",
        padding: "30px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "64px",
            color: "#facc15",
            margin: 0,
            fontWeight: "900",
          }}
        >
          SPD
        </h1>

        <p style={{ color: "#dbeafe", fontSize: "18px", marginTop: "8px" }}>
          Student Performance Drive
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[
            ["📊 Dashboard", "/dashboard"],
            ["👨‍🎓 Students", "/students"],
            ["➕ Add Student", "/add-student"],
            ["🏃 Coaches", "/coaches"],
            ["➕ Add Coach", "/add-coach"],
            ["📅 Attendance History", "/attendance-history"],
          ].map(([label, path]) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                padding: "16px",
                borderRadius: "18px",
                border: "none",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "17px",
                fontWeight: "600",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p
          style={{
            color: "#dbeafe",
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          Powered by Skipnot AD Studios 🚀
        </p>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "16px",
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
    </div>
  );
}

export default Sidebar;