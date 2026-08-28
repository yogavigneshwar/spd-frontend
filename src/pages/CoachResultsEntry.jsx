import { useEffect, useState } from "react";
import axios from "axios";

import {
  pageTitle,
  pageSubtitle,
  glassCard,
  footerStyle,
  primaryButton,
} from "../styles/ui";

function CoachResultsEntry() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    competitionName: "",
    medal: "",
    date: "",
    remarks: "",
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
        eventName: form.competitionName.trim(),
        position: form.medal.trim(),
        eventDate: form.date ? form.date : null,
        remarks: form.remarks ? form.remarks.trim() : "",
      };

      const API_URL = import.meta.env.VITE_API_URL || "https://spd-backend-production.up.railway.app";

      await axios.post(
        `${API_URL}/results/add`,
        payload
      );

      alert("Competition Result Added Successfully 🚀");

      setForm({
        studentId: "",
        competitionName: "",
        medal: "",
        date: "",
        remarks: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error adding result");
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
        Competition Results 🏆
      </h1>

      <p style={pageSubtitle}>
        Add medals & athlete achievements
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
              {student.studentName} {student.studentCode ? `(${student.studentCode})` : ""}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="competitionName"
          placeholder="Competition Name"
          value={form.competitionName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="medal"
          placeholder="Medal / Position"
          value={form.medal}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={primaryButton}
        >
          Save Result 🚀
        </button>
      </div>

      <p style={footerStyle}>
        Powered by Skipnot AD Studios 🚀
      </p>
    </div>
  );
}

export default CoachResultsEntry;