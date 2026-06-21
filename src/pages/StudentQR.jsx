import { QRCodeCanvas } from "qrcode.react";

function StudentQR() {
  const student = JSON.parse(localStorage.getItem("student"));

  console.log("QR STUDENT =", student);

  if (!student) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "20px"
      }}>
        No student logged in 😭
      </div>
    );
  }

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "450px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    textAlign: "center"
  };

  const detailsContainerStyle = {
    background: "rgba(0,0,0,0.3)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
    textAlign: "left",
    border: "1px solid rgba(255,255,255,0.1)"
  };

  const labelStyle = {
    color: "#a1a1aa",
    fontSize: "13px",
    margin: "0 0 4px 0",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  const valueStyle = {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 16px 0"
  };

  const codeStyle = {
    color: "#facc15",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "monospace",
    margin: "0 0 16px 0"
  };

  const passStyle = {
    color: "white",
    fontSize: "18px",
    fontFamily: "monospace",
    margin: "0"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: "32px", color: "#facc15", marginBottom: "24px", fontWeight: "bold", marginTop: 0 }}>
          My Attendance QR 📷
        </h1>

        <div style={detailsContainerStyle}>
          <p style={labelStyle}>Name</p>
          <p style={valueStyle}>{student.studentName}</p>

          <p style={labelStyle}>Student ID / Code</p>
          <p style={codeStyle}>{student.studentCode || "NOT ASSIGNED"}</p>

          <p style={labelStyle}>Password</p>
          <p style={passStyle}>{student.password || "N/A"}</p>
        </div>

        <div style={{
          background: "white",
          padding: "16px",
          borderRadius: "16px",
          display: "inline-block",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          marginBottom: "20px"
        }}>
          <QRCodeCanvas
            value={student.studentCode || "NO-CODE"}
            size={220}
          />
        </div>
        
        <p style={{ color: "#dbeafe", fontSize: "14px", margin: "10px 0 0 0" }}>
          Show this QR code to your coach to mark attendance
        </p>
      </div>
    </div>
  );
}

export default StudentQR;