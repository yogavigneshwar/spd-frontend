import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentLogin() {
  const [parentMobile, setParentMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.get(
        `https://spd-backend-production.up.railway.app/student/login?parentMobile=${parentMobile}&password=${password}`
      );

      localStorage.setItem(
        "student",
        JSON.stringify(res.data)
      );

      navigate("/student-dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid student credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "40px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#facc15",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Student Login 🎓
        </h1>

        <p
          style={{
            color: "#dbeafe",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Access your performance & attendance
        </p>

        <input
          type="text"
          placeholder="Parent Mobile"
          value={parentMobile}
          onChange={(e) => setParentMobile(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "none",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "25px",
            borderRadius: "12px",
            border: "none",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "12px",
            background: "#facc15",
            color: "#000",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login 🚀
        </button>
      </div>
    </div>
  );
}

export default StudentLogin;