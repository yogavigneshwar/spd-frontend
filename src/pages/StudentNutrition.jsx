import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentNutrition() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  const API_URL = import.meta.env.VITE_API_URL || "https://spd-backend-production.up.railway.app";

  // Today's date string in YYYY-MM-DD
  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [beforeTraining, setBeforeTraining] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [snacks, setSnacks] = useState("");
  const [lunch, setLunch] = useState("");
  const [preTraining, setPreTraining] = useState("");
  const [afterTraining, setAfterTraining] = useState("");
  const [dinner, setDinner] = useState("");
  const [sleepTime, setSleepTime] = useState("");

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [historyLogs, setHistoryLogs] = useState([]);
  const [viewMode, setViewMode] = useState("entry"); // "entry" | "history"

  // Fetch past logs and selected date's log
  useEffect(() => {
    if (!student || !student.id) return;
    fetchStudentLogs();
  }, [student]);

  useEffect(() => {
    if (!student || !student.id) return;
    loadLogForDate(selectedDate);
  }, [selectedDate]);

  const fetchStudentLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/nutrition/student/${student.id}`);
      setHistoryLogs(res.data || []);
    } catch (err) {
      console.error("Error fetching nutrition history:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadLogForDate = async (date) => {
    try {
      const res = await axios.get(`${API_URL}/nutrition/student/${student.id}/date/${date}`);
      if (res.data) {
        setWakeUpTime(res.data.wakeUpTime || "");
        setBeforeTraining(res.data.beforeTraining || "");
        setBreakfast(res.data.breakfast || "");
        setSnacks(res.data.snacks || "");
        setLunch(res.data.lunch || "");
        setPreTraining(res.data.preTraining || "");
        setAfterTraining(res.data.afterTraining || "");
        setDinner(res.data.dinner || "");
        setSleepTime(res.data.sleepTime || "");
      } else {
        clearForm();
      }
    } catch (err) {
      clearForm();
    }
  };

  const clearForm = () => {
    setWakeUpTime("");
    setBeforeTraining("");
    setBreakfast("");
    setSnacks("");
    setLunch("");
    setPreTraining("");
    setAfterTraining("");
    setDinner("");
    setSleepTime("");
  };

  const handleSaveNutrition = async (e) => {
    e.preventDefault();
    if (!student || !student.id) {
      alert("Please log in as a student.");
      return;
    }

    setSaving(true);
    setSaveMessage("");

    const payload = {
      studentId: student.id,
      logDate: selectedDate,
      wakeUpTime,
      beforeTraining,
      breakfast,
      snacks,
      lunch,
      preTraining,
      afterTraining,
      dinner,
      sleepTime,
    };

    try {
      await axios.post(`${API_URL}/nutrition/save`, payload);
      setSaveMessage("Nutrition & routine saved successfully! ✅");
      fetchStudentLogs();
      setTimeout(() => setSaveMessage(""), 4000);
    } catch (err) {
      console.error("Error saving nutrition:", err);
      alert("Failed to save nutrition log. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Helper to format time (e.g. "05:30" -> "05:30 AM")
  const formatTimeDisplay = (timeStr) => {
    if (!timeStr) return "Not logged";
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

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.06)",
    color: "white",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const timeInputStyle = {
    ...inputStyle,
    padding: "12px 16px",
    cursor: "pointer",
    colorScheme: "dark",
    fontWeight: "700",
    color: "#facc15",
    fontSize: "16px",
  };

  const sectionCardStyle = {
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
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
            onClick={() => navigate("/student-dashboard")}
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
          <h1
            className="responsive-title"
            style={{
              fontSize: "44px",
              color: "#facc15",
              margin: 0,
              fontWeight: "900",
            }}
          >
            Daily Nutrition & Routine 🥗
          </h1>
          <p className="responsive-subtitle" style={{ color: "#dbeafe", fontSize: "16px", marginTop: "6px" }}>
            Log your daily meals, hydration, and sleep schedule for peak athletic performance
          </p>
        </div>

        {/* View Switcher Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setViewMode("entry")}
            className="responsive-btn"
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "none",
              background: viewMode === "entry" ? "#facc15" : "rgba(255,255,255,0.1)",
              color: viewMode === "entry" ? "#0f172a" : "#dbeafe",
              fontSize: "15px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            ✍️ Log Daily Intake
          </button>
          <button
            onClick={() => setViewMode("history")}
            className="responsive-btn"
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "none",
              background: viewMode === "history" ? "#facc15" : "rgba(255,255,255,0.1)",
              color: viewMode === "history" ? "#0f172a" : "#dbeafe",
              fontSize: "15px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            📜 Intake History ({historyLogs.length})
          </button>
        </div>
      </div>

      {/* Save Success Alert Banner */}
      {saveMessage && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(15, 23, 42, 0.8))",
            border: "1px solid #22c55e",
            color: "#86efac",
            padding: "14px 20px",
            borderRadius: "14px",
            marginBottom: "24px",
            fontWeight: "700",
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {saveMessage}
        </div>
      )}

      {/* VIEW 1: ENTRY FORM */}
      {viewMode === "entry" && (
        <form onSubmit={handleSaveNutrition} style={{ maxWidth: "860px" }}>
          {/* Date Selector Box */}
          <div style={sectionCardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ color: "#facc15", margin: 0, fontSize: "18px" }}>📅 Select Intake Date</h3>
                <p style={{ color: "#94a3b8", fontSize: "13px", margin: "4px 0 0 0" }}>
                  Editing intake for: <strong>{selectedDate}</strong>
                </p>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  ...inputStyle,
                  width: "auto",
                  colorScheme: "dark",
                  fontWeight: "700",
                  color: "#facc15",
                }}
              />
            </div>
          </div>

          {/* 1. Morning Routine Section */}
          <div style={sectionCardStyle}>
            <h3 style={{ color: "#facc15", margin: "0 0 16px 0", fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              🌅 Morning Routine & Breakfast
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  ⏰ Morning Wake Up Time
                </label>
                <input
                  type="time"
                  value={wakeUpTime}
                  onChange={(e) => setWakeUpTime(e.target.value)}
                  style={timeInputStyle}
                />
                <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>
                  Logged as: {formatTimeDisplay(wakeUpTime)}
                </span>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  ⚡ Before Training Intake
                </label>
                <input
                  type="text"
                  placeholder="e.g. Banana, Dry fruits, Water, Energy drink"
                  value={beforeTraining}
                  onChange={(e) => setBeforeTraining(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                🍳 Morning Breakfast
              </label>
              <textarea
                rows="2"
                placeholder="e.g. 4 boiled eggs, Oats with milk, Idli / Sambar, Fruits"
                value={breakfast}
                onChange={(e) => setBreakfast(e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
          </div>

          {/* 2. Midday & Lunch Section */}
          <div style={sectionCardStyle}>
            <h3 style={{ color: "#facc15", margin: "0 0 16px 0", fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              ☀️ Midday Fuel & Lunch
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                🍎 In Between Snacks (Mid-Morning / Afternoon)
              </label>
              <input
                type="text"
                placeholder="e.g. Sprouts, Peanut butter toast, Seasonal fruits, Nuts"
                value={snacks}
                onChange={(e) => setSnacks(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                🍲 Lunch
              </label>
              <textarea
                rows="2"
                placeholder="e.g. Rice with Dal, Chicken breast / Paneer, Vegetables, Curd"
                value={lunch}
                onChange={(e) => setLunch(e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
          </div>

          {/* 3. Evening & Training Section */}
          <div style={sectionCardStyle}>
            <h3 style={{ color: "#facc15", margin: "0 0 16px 0", fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              🏃 Evening Session & Recovery
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  🏃 Evening Pre-Training Intake
                </label>
                <input
                  type="text"
                  placeholder="e.g. Banana, Electrolytes, Sweet potato"
                  value={preTraining}
                  onChange={(e) => setPreTraining(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                  🥤 After Training Recovery
                </label>
                <input
                  type="text"
                  placeholder="e.g. Protein shake, Boiled eggs, Coconut water"
                  value={afterTraining}
                  onChange={(e) => setAfterTraining(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* 4. Dinner & Sleep Routine Section */}
          <div style={sectionCardStyle}>
            <h3 style={{ color: "#facc15", margin: "0 0 16px 0", fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              🌙 Dinner & Sleep Routine
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                🍽️ Dinner
              </label>
              <textarea
                rows="2"
                placeholder="e.g. Chapati with Veggies, Grilled fish/chicken, Warm milk"
                value={dinner}
                onChange={(e) => setDinner(e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <div style={{ maxWidth: "300px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
                🌙 Sleeping Time
              </label>
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                style={timeInputStyle}
              />
              <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>
                Logged as: {formatTimeDisplay(sleepTime)}
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={saving}
            className="responsive-btn"
            style={{
              width: "100%",
              padding: "18px",
              background: "#facc15",
              color: "#0f172a",
              fontWeight: "900",
              fontSize: "18px",
              border: "none",
              borderRadius: "16px",
              cursor: saving ? "not-allowed" : "pointer",
              boxShadow: "0 10px 30px rgba(250, 204, 21, 0.3)",
              transition: "all 0.25s ease",
            }}
          >
            {saving ? "Saving Daily Intake... ⏳" : "💾 Save Nutrition & Routine Log"}
          </button>
        </form>
      )}

      {/* VIEW 2: HISTORY LOGS */}
      {viewMode === "history" && (
        <div style={{ maxWidth: "900px" }}>
          {historyLogs.length === 0 ? (
            <div style={sectionCardStyle}>
              <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "16px", margin: 0 }}>
                No nutrition logs recorded yet. Start by logging today's intake!
              </p>
            </div>
          ) : (
            historyLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  ...sectionCardStyle,
                  border: log.logDate === selectedDate ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px" }}>📅</span>
                    <h3 style={{ color: "#facc15", margin: 0, fontSize: "18px" }}>{log.logDate}</h3>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDate(log.logDate);
                      setViewMode("entry");
                    }}
                    style={{
                      background: "rgba(250, 204, 21, 0.15)",
                      border: "1px solid rgba(250, 204, 21, 0.3)",
                      color: "#facc15",
                      padding: "6px 14px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit This Entry
                  </button>
                </div>

                {/* Grid summary of the day */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", fontSize: "13.5px" }}>
                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>⏰ Wake-up:</strong>
                    {formatTimeDisplay(log.wakeUpTime)}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>⚡ Before Training:</strong>
                    {log.beforeTraining || "-"}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>🍳 Breakfast:</strong>
                    {log.breakfast || "-"}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>🍎 Snacks:</strong>
                    {log.snacks || "-"}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>🍲 Lunch:</strong>
                    {log.lunch || "-"}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>🏃 Pre-Training:</strong>
                    {log.preTraining || "-"}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>🥤 After Training:</strong>
                    {log.afterTraining || "-"}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>🍽️ Dinner:</strong>
                    {log.dinner || "-"}
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "10px 14px", borderRadius: "10px" }}>
                    <strong style={{ color: "#38bdf8", display: "block" }}>🌙 Sleeping Time:</strong>
                    {formatTimeDisplay(log.sleepTime)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Footer */}
      <p style={{ marginTop: "50px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
        Powered by Skipnot AD Studios 🚀 • Athlete Health & Performance Drive
      </p>
    </div>
  );
}

export default StudentNutrition;
