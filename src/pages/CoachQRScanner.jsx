import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

import {
  pageTitle,
  pageSubtitle,
  glassCard,
  footerStyle,
} from "../styles/ui";

function CoachQRScanner() {
  const isProcessing = useRef(false);
  const [scanStatus, setScanStatus] = useState("");

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
        if (isProcessing.current) {
          return;
        }
        isProcessing.current = true;
        setScanStatus("Processing scan...");

        console.log("SCANNED =", decodedText);
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/attendance/add`,
            {
              studentCode: decodedText.trim()
            }
          );

          if (res.data && res.data.remarks === "STUDENT_NOT_FOUND") {
            setScanStatus("Error: Student not found!");
            alert("Invalid QR Code: Student not found.");
          } else if (res.data && res.data.remarks === "ALREADY_MARKED") {
            setScanStatus("Already marked for today.");
            alert("Attendance has already been marked for today.");
          } else {
            setScanStatus("Attendance marked successfully!");
            alert(`Success! Attendance marked for: ${decodedText}`);
          }
        } catch (error) {
          console.error(error);
          setScanStatus("Error marking attendance.");
          alert("Error marking attendance. Connection failed.");
        } finally {
          // Release lock after 3 seconds
          setTimeout(() => {
            isProcessing.current = false;
            setScanStatus("");
          }, 3000);
        }
      },
      (error) => {
        // ignore scan errors
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

        {scanStatus && (
          <div style={{
            marginTop: "20px",
            padding: "14px",
            borderRadius: "12px",
            background: scanStatus.includes("Error") ? "rgba(239, 68, 68, 0.15)" : "rgba(250, 204, 21, 0.1)",
            border: scanStatus.includes("Error") ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(250, 204, 21, 0.3)",
            color: scanStatus.includes("Error") ? "#fca5a5" : "#facc15",
            fontWeight: "700",
            fontSize: "16px",
            textAlign: "center"
          }}>
            {scanStatus}
          </div>
        )}
      </div>

      <p style={footerStyle}>
        Powered by Skipnot AD Studios 🚀
      </p>
    </div>
  );
}

export default CoachQRScanner;