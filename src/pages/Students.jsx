import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "https://spd-backend-production.up.railway.app";

  useEffect(() => {
    axios
      .get(`${API_URL}/student/all`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete student "${name}"? This will permanently delete all associated attendance, performance, and results history.`)) {
      try {
        await axios.delete(`${API_URL}/student/delete/${id}`);
        alert("Student deleted successfully!");
        setStudents(students.filter((student) => student.id !== id));
      } catch (err) {
        console.error(err);
        alert("Error deleting student.");
      }
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.studentName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student.parentMobile?.includes(search) ||
      student.studentCode
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div className="responsive-page-container" style={{ flex: 1, padding: "40px" }}>
        <h1
          className="responsive-title"
          style={{
            fontSize: "48px",
            color: "#facc15",
            fontWeight: "900",
            marginBottom: "10px",
          }}
        >
          Students 👨‍🎓
        </h1>

        <p
          className="responsive-subtitle"
          style={{
            color: "#dbeafe",
            fontSize: "18px",
            marginBottom: "30px",
          }}
        >
          Manage academy students & athlete profiles
        </p>

        <input
          type="text"
          placeholder="Search by name / mobile / student ID 🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="responsive-input"
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            marginBottom: "30px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <div
          className="responsive-card"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div className="table-responsive-wrapper">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead
                style={{
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <tr>
                  <th style={thStyle}>Student Name</th>
                  <th style={thStyle}>Parent Mobile</th>
                  <th style={thStyle}>Student ID</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={tdStyle}>{student.studentName}</td>

                    <td style={tdStyle}>
                      {student.parentMobile}
                    </td>

                    <td
                      style={{
                        ...tdStyle,
                        color: "#facc15",
                        fontWeight: "700",
                      }}
                    >
                      {student.studentCode}
                    </td>

                    <td style={tdStyle}>
                      <button
                        onClick={() => handleDelete(student.id, student.studentName)}
                        className="responsive-btn"
                        style={{
                          padding: "8px 16px",
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          fontWeight: "700",
                          fontSize: "14px",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                        onMouseOver={(e) => e.target.style.background = "#dc2626"}
                        onMouseOut={(e) => e.target.style.background = "#ef4444"}
                      >
                        Delete 🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ ...tdStyle, textAlign: "center", color: "#64748b", padding: "20px" }}>
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          Powered by Skipnot AD Studios 🚀
        </p>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "20px",
  textAlign: "left",
  fontSize: "18px",
};

const tdStyle = {
  padding: "18px",
  fontSize: "16px",
};

export default Students;