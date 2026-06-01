import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://spd-backend-production.up.railway.app/student/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.studentName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student.mobile?.includes(search) ||
      student.studentCode
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>
        <h1
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
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          }}
        >
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
                <th style={thStyle}>Mobile</th>
                <th style={thStyle}>Student ID</th>
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
                  <td style={tdStyle}>{student.mobile}</td>
                  <td
                    style={{
                      ...tdStyle,
                      color: "#facc15",
                      fontWeight: "700",
                    }}
                  >
                    {student.studentCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "#dbeafe",
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