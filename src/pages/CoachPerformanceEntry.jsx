import { useEffect, useState } from "react";
import axios from "axios";

import {
  pageTitle,
  pageSubtitle,
  glassCard,
  footerStyle,
  primaryButton,
} from "../styles/ui";

function PerformanceEntry() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    speed: "",
    height: "", // Mapped to Explosive (Jump)
    stamina: "", // Mapped to Endurance
    strength: "",
    flexibility: "",
  });

  useEffect(() => {
    axios
      .get("https://spd-backend-production.up.railway.app/student/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.studentId) {
      alert("Please select a student");
      return;
    }
    try {
      const payload = {
        studentId: parseInt(form.studentId),
        speed: form.speed ? form.speed.trim() : null,
        height: form.height ? form.height.trim() : null, // Mapped to Explosive (Jump)
        stamina: form.stamina ? form.stamina.trim() : null, // Mapped to Endurance
        strength: form.strength ? form.strength.trim() : null,
        flexibility: form.flexibility ? form.flexibility.trim() : null,
      };

      const API_URL = import.meta.env.VITE_API_URL || "https://spd-backend-production.up.railway.app";

      await axios.post(
        `${API_URL}/performance/add`,
        payload
      );

      alert("Performance Added Successfully 🚀");

      setForm({
        studentId: "",
        speed: "",
        height: "",
        stamina: "",
        strength: "",
        flexibility: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error adding performance");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "white",
    marginBottom: "20px",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none"
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }}>
      <h1 style={pageTitle}>
        Performance Entry 📈
      </h1>

      <p style={pageSubtitle}>
        Add athlete performance metrics
      </p>

      <div
        style={{
          ...glassCard,
          padding: "35px",
          maxWidth: "700px",
          margin: "0 auto"
        }}
      >
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "14px", color: "#94a3b8" }}>
          Select Athlete
        </label>
        <select
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
              style={{ background: "#1e293b", color: "white" }}
            >
              {student.studentName}
            </option>
          ))}
        </select>

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "14px", color: "#94a3b8" }}>
          Speed
        </label>
        <input
          type="text"
          name="speed"
          placeholder="Speed (e.g. 5.2s, High)"
          value={form.speed}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "14px", color: "#94a3b8" }}>
          Explosive (Jump)
        </label>
        <input
          type="text"
          name="height"
          placeholder="Explosive (Jump) (e.g. 2.1m, Good)"
          value={form.height}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "14px", color: "#94a3b8" }}>
          Endurance
        </label>
        <input
          type="text"
          name="stamina"
          placeholder="Endurance (e.g. 10m, Moderate)"
          value={form.stamina}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "14px", color: "#94a3b8" }}>
          Strength
        </label>
        <input
          type="text"
          name="strength"
          placeholder="Strength (e.g. 80kg, High)"
          value={form.strength}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "14px", color: "#94a3b8" }}>
          Flexibility
        </label>
        <input
          type="text"
          name="flexibility"
          placeholder="Flexibility (e.g. 15cm, Excellent)"
          value={form.flexibility}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={primaryButton}
        >
          Save Performance 🚀
        </button>
      </div>

      <p style={footerStyle}>
        Powered by Skipnot AD Studios 🚀
      </p>
    </div>
  );
}

export default PerformanceEntry;