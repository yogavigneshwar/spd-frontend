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
        `http://https://spd-backend-production.up.railway.app/performance/student/${student.id}`
      )
      .then((res) => setPerformance(res.data))
      .catch((err) => console.error(err));
  }, [student]);

  const chartData = performance.map(
    (item, index) => ({
      record: `Entry ${index + 1}`,
      speed: item.speed,
      stamina: item.stamina,
      strength: item.strength,
    })
  );

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }}>
      <h1 style={pageTitle}>
        Performance Analytics 📈
      </h1>

      <p style={pageSubtitle}>
        Track your athletic growth & performance
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
              <th style={thStyle}>Height</th>
              <th style={thStyle}>Weight</th>
              <th style={thStyle}>Speed</th>
              <th style={thStyle}>Stamina</th>
              <th style={thStyle}>Strength</th>
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
                <td style={tdStyle}>{item.height}</td>

                <td style={tdStyle}>{item.weight}</td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#38bdf8",
                    fontWeight: "700",
                  }}
                >
                  {item.speed}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#4ade80",
                    fontWeight: "700",
                  }}
                >
                  {item.stamina}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#facc15",
                    fontWeight: "700",
                  }}
                >
                  {item.strength}
                </td>
              </tr>
            ))}
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
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="record" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="speed"
              stroke="#38bdf8"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="stamina"
              stroke="#4ade80"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="strength"
              stroke="#facc15"
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