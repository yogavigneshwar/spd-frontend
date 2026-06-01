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
        `https://https://spd-backend-production.up.railway.app/student/login?parentMobile=${parentMobile}&password=${password}`
      );

      localStorage.setItem("student", JSON.stringify(res.data));
      navigate("/student-dashboard");
    } catch (error) {
      alert("Invalid student credentials");
    }
  };

  return (
    <div className="page-center">
      <div
        className="glass-card"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h1 className="brand-title">SPD</h1>

        <p className="brand-sub">Student Login 🎓</p>

        <p className="brand-footer">
          Powered by Skipnot AD Studios 🚀
        </p>

        <input
          type="text"
          placeholder="Parent Mobile Number"
          value={parentMobile}
          onChange={(e) => setParentMobile(e.target.value)}
          className="input-box"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
        />

        <button onClick={handleLogin} className="primary-btn">
          Login 🚀
        </button>
      </div>
    </div>
  );
}

export default StudentLogin;