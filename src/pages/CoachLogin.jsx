import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CoachLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.get(
        `http://https://spd-backend-production.up.railway.app/coach/login?mobile=${mobile}&password=${password}`
      );

      localStorage.setItem(
        "coach",
        JSON.stringify(res.data)
      );

      navigate("/coach-dashboard");
    } catch (error) {
      console.log(error.response);

      alert("Invalid coach credentials");
    }
  };

  return (
    <div className="page-center">
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <h1 className="brand-title">SPD</h1>

        <p className="brand-sub">
          Coach Login 🏃
        </p>

        <p className="brand-footer">
          Powered by Skipnot AD Studios 🚀
        </p>

        <input
          type="text"
          placeholder="Coach Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
          className="input-box"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="input-box"
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

export default CoachLogin;