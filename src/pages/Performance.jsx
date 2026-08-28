import { useEffect, useState } from "react";
import axios from "axios";

import {
  pageTitle,
  pageSubtitle,
  glassCard,
  tableStyle,
  tableHead,
  thStyle,
  tdStyle,
  footerStyle,
} from "../styles/ui";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Performance() {
  const [performance, setPerformance] = useState([]);

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  useEffect(() => {
    if (!student) return;

    axios
      .get(
        `https://spd-backend-production.up.railway.app/performance/student/${student.id}`
      )
      .then((res) => setPerformance(res.data))
      .catch((err) => console.error(err));
  }, [student]);

  // Helper to extract a numeric float out of a text string (e.g. "5.2s" -> 5.2, "Excellent" -> 0)
  const parseNumericValue = (val) => {
    if (val === null || val === undefined) return 0;
    const cleanStr = String(val).replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) ? 0 : parsed;
  };

  const chartData = performance.map(
    (item, index) => ({
      record: item.recordedDate ? item.recordedDate : `Entry ${index + 1}`,
      speed: parseNumericValue(item.speed),
      explosiveJump: parseNumericValue(item.height),
      endurance: parseNumericValue(item.stamina),
      strength: parseNumericValue(item.strength),
      flexibility: parseNumericValue(item.flexibility),
    })
  );

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }}>
      <h1 style={pageTitle}>
        Performance Analytics 📈
      </h1>

      <p style={pageSubtitle}>
        Track your athletic growth & performance metrics over time
      </p>

      <div
        style={{
          ...glassCard,
          overflow: "hidden",
          marginBottom: "40px",
        }}
      >
        <table style={tableStyle}>
          <thead style={tableHead}>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Speed</th>
              <th style={thStyle}>Explosive (Jump)</th>
              <th style={thStyle}>Endurance</th>
              <th style={thStyle}>Strength</th>
              <th style={thStyle}>Flexibility</th>
            </tr>
          </thead>

          <tbody>
            {performance.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderTop:
                    "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <td style={tdStyle}>{item.recordedDate || "N/A"}</td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#38bdf8",
                    fontWeight: "700",
                  }}
                >
                  {item.speed != null ? item.speed : "-"}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#f472b6",
                    fontWeight: "700",
                  }}
                >
                  {item.height != null ? item.height : "-"}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#4ade80",
                    fontWeight: "700",
                  }}
                >
                  {item.stamina != null ? item.stamina : "-"}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#facc15",
                    fontWeight: "700",
                  }}
                >
                  {item.strength != null ? item.strength : "-"}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#a78bfa",
                    fontWeight: "700",
                  }}
                >
                  {item.flexibility != null ? item.flexibility : "-"}
                </td>
              </tr>
            ))}
            {performance.length === 0 && (
              <tr>
                <td colSpan="6" style={{ ...tdStyle, textAlign: "center", color: "#64748b" }}>
                  No performance records found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          ...glassCard,
          padding: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            color: "#facc15",
          }}
        >
          Progress Analytics 📊
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

            <XAxis dataKey="record" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "white" }} />

            <Legend />

            <Line
              type="monotone"
              dataKey="speed"
              name="Speed"
              stroke="#38bdf8"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="explosiveJump"
              name="Explosive (Jump)"
              stroke="#f472b6"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="endurance"
              name="Endurance"
              stroke="#4ade80"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="strength"
              name="Strength"
              stroke="#facc15"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="flexibility"
              name="Flexibility"
              stroke="#a78bfa"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p style={footerStyle}>
        Powered by Skipnot AD Studios 🚀
      </p>
    </div>
  );
}

export default Performance;