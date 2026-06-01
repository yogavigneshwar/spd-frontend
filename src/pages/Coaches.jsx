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

function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://https://spd-backend-production.up.railway.app/coach/all")
      .then((res) => setCoaches(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.coachName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      coach.mobile?.includes(search)
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={pageContainer}>
        <h1 style={pageTitle}>Coaches 🏃</h1>

        <p style={pageSubtitle}>
          Manage academy coaches & trainers
        </p>

        <input
          type="text"
          placeholder="Search by name / mobile 🔍"
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
                <th style={thStyle}>Coach Name</th>
                <th style={thStyle}>Mobile</th>
                <th style={thStyle}>Specialization</th>
              </tr>
            </thead>

            <tbody>
              {filteredCoaches.map((coach) => (
                <tr
                  key={coach.id}
                  style={{
                    borderTop:
                      "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <td style={tdStyle}>{coach.coachName}</td>

                  <td style={tdStyle}>{coach.mobile}</td>

                  <td
                    style={{
                      ...tdStyle,
                      color: "#facc15",
                      fontWeight: "700",
                    }}
                  >
                    {coach.specialization}
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

export default Coaches;