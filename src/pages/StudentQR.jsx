import { QRCodeCanvas } from "qrcode.react";

function StudentQR() {
  const student = JSON.parse(localStorage.getItem("student"));

  console.log("QR STUDENT =", student);

  if (!student) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No student logged in 😭
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-2xl text-center shadow-xl max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">
          My Attendance QR 📷
        </h1>

        <div className="bg-zinc-800 p-6 rounded-xl mb-6 text-left border border-zinc-700">
          <p className="text-lg text-zinc-400 mb-1">Name</p>
          <p className="text-2xl font-bold text-white mb-4">
            {student.studentName}
          </p>

          <p className="text-lg text-zinc-400 mb-1">Student ID / Code</p>
          <p className="text-xl font-mono text-yellow-400 mb-4">
            {student.studentCode || "NOT ASSIGNED"}
          </p>

          <p className="text-lg text-zinc-400 mb-1">Password</p>
          <p className="text-xl font-mono text-white">
            {student.password || "N/A"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl inline-block shadow-lg mb-4">
          <QRCodeCanvas
            value={student.studentCode || "NO-CODE"}
            size={250}
          />
        </div>
        
        <p className="text-zinc-500 text-sm mt-2">
          Show this QR code to your coach to mark attendance
        </p>
      </div>
    </div>
  );
}

export default StudentQR;