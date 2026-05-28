import { QRCodeCanvas } from "qrcode.react";

function StudentQR() {
  const student = JSON.parse(localStorage.getItem("student"));

  if (!student) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No student logged in 😭
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-2xl text-center shadow-xl">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          My Attendance QR 📷
        </h1>

        <p className="text-2xl mb-2">{student.studentName}</p>
        <p className="text-zinc-400 mb-6">{student.studentCode}</p>

        <div className="bg-white p-4 rounded-xl inline-block">
          <QRCodeCanvas
            value={student.studentCode}
            size={250}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentQR;