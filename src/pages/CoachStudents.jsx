import { useEffect, useState } from "react";
import axios from "axios";

function CoachStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("https://https://spd-backend-production.up.railway.app/student/all")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Coach Students 👨‍🎓</h1>

      <div className="bg-zinc-900 rounded-2xl p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-zinc-700">
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Category</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-zinc-800">
                <td className="p-3">{student.studentName}</td>
                <td className="p-3">{student.age}</td>
                <td className="p-3">{student.trainingCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoachStudents;