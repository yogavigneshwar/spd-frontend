import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  pageContainer,
  pageTitle,
  pageSubtitle,
  glassCard,
  searchInput,
  tableStyle,
  tableHead,
  thStyle,
  tdStyle,
  footerStyle,
} from "../styles/ui";

function AttendanceHistory() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://https://spd-backend-production.up.railway.app/attendance/all")
      .then((res) => setAttendance(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://https://spd-backend-production.up.railway.app/student/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const getStudentName = (studentId) => {
    const student = students.find((s) => s.id === studentId);

    return student ? student.studentName : "Unknown";
  };

  const filteredAttendance = attendance.filter((item) => {
    const studentName = getStudentName(
      item.studentId
    ).toLowerCase();

    return (
      studentName.includes(search.toLowerCase()) ||
      item.date?.includes(search) ||
      item.status
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={pageContainer}>
        <h1 style={pageTitle}>
          Attendance History 📅
        </h1>

        <p style={pageSubtitle}>
          Track athlete attendance & records
        </p>

        <input
          type="text"
          placeholder="Search by student / date / status 🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        <div
          style={{
            ...glassCard,
            overflow: "hidden",
          }}
        >
          <table style={tableStyle}>
            <thead style={tableHead}>
              <tr>
                <th style={thStyle}>Student</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderTop:
                      "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <td style={tdStyle}>
                    {getStudentName(item.studentId)}
                  </td>

                  <td style={tdStyle}>
                    {item.date}
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      color:
                        item.status === "Present"
                          ? "#4ade80"
                          : "#f87171",
                      fontWeight: "700",
                    }}
                  >
                    {item.status}
                  </td>

                  <td style={tdStyle}>
                    {item.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={footerStyle}>
          Powered by Skipnot AD Studios 🚀
        </p>
      </div>
    </div>
  );
}

export default AttendanceHistory;