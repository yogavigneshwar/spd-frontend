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

function AddStudent() {
  const [student, setStudent] = useState({
    studentName: "",
    mobile: "",
    parentMobile: "",
    password: "",
    sport: "",
    age: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://https://spd-backend-production.up.railway.app/student/add",
        student
      );

      alert("Student Added Successfully 😈🔥");

      setStudent({
        studentName: "",
        mobile: "",
        parentMobile: "",
        password: "",
        sport: "",
        age: "",
      });
    } catch (error) {
      console.error(error);

      alert("Error adding student");
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
          Add Student 👨‍🎓
        </h1>

        <p style={pageSubtitle}>
          Register new athletes into SPD
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
            name="studentName"
            placeholder="Student Name"
            value={student.studentName}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Student Mobile"
            value={student.mobile}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="parentMobile"
            placeholder="Parent Mobile"
            value={student.parentMobile}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={student.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="sport"
            placeholder="Sport"
            value={student.sport}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={student.age}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            onClick={handleSubmit}
            style={primaryButton}
          >
            Add Student 🚀
          </button>
        </div>

        <p style={footerStyle}>
          Powered by Skipnot AD Studios 🚀
        </p>
      </div>
    </div>
  );
}

export default AddStudent;