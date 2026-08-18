import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  pageContainer,
  pageTitle,
  pageSubtitle,
  glassCard,
  tableStyle,
  tableHead,
  thStyle,
  tdStyle,
  footerStyle,
} from "../styles/ui";

function AttendanceHistory() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  
  // Calendar states
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11
  
  const todayStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
  const [selectedDate, setSelectedDate] = useState(todayStr);

  useEffect(() => {
    axios
      .get("https://spd-backend-production.up.railway.app/attendance/all")
      .then((res) => setAttendance(res.data))
      .catch((err) => console.error(err));

    axios
      .get("https://spd-backend-production.up.railway.app/student/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const getStudentDetails = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student ? { name: student.studentName, code: student.studentCode } : { name: "Unknown", code: "N/A" };
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Calendar calculations
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const gridCells = [...blanks, ...days];

  // Helper to format scan times safely from JPA/Jackson LocalDateTime string
  const formatScanTime = (scannedAtStr) => {
    if (!scannedAtStr) return "N/A";
    try {
      const parts = scannedAtStr.split("T");
      if (parts.length < 2) return "N/A";
      const timeParts = parts[1].split(":");
      const hours = parseInt(timeParts[0]);
      const minutes = timeParts[1];
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${String(displayHours).padStart(2, '0')}:${minutes} ${ampm}`;
    } catch (e) {
      return "N/A";
    }
  };

  // Find attendance for selected date
  const selectedDateAttendance = attendance.filter((item) => {
    return item.date === selectedDate;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={pageContainer}>
        <h1 style={pageTitle}>Attendance Calendar 📅</h1>
        <p style={pageSubtitle}>Manage and review athlete attendance history calendar-wise</p>

        {/* Calendar Card */}
        <div style={{ ...glassCard, padding: "30px", marginBottom: "40px" }}>
          {/* Month selector header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px"
          }}>
            <button
              onClick={handlePrevMonth}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                padding: "10px 18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              ◀ Prev
            </button>
            <h2 style={{ fontSize: "24px", color: "#facc15", fontWeight: "800", margin: 0 }}>
              {months[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={handleNextMonth}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                padding: "10px 18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Next ▶
            </button>
          </div>

          {/* Weekday headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "8px",
            textAlign: "center",
            fontWeight: "700",
            color: "#94a3b8",
            fontSize: "14px",
            marginBottom: "10px"
          }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} style={{ padding: "8px" }}>{day}</div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "8px"
          }}>
            {gridCells.map((day, index) => {
              if (day === null) {
                return <div key={`blank-${index}`} style={{ aspectRatio: "1" }}></div>;
              }

              const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayRecords = attendance.filter(item => item.date === dateKey);
              const attendeesCount = dayRecords.length;
              
              const isSelected = dateKey === selectedDate;
              const isToday = dateKey === todayStr;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => setSelectedDate(dateKey)}
                  style={{
                    aspectRatio: "1",
                    background: isSelected ? "#facc15" : "rgba(255,255,255,0.04)",
                    color: isSelected ? "#0f172a" : "white",
                    borderRadius: "12px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    border: isToday && !isSelected ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.08)",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box"
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "14px" }}>{day}</span>
                  {attendeesCount > 0 && (
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "800",
                      background: isSelected ? "rgba(15,23,42,0.15)" : "rgba(74, 222, 128, 0.15)",
                      color: isSelected ? "#0f172a" : "#4ade80",
                      borderRadius: "6px",
                      padding: "2px 6px",
                      alignSelf: "flex-end",
                      border: isSelected ? "none" : "1px solid rgba(74, 222, 128, 0.3)"
                    }}>
                      {attendeesCount} Present
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Attendance List */}
        <h2 style={{ fontSize: "24px", color: "white", marginBottom: "16px", fontWeight: "700" }}>
          Attendees for: <span style={{ color: "#facc15" }}>{selectedDate}</span>
        </h2>

        <div style={{ ...glassCard, overflow: "hidden" }}>
          <table style={tableStyle}>
            <thead style={tableHead}>
              <tr>
                <th style={thStyle}>Student Code</th>
                <th style={thStyle}>Student Name</th>
                <th style={thStyle}>Scan Time</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {selectedDateAttendance.map((item) => {
                const sDetails = getStudentDetails(item.studentId);
                return (
                  <tr
                    key={item.id}
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <td style={{ ...tdStyle, color: "#facc15", fontFamily: "monospace", fontWeight: "bold" }}>
                      {sDetails.code}
                    </td>
                    <td style={tdStyle}>{sDetails.name}</td>
                    <td style={{ ...tdStyle, color: "#38bdf8", fontWeight: "600" }}>
                      {formatScanTime(item.scannedAt)}
                    </td>
                    <td style={{ ...tdStyle, color: "#4ade80", fontWeight: "700" }}>
                      {item.status}
                    </td>
                    <td style={tdStyle}>{item.remarks}</td>
                  </tr>
                );
              })}
              {selectedDateAttendance.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ ...tdStyle, textAlign: "center", color: "#64748b", padding: "30px" }}>
                    No attendance records found for this date.
                  </td>
                </tr>
              )}
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