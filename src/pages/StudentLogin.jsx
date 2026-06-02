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
    <div className="page-center">
      <div
        className="glass-card"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#facc15",
            marginBottom: "10px",
          }}
        >
          Student Login 🎓
        </h1>

        <p
          style={{
            color: "#dbeafe",
            marginBottom: "30px",
          }}
        >
          Access your performance & attendance
        </p>

        <input
          type="text"
          placeholder="Parent Mobile"
          value={parentMobile}
          onChange={(e) => setParentMobile(e.target.value)}
          className="input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <button
          onClick={handleLogin}
          className="primary-btn"
        >
          Login 🚀
        </button>
      </div>
    </div>
  );
}

export default StudentLogin;