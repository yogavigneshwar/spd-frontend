import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  pageTitle,
  pageSubtitle,
  glassCard,
  tableStyle,
  tableHead,
  thStyle,
  tdStyle,
} from "../styles/ui";

function CoachNutrition() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "https://spd-backend-production.up.railway.app";

  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [students, setStudents] = useState([]);
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "filled" | "pending"
  const [selectedLog, setSelectedLog] = useState(null); // for popup modal detail

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsRes, nutritionRes] = await Promise.all([
        axios.get(`${API_URL}/student/all`),
        axios.get(`${API_URL}/nutrition/date/${selectedDate}`).catch(() => ({ data: [] })),
      ]);

      setStudents(studentsRes.data || []);
      setNutritionLogs(nutritionRes.data || []);
    } catch (err) {
      console.error("Error fetching coach nutrition data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Map students with their nutrition log for the selected date
  const studentNutritionMap = new Map();
  nutritionLogs.forEach((log) => {
    studentNutritionMap.set(log.studentId, log);
  });

  const combinedList = students.map((student) => {
    const log = studentNutritionMap.get(student.id);
    return {
      ...student,
      hasLogged: !!log,
      nutritionLog: log || null,
    };
  });

  // Filtered List
  const filteredList = combinedList.filter((item) => {
    const matchesSearch =
      (item.studentName && item.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.studentCode && item.studentCode.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === "filled") return item.hasLogged;
    if (statusFilter === "pending") return !item.hasLogged;
    return true;
  });

  const totalStudents = students.length;
  const filledCount = combinedList.filter((s) => s.hasLogged).length;
  const pendingCount = totalStudents - filledCount;
  const complianceRate = totalStudents > 0 ? Math.round((filledCount / totalStudents) * 100) : 0;

  // Helper to format time (e.g. "05:30" -> "05:30 AM")
  const formatTimeDisplay = (timeStr) => {
    if (!timeStr) return "-";
    try {
      const [h, m] = timeStr.split(":");
      const hours = parseInt(h, 10);
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${String(displayHours).padStart(2, "0")}:${m} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  const statCardStyle = {
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "18px",
    padding: "20px 24px",
    flex: "1 1 200px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
  };

  return (
    <div className="responsive-page-container" style={{ minHeight: "100vh", padding: "40px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <button
            onClick={() => navigate("/coach-dashboard")}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#facc15",
              padding: "8px 16px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "14px",
              marginBottom: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ← Back to Dashboard
          </button>
          <h1 className="responsive-title" style={pageTitle}>
            Students Daily Nutrition 🥗
          </h1>
          <p className="responsive-subtitle" style={pageSubtitle}>
            Monitor athlete dietary intake, hydration, and sleep discipline
          </p>
        </div>

        {/* Date Selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ color: "#facc15", fontWeight: "700", fontSize: "15px" }}>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(250, 204, 21, 0.4)",
              background: "rgba(15, 23, 42, 0.8)",
              color: "#facc15",
              fontSize: "15px",
              fontWeight: "700",
              colorScheme: "dark",
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div
        style={{
          display: "flex",
          gap: "18px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={statCardStyle}>
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, fontWeight: "600" }}>TOTAL ATHLETES</p>
          <h2 style={{ fontSize: "32px", color: "white", margin: "8px 0 0 0", fontWeight: "900" }}>
            {totalStudents}
          </h2>
        </div>

        <div style={{ ...statCardStyle, border: "1px solid rgba(34, 197, 94, 0.4)" }}>
          <p style={{ color: "#86efac", fontSize: "13px", margin: 0, fontWeight: "600" }}>FILLED TODAY</p>
          <h2 style={{ fontSize: "32px", color: "#22c55e", margin: "8px 0 0 0", fontWeight: "900" }}>
            {filledCount} ✅
          </h2>
        </div>

        <div style={{ ...statCardStyle, border: "1px solid rgba(239, 68, 68, 0.4)" }}>
          <p style={{ color: "#fca5a5", fontSize: "13px", margin: 0, fontWeight: "600" }}>PENDING</p>
          <h2 style={{ fontSize: "32px", color: "#ef4444", margin: "8px 0 0 0", fontWeight: "900" }}>
            {pendingCount} ⏳
          </h2>
        </div>

        <div style={{ ...statCardStyle, border: "1px solid rgba(250, 204, 21, 0.4)" }}>
          <p style={{ color: "#fef08a", fontSize: "13px", margin: 0, fontWeight: "600" }}>COMPLIANCE RATE</p>
          <h2 style={{ fontSize: "32px", color: "#facc15", margin: "8px 0 0 0", fontWeight: "900" }}>
            {complianceRate}%
          </h2>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search student name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "12px 18px",
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            background: "rgba(255, 255, 255, 0.06)",
            color: "white",
            fontSize: "14px",
            minWidth: "260px",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["all", "filled", "pending"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                background: statusFilter === status ? "#facc15" : "rgba(255, 255, 255, 0.08)",
                color: statusFilter === status ? "#0f172a" : "white",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {status === "all" ? "All Students" : status === "filled" ? "Filled Only ✅" : "Pending ⏳"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div
        className="responsive-card"
        style={{
          ...glassCard,
          overflow: "hidden",
          marginBottom: "40px",
        }}
      >
        <div className="table-responsive-wrapper">
          <table style={tableStyle}>
            <thead style={tableHead}>
              <tr>
                <th style={thStyle}>Student</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Wake Up</th>
                <th style={thStyle}>Breakfast</th>
                <th style={thStyle}>Lunch</th>
                <th style={thStyle}>Training Fuel</th>
                <th style={thStyle}>Dinner</th>
                <th style={thStyle}>Sleep Time</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ ...tdStyle, textAlign: "center", padding: "30px" }}>
                    Loading nutrition logs... ⏳
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ ...tdStyle, textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                    No student records match your criteria.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      background: item.hasLogged ? "rgba(34, 197, 94, 0.03)" : "transparent",
                    }}
                  >
                    {/* Student Info */}
                    <td style={tdStyle}>
                      <strong style={{ color: "white", display: "block" }}>{item.studentName}</strong>
                      <span style={{ fontSize: "12px", color: "#facc15" }}>{item.studentCode || "-"}</span>
                    </td>

                    {/* Status Badge */}
                    <td style={tdStyle}>
                      {item.hasLogged ? (
                        <span
                          style={{
                            background: "rgba(34, 197, 94, 0.2)",
                            color: "#86efac",
                            padding: "4px 10px",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontWeight: "800",
                            border: "1px solid rgba(34, 197, 94, 0.4)",
                          }}
                        >
                          Filled ✅
                        </span>
                      ) : (
                        <span
                          style={{
                            background: "rgba(239, 68, 68, 0.15)",
                            color: "#fca5a5",
                            padding: "4px 10px",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontWeight: "700",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                          }}
                        >
                          Pending ⏳
                        </span>
                      )}
                    </td>

                    {/* Wake Up */}
                    <td style={tdStyle}>
                      {item.nutritionLog?.wakeUpTime ? (
                        <span style={{ color: "#38bdf8", fontWeight: "700" }}>
                          {formatTimeDisplay(item.nutritionLog.wakeUpTime)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Breakfast */}
                    <td style={{ ...tdStyle, maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.nutritionLog?.breakfast || "-"}
                    </td>

                    {/* Lunch */}
                    <td style={{ ...tdStyle, maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.nutritionLog?.lunch || "-"}
                    </td>

                    {/* Training Fuel */}
                    <td style={{ ...tdStyle, maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.nutritionLog?.preTraining || item.nutritionLog?.afterTraining || "-"}
                    </td>

                    {/* Dinner */}
                    <td style={{ ...tdStyle, maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.nutritionLog?.dinner || "-"}
                    </td>

                    {/* Sleep Time */}
                    <td style={tdStyle}>
                      {item.nutritionLog?.sleepTime ? (
                        <span style={{ color: "#c084fc", fontWeight: "700" }}>
                          {formatTimeDisplay(item.nutritionLog.sleepTime)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Action */}
                    <td style={tdStyle}>
                      {item.hasLogged ? (
                        <button
                          onClick={() => setSelectedLog({ studentName: item.studentName, studentCode: item.studentCode, ...item.nutritionLog })}
                          style={{
                            background: "#facc15",
                            color: "#0f172a",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "800",
                            cursor: "pointer",
                          }}
                        >
                          View Details 🔍
                        </button>
                      ) : (
                        <span style={{ color: "#64748b", fontSize: "12px" }}>No entry</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL POPUP */}
      {selectedLog && (
        <div
          onClick={() => setSelectedLog(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0f172a",
              border: "1px solid rgba(250, 204, 21, 0.4)",
              borderRadius: "24px",
              maxWidth: "600px",
              width: "100%",
              padding: "30px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ color: "#facc15", fontSize: "22px", margin: 0, fontWeight: "800" }}>
                  {selectedLog.studentName}
                </h3>
                <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                  ID: {selectedLog.studentCode} • Date: {selectedLog.logDate}
                </span>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  color: "white",
                  fontSize: "18px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>⏰ Morning Wake Up:</strong>
                {formatTimeDisplay(selectedLog.wakeUpTime)}
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>⚡ Before Training Intake:</strong>
                {selectedLog.beforeTraining || "-"}
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>🍳 Morning Breakfast:</strong>
                {selectedLog.breakfast || "-"}
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>🍎 In-Between Snacks:</strong>
                {selectedLog.snacks || "-"}
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>🍲 Lunch:</strong>
                {selectedLog.lunch || "-"}
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>🏃 Evening Pre-Training:</strong>
                {selectedLog.preTraining || "-"}
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>🥤 After Training Recovery:</strong>
                {selectedLog.afterTraining || "-"}
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>🍽️ Dinner:</strong>
                {selectedLog.dinner || "-"}
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px 16px", borderRadius: "12px" }}>
                <strong style={{ color: "#c084fc", display: "block", marginBottom: "4px" }}>🌙 Sleeping Time:</strong>
                {formatTimeDisplay(selectedLog.sleepTime)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <p style={{ marginTop: "50px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
        Powered by Skipnot AD Studios 🚀 • Athlete Dietary Monitoring System
      </p>
    </div>
  );
}

export default CoachNutrition;
