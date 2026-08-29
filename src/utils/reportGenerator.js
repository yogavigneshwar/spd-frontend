import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generates and downloads a clean, professional PDF report for a student.
 * @param {Object} params
 * @param {Object} params.student - The student object
 * @param {Array} params.attendance - Array of attendance records
 * @param {Array} params.performance - Array of performance metrics
 * @param {Array} params.results - Array of competition results
 */
export function generateMonthlyReportPDF({ student, attendance = [], performance = [], results = [] }) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper to format ISO time
  const formatTime = (scannedAtStr) => {
    if (!scannedAtStr) return "N/A";
    try {
      const parts = scannedAtStr.split("T");
      if (parts.length < 2) return "N/A";
      const timeParts = parts[1].split(":");
      const hours = parseInt(timeParts[0]);
      const minutes = timeParts[1];
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${String(displayHours).padStart(2, "0")}:${minutes} ${ampm}`;
    } catch {
      return "N/A";
    }
  };

  // Current Date Formatted
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 1. TOP BANNER & HEADER
  // Gold accent top border
  doc.setFillColor(250, 204, 21); // #facc15
  doc.rect(0, 0, pageWidth, 4, "F");

  // Navy banner
  doc.setFillColor(15, 23, 42); // #0f172a
  doc.rect(0, 4, pageWidth, 28, "F");

  // Academy Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(250, 204, 21);
  doc.text("STUDENT PERFORMANCE DRIVE (SPD)", 14, 16);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(219, 234, 254); // light blue
  doc.text("OFFICIAL ATHLETE MONTHLY TRACKING & PERFORMANCE REPORT", 14, 23);

  // Report Date (Right aligned)
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // muted slate
  doc.text(`Generated: ${reportDate}`, pageWidth - 14, 23, { align: "right" });

  let currentY = 40;

  // 2. ATHLETE PROFILE SUMMARY BOX
  doc.setFillColor(248, 250, 252); // #f8fafc
  doc.setDrawColor(226, 232, 240); // #e2e8f0
  doc.roundedRect(14, currentY, pageWidth - 28, 32, 3, 3, "FD");

  // Profile Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("ATHLETE PROFILE", 20, currentY + 7);

  // Profile Details - 3 Columns
  doc.setFontSize(9);
  const col1X = 20;
  const col2X = 80;
  const col3X = 140;

  // Row 1
  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("Student Name:", col1X, currentY + 15);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(`${student?.studentName || "N/A"}`, col1X + 24, currentY + 15);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("Student ID:", col2X, currentY + 15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(202, 138, 4); // gold-dark
  doc.text(`${student?.studentCode || "N/A"}`, col2X + 19, currentY + 15);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("Sport:", col3X, currentY + 15);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(`${student?.sport || "Athletics"}`, col3X + 12, currentY + 15);

  // Row 2
  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("Age:", col1X, currentY + 23);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(`${student?.age ? `${student.age} yrs` : "N/A"}`, col1X + 10, currentY + 23);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("Parent Contact:", col2X, currentY + 23);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(`${student?.parentMobile || "N/A"}`, col2X + 26, currentY + 23);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("Total Sessions:", col3X, currentY + 23);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(22, 163, 74); // green
  doc.text(`${attendance.length} Attended`, col3X + 26, currentY + 23);

  currentY += 40;

  // 3. SECTION 1: PERFORMANCE METRICS
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("1. Athletic Performance History", 14, currentY);

  const performanceRows = performance.length > 0
    ? performance.map((p) => [
        p.recordedDate || "N/A",
        p.speed || "-",
        p.height || "-",
        p.stamina || "-",
        p.strength || "-",
        p.flexibility || "-",
      ])
    : [["No performance evaluation records recorded yet.", "", "", "", "", ""]];

  autoTable(doc, {
    startY: currentY + 3,
    head: [["Evaluation Date", "Speed", "Explosive (Jump)", "Endurance", "Strength", "Flexibility"]],
    body: performanceRows,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [250, 204, 21],
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 41, 59],
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  currentY = doc.lastAutoTable.finalY + 12;

  // Check if we need to add a page or keep drawing
  if (currentY > pageHeight - 65) {
    doc.addPage();
    currentY = 20;
  }

  // 4. SECTION 2: COMPETITION RESULTS & ACHIEVEMENTS
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("2. Competition Results & Medals", 14, currentY);

  const resultsRows = results.length > 0
    ? results.map((r) => [
        r.eventName || "N/A",
        r.position || "-",
        r.eventDate || "-",
        r.remarks || "-",
      ])
    : [["No competition results recorded yet.", "", "", ""]];

  autoTable(doc, {
    startY: currentY + 3,
    head: [["Competition / Event", "Position / Medal", "Date", "Remarks"]],
    body: resultsRows,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [250, 204, 21],
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 41, 59],
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  currentY = doc.lastAutoTable.finalY + 12;

  if (currentY > pageHeight - 65) {
    doc.addPage();
    currentY = 20;
  }

  // 5. SECTION 3: RECENT ATTENDANCE LOG
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("3. Attendance Log (Summary)", 14, currentY);

  // Take the most recent 15 attendance entries so report stays concise
  const recentAttendance = [...attendance]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 15);

  const attendanceRows = recentAttendance.length > 0
    ? recentAttendance.map((a) => [
        a.date || "N/A",
        formatTime(a.scannedAt),
        a.status || "PRESENT",
        a.remarks || "QR Scan",
      ])
    : [["No attendance records logged yet.", "", "", ""]];

  autoTable(doc, {
    startY: currentY + 3,
    head: [["Date", "Scan Time", "Status", "Remarks"]],
    body: attendanceRows,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [250, 204, 21],
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 41, 59],
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  currentY = doc.lastAutoTable.finalY + 14;

  if (currentY > pageHeight - 35) {
    doc.addPage();
    currentY = 20;
  }

  // 6. COACH SIGN-OFF & FOOTER
  doc.setDrawColor(203, 213, 225);
  doc.line(14, currentY + 10, 70, currentY + 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Head Coach Signature & Seal", 14, currentY + 15);

  doc.line(pageWidth - 70, currentY + 10, pageWidth - 14, currentY + 10);
  doc.text("Parent Signature", pageWidth - 70, currentY + 15);

  // Global Page Numbers & Footer on all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);

    // Footer divider line
    doc.setDrawColor(226, 232, 240);
    doc.line(14, pageHeight - 10, pageWidth - 14, pageHeight - 10);

    doc.text(
      "SPD Sports Academy • Official Student Tracking • Powered by Skipnot AD Studios",
      14,
      pageHeight - 6
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, pageHeight - 6, {
      align: "right",
    });
  }

  // Sanitize filename
  const cleanCode = (student?.studentCode || student?.studentName || "Athlete").replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileName = `SPD_Monthly_Report_${cleanCode}.pdf`;

  // Download PDF
  doc.save(fileName);
}
