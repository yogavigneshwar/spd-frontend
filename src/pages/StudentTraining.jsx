import { useEffect, useState } from "react";
import axios from "axios";

function StudentTraining() {
  const [training, setTraining] = useState([]);

  useEffect(() => {
    axios
      .get("https://spd-backend-production.up.railway.app/training/all")
      .then((response) => {
        setTraining(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Training Plans 🧠</h1>

      <div className="space-y-4">
        {training.map((item) => (
          <div key={item.id} className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Day {item.dayNumber} - {item.trainingTitle}
            </h2>
            <p className="mt-2 text-zinc-300">{item.description}</p>
            <p className="mt-2 text-yellow-400">{item.nutritionNote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentTraining;