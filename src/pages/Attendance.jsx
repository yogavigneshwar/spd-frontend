import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (!student) return;

    axios
      .get(`https://https://spd-backend-production.up.railway.app/attendance/student/${student.id}`)
      .then((res) => setAttendance(res.data))
      .catch((err) => console.error(err));
  }, [student]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        My Attendance 🗓️
      </h1>

      <div className="bg-zinc-900 rounded-2xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item) => (
              <tr key={item.id} className="border-b border-zinc-800">
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.status}</td>
                <td className="p-4">{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;