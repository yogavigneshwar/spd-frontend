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
    height: "",
    weight: "",
    speed: "",
    stamina: "",
    strength: "",
  });

  useEffect(() => {
    axios
      .get("https://https://spd-backend-production.up.railway.app/student/all")
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
    try {
     await axios.post(
`${import.meta.env.VITE_API_URL}/perfomance/add`,
coach
)

      alert("Performance Added 😈🔥");

      setForm({
        studentId: "",
        height: "",
        weight: "",
        speed: "",
        stamina: "",
        strength: "",
      });
    } catch (error) {
      console.error(error);

      alert("Error adding performance");
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
    <div style={{ minHeight: "100vh", padding: "40px" }}>
      <h1 style={pageTitle}>
        Performance Entry 📈
      </h1>

      <p style={pageSubtitle}>
        Add athlete performance analytics
      </p>

      <div
        style={{
          ...glassCard,
          padding: "35px",
          maxWidth: "700px",
        }}
      >
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
            >
              {student.studentName}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="height"
          placeholder="Height"
          value={form.height}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={form.weight}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="speed"
          placeholder="Speed"
          value={form.speed}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="stamina"
          placeholder="Stamina"
          value={form.stamina}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="strength"
          placeholder="Strength"
          value={form.strength}
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