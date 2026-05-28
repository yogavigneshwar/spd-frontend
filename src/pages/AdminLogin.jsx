import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@spd.com" && password === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="page-center">
      <div
        className="glass-card"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h1 className="brand-title">SPD</h1>
        <p className="brand-sub">Student Performance Drive</p>
        <p className="brand-footer">Powered by Skipnot AD Studios 🚀</p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default AdminLogin;