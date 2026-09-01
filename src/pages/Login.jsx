import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import achievement images
import achievement1 from "../assets/achievements/achievement1.jpg";
import achievement2 from "../assets/achievements/achievement2.jpg";
import achievement3 from "../assets/achievements/achievement3.jpg";
import achievement4 from "../assets/achievements/achievement4.jpg";

function Login() {
  const [role, setRole] = useState("student"); // "student" | "coach" | "admin"

  // Input states
  const [parentMobile, setParentMobile] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const [coachMobile, setCoachMobile] = useState("");
  const [coachPassword, setCoachPassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://spd-backend-production.up.railway.app";

  const achievements = [
    {
      id: 1,
      image: achievement1,
      title: "38th TN State Junior Open Athletics Championship",
      event: "State Level Athletic Championship",
      badge: "🥇 Gold / State Winner",
      quote: "Champions aren't born in comfort. They are forged through grit and sweat.",
    },
    {
      id: 2,
      image: achievement2,
      title: "CBSE Cluster VI Athletics Meet (2026-2027)",
      event: "Triple Jump Event • Bronze Medalist",
      badge: "🥉 Bronze Medalist",
      quote: "Hard Work Today, Champion Tomorrow. Keep Training, Keep Winning!",
    },
    {
      id: 3,
      image: achievement3,
      title: "State Junior Inter District Athletics Championship",
      event: "Tirupati Inter-District Championship • 1st Place",
      badge: "🏆 1st Position (Podium Finisher)",
      quote: "Discipline is the bridge between athlete goals and historic accomplishment.",
    },
    {
      id: 4,
      image: achievement4,
      title: "Regional Athletic Meet (TN & Pondicherry)",
      event: "High Jump (Under-17 Girls) • Chloe",
      badge: "🥉 3rd Position Bronze",
      quote: "Success starts with self-belief and relentless training. Keep soaring higher!",
    },
  ];

  const handleStudentLogin = async () => {
    if (!parentMobile.trim() || !studentPassword.trim()) {
      alert("Please enter parent mobile number and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/student/login?parentMobile=${parentMobile.trim()}&password=${studentPassword.trim()}`
      );

      if (!res.data || !res.data.studentName) {
        alert("Invalid student credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("student", JSON.stringify(res.data));
      navigate("/student-dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid student credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleCoachLogin = async () => {
    if (!coachMobile.trim() || !coachPassword.trim()) {
      alert("Please enter mobile number and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/coach/login?mobile=${coachMobile.trim()}&password=${coachPassword.trim()}`
      );

      if (!res.data || !res.data.coachName) {
        alert("Invalid coach credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("coach", JSON.stringify(res.data));
      navigate("/coach-dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid coach credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    if (!adminEmail.trim() || !adminPassword.trim()) {
      alert("Please enter email and password.");
      return;
    }
    if (adminEmail.trim() === "admin@spd.com" && adminPassword.trim() === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  const tabStyle = (active) => ({
    flex: 1,
    padding: "12px",
    background: active ? "#facc15" : "transparent",
    color: active ? "#0f172a" : "#dbeafe",
    fontWeight: "bold",
    fontSize: "15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    textAlign: "center",
  });

  const inputStyle = {
    width: "100%",
    padding: "15px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "white",
    fontSize: "15px",
    boxSizing: "border-box",
    marginBottom: "18px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const buttonStyle = {
    width: "100%",
    padding: "16px",
    background: "#facc15",
    color: "#0f172a",
    fontWeight: "800",
    fontSize: "17px",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 8px 24px rgba(250, 204, 21, 0.25)",
    marginTop: "6px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top left, #1e293b, #0f172a)",
        color: "white",
        padding: "30px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Top Header Banner */}
      <div style={{ textAlign: "center", marginBottom: "35px", maxWidth: "900px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span style={{ fontSize: "28px" }}>🏃</span>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "900",
              color: "#facc15",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            SMART SPORTS FOUNDATION
          </h1>
        </div>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "16px",
            margin: "0 0 10px 0",
            fontWeight: "600",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          DISCIPLINE • DEDICATION • DESTINATION
        </p>
        <p style={{ color: "#38bdf8", fontSize: "14px", margin: 0, fontWeight: "500" }}>
          Student Performance Drive (SPD) Portal
        </p>
      </div>

      {/* Main Grid: Login Portal (Left) & Achievements Gallery (Right) */}
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "35px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Login Card & Motivation Box */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "24px",
              padding: "35px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",
              boxSizing: "border-box",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#facc15",
                margin: "0 0 6px 0",
                textAlign: "center",
              }}
            >
              Sign In to SPD
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                textAlign: "center",
                margin: "0 0 24px 0",
              }}
            >
              Select your role to access your dashboard
            </p>

            {/* Tab Selectors */}
            <div
              style={{
                display: "flex",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "12px",
                padding: "4px",
                marginBottom: "25px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <button style={tabStyle(role === "student")} onClick={() => setRole("student")}>
                Student 👨‍🎓
              </button>
              <button style={tabStyle(role === "coach")} onClick={() => setRole("coach")}>
                Coach 🏃
              </button>
              <button style={tabStyle(role === "admin")} onClick={() => setRole("admin")}>
                Admin 🛡️
              </button>
            </div>

            {/* Form Fields */}
            {role === "student" && (
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  Parent Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="Enter registered mobile number"
                  value={parentMobile}
                  onChange={(e) => setParentMobile(e.target.value)}
                  style={inputStyle}
                />
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter student password"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  style={inputStyle}
                  onKeyDown={(e) => e.key === "Enter" && handleStudentLogin()}
                />
                <button onClick={handleStudentLogin} style={buttonStyle} disabled={loading}>
                  {loading ? "Logging in..." : "Access Student Dashboard 🚀"}
                </button>
              </div>
            )}

            {role === "coach" && (
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  Coach Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="Enter coach mobile"
                  value={coachMobile}
                  onChange={(e) => setCoachMobile(e.target.value)}
                  style={inputStyle}
                />
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter coach password"
                  value={coachPassword}
                  onChange={(e) => setCoachPassword(e.target.value)}
                  style={inputStyle}
                  onKeyDown={(e) => e.key === "Enter" && handleCoachLogin()}
                />
                <button onClick={handleCoachLogin} style={buttonStyle} disabled={loading}>
                  {loading ? "Logging in..." : "Access Coach Dashboard 🚀"}
                </button>
              </div>
            )}

            {role === "admin" && (
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  Admin Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@spd.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  style={inputStyle}
                />
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={inputStyle}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                />
                <button onClick={handleAdminLogin} style={buttonStyle}>
                  Access Admin Dashboard 🚀
                </button>
              </div>
            )}
          </div>

          {/* Inspirational Motto Box */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(15, 23, 42, 0.6))",
              border: "1px solid rgba(250, 204, 21, 0.25)",
              borderRadius: "20px",
              padding: "22px 26px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "24px" }}>🔥</span>
            <p
              style={{
                color: "#facc15",
                fontSize: "16px",
                fontWeight: "700",
                fontStyle: "italic",
                margin: "8px 0 4px 0",
              }}
            >
              "Hard Work Today, Champion Tomorrow. Keep Training, Keep Winning!"
            </p>
            <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
              Smart Sports Foundation • Sakthi Memorial Academy
            </p>
          </div>
        </div>

        {/* Right Column: Achievements Showcase */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "900",
                  color: "#facc15",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Achievements of Our Students 🏆
              </h2>
              <p style={{ color: "#dbeafe", fontSize: "14px", margin: "4px 0 0 0", opacity: 0.85 }}>
                Celebrating the victories and dedication of our champions
              </p>
            </div>
            <span
              style={{
                fontSize: "12px",
                color: "#facc15",
                background: "rgba(250, 204, 21, 0.15)",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(250, 204, 21, 0.3)",
                fontWeight: "700",
              }}
            >
              Click poster to zoom 🔍
            </span>
          </div>

          {/* 2x2 Grid of Achievement Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {achievements.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                style={{
                  background: "rgba(15, 23, 42, 0.75)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "#facc15";
                  e.currentTarget.style.boxShadow = "0 18px 35px rgba(250, 204, 21, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
                }}
              >
                {/* Poster Image */}
                <div style={{ position: "relative", height: "220px", overflow: "hidden", background: "#000" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      left: "8px",
                      background: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(6px)",
                      color: "#facc15",
                      padding: "4px 10px",
                      borderRadius: "10px",
                      fontSize: "11px",
                      fontWeight: "800",
                      border: "1px solid rgba(250, 204, 21, 0.3)",
                    }}
                  >
                    {item.badge}
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "white",
                        margin: "0 0 6px 0",
                        lineHeight: "1.3",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 10px 0" }}>
                      {item.event}
                    </p>
                  </div>
                  <p
                    style={{
                      color: "#cbd5e1",
                      fontSize: "11.5px",
                      fontStyle: "italic",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "8px",
                      margin: 0,
                    }}
                  >
                    "{item.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for zoomed image view */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0f172a",
              border: "1px solid rgba(250, 204, 21, 0.4)",
              borderRadius: "24px",
              maxWidth: "650px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "white",
                fontSize: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              ✕
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              style={{
                width: "100%",
                maxHeight: "68vh",
                objectFit: "contain",
                background: "#000",
                display: "block",
              }}
            />

            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ fontSize: "18px", color: "#facc15", margin: 0, fontWeight: "800" }}>
                  {selectedImage.title}
                </h3>
                <span
                  style={{
                    background: "#facc15",
                    color: "#0f172a",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "800",
                  }}
                >
                  {selectedImage.badge}
                </span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 10px 0" }}>
                {selectedImage.event}
              </p>
              <p
                style={{
                  color: "#e2e8f0",
                  fontSize: "13px",
                  fontStyle: "italic",
                  borderLeft: "3px solid #facc15",
                  paddingLeft: "12px",
                  margin: 0,
                }}
              >
                "{selectedImage.quote}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          marginTop: "40px",
          textAlign: "center",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        Powered by Skipnot AD Studios 🚀 • Student Performance Drive
      </footer>
    </div>
  );
}

export default Login;
