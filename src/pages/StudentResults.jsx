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

function StudentResults() {
  const [results, setResults] = useState([]);

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  useEffect(() => {
    if (!student) return;

    axios
      .get(
        `https://https://spd-backend-production.up.railway.app/results/student/${student.id}`
      )
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  }, [student]);

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }}>
      <h1 style={pageTitle}>
        Competition Results 🏆
      </h1>

      <p style={pageSubtitle}>
        Track your medals & competition achievements
      </p>

      <div
        style={{
          ...glassCard,
          overflow: "hidden",
        }}
      >
        <table style={tableStyle}>
          <thead style={tableHead}>
            <tr>
              <th style={thStyle}>Competition</th>
              <th style={thStyle}>Medal</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {results.map((result) => (
              <tr
                key={result.id}
                style={{
                  borderTop:
                    "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <td style={tdStyle}>
                  {result.competitionName}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color: "#facc15",
                    fontWeight: "700",
                  }}
                >
                  {result.medal}
                </td>

                <td style={tdStyle}>
                  {result.date}
                </td>

                <td style={tdStyle}>
                  {result.remarks}
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
  );
}

export default StudentResults;