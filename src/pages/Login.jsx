import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  const handleStudentLogin = async () => {
    if (!parentMobile.trim() || !studentPassword.trim()) {
      alert("Please enter parent mobile number and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/login?parentMobile=${parentMobile.trim()}&password=${studentPassword.trim()}`
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
        `${import.meta.env.VITE_API_URL}/coach/login?mobile=${coachMobile.trim()}&password=${coachPassword.trim()}`
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

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(15, 23, 42, 0.65)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    boxSizing: "border-box"
  };

  const tabContainerStyle = {
    display: "flex",
    background: "rgba(255, 255, 255, 0.06)",
    borderRadius: "12px",
    padding: "4px",
    marginBottom: "30px",
    border: "1px solid rgba(255, 255, 255, 0.08)"
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
    textAlign: "center"
  });

  const inputStyle = {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
    marginBottom: "20px",
    outline: "none",
    transition: "border-color 0.2s"
  };

  const buttonStyle = {
    width: "100%",
    padding: "16px",
    background: "#facc15",
    color: "#0f172a",
    fontWeight: "bold",
    fontSize: "18px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    marginTop: "10px"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{
          fontSize: "44px",
          fontWeight: "900",
          color: "#facc15",
          margin: "0 0 8px 0",
          textAlign: "center",
          letterSpacing: "-1px"
        }}>
          SPD PORTAL
        </h1>
        <p style={{
          color: "#dbeafe",
          fontSize: "16px",
          textAlign: "center",
          margin: "0 0 32px 0",
          opacity: 0.8
        }}>
          Student Performance Drive
        </p>

        {/* Tab Selection */}
        <div style={tabContainerStyle}>
          <button style={tabStyle(role === "student")} onClick={() => setRole("student")}>
            Student
          </button>
          <button style={tabStyle(role === "coach")} onClick={() => setRole("coach")}>
            Coach
          </button>
          <button style={tabStyle(role === "admin")} onClick={() => setRole("admin")}>
            Admin
          </button>
        </div>

        {/* Dynamic Form Content */}
        {role === "student" && (
          <div>
            <input
              type="text"
              placeholder="Parent Mobile"
              value={parentMobile}
              onChange={(e) => setParentMobile(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              style={inputStyle}
              onKeyDown={(e) => e.key === "Enter" && handleStudentLogin()}
            />
            <button onClick={handleStudentLogin} style={buttonStyle} disabled={loading}>
              {loading ? "Logging in..." : "Student Login 🚀"}
            </button>
          </div>
        )}

        {role === "coach" && (
          <div>
            <input
              type="text"
              placeholder="Coach Mobile"
              value={coachMobile}
              onChange={(e) => setCoachMobile(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={coachPassword}
              onChange={(e) => setCoachPassword(e.target.value)}
              style={inputStyle}
              onKeyDown={(e) => e.key === "Enter" && handleCoachLogin()}
            />
            <button onClick={handleCoachLogin} style={buttonStyle} disabled={loading}>
              {loading ? "Logging in..." : "Coach Login 🚀"}
            </button>
          </div>
        )}

        {role === "admin" && (
          <div>
            <input
              type="email"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              style={inputStyle}
              onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            <button onClick={handleAdminLogin} style={buttonStyle}>
              Admin Login 🚀
            </button>
          </div>
        )}
      </div>

      <p style={{
        marginTop: "30px",
        fontSize: "14px",
        color: "#94a3b8",
        textAlign: "center"
      }}>
        Powered by Skipnot AD Studios 🚀
      </p>
    </div>
  );
}

export default Login;
