import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  pageContainer,
  pageTitle,
  pageSubtitle,
  glassCard,
  footerStyle,
  primaryButton,
} from "../styles/ui";

function AddCoach() {
  const [coach, setCoach] = useState({
    coachName: "",
    mobile: "",
    password: "",
    specialization: "",
    experience: "",
  });

  const handleChange = (e) => {
    setCoach({
      ...coach,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "https://spd-backend-production.up.railway.app/coach/add",
        coach
      );

      alert("Coach Added Successfully 😈🔥");

      setCoach({
        coachName: "",
        mobile: "",
        password: "",
        specialization: "",
        experience: "",
      });
    } catch (error) {
      console.error(error);

      alert("Error adding coach");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    border: "none",
    marginBottom: "20px",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={pageContainer}>
        <h1 style={pageTitle}>
          Add Coach 🏃
        </h1>

        <p style={pageSubtitle}>
          Register academy coaches & trainers
        </p>

        <div
          style={{
            ...glassCard,
            padding: "35px",
            maxWidth: "700px",
          }}
        >
          <input
            type="text"
            name="coachName"
            placeholder="Coach Name"
            value={coach.coachName}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Coach Mobile"
            value={coach.mobile}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={coach.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={coach.specialization}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            value={coach.experience}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            onClick={handleSubmit}
            style={primaryButton}
          >
            Add Coach 🚀
          </button>
        </div>

        <p style={footerStyle}>
          Powered by Skipnot AD Studios 🚀
        </p>
      </div>
    </div>
  );
}

export default AddCoach;