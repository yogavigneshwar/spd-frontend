import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

import {
  pageTitle,
  pageSubtitle,
  glassCard,
  footerStyle,
} from "../styles/ui";

function CoachQRScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
        await axios.post(
        `${import.meta.env.VITE_API_URL}/qrscanner/add`,
        coach
        )

          alert(
            "Attendance Marked Successfully 😈🔥"
          );
        } catch (error) {
          console.error(error);

          alert("Error marking attendance");
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      scanner.clear().catch((err) =>
        console.error(err)
      );
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }}>
      <h1 style={pageTitle}>
        QR Attendance Scanner 📷
      </h1>

      <p style={pageSubtitle}>
        Scan athlete QR codes for attendance
      </p>

      <div
        style={{
          ...glassCard,
          padding: "30px",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        <div
          id="reader"
          style={{
            width: "100%",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        ></div>
      </div>

      <p style={footerStyle}>
        Powered by Skipnot AD Studios 🚀
      </p>
    </div>
  );
}

export default CoachQRScanner;