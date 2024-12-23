import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from "@material-tailwind/react";
import { PageTitle } from "@/widgets/layout";


export function AnimalSection() {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setError("Lütfen giriş yapın.");
      return;
    }

    axios
      .get('http://127.0.0.1:8000/clinic/animals/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Gelen Veriler:", response.data);
        setAnimals(response.data);
      })
      .catch((error) => {
        setError("Hayvanlar alınırken bir hata oluştu.");
        console.error("Error fetching animals:", error);
      });
  }, [token]);

  return (
    <section id="animals" className="px-4 pt-20 pb-48">
      <div className="container mx-auto">
        <PageTitle heading="Hayvanlarım" />

        {/* Hata mesajı */}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* Hayvanlar listesi */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8">
          {animals.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-10">
              <Typography variant="h6" className="text-gray-700">
                Henüz bir hayvanınız yok. Hayvan eklemek için kliniğe başvurabilirsiniz.
              </Typography>
            </div>
          ) : (
            animals.map((animal) => (
              <div
                key={animal.id}
                className="bg-white shadow-2xl border border-gray-200 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl w-full max-w-sm mx-auto"
              >
                <div className="rounded-t-xl overflow-hidden">
                  <img
                    src={animal.animal_picture}
                    alt={animal.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <Typography
                    variant="h6"
                    className="text-center text-xl font-bold text-blue-gray-900"
                  >
                    {animal.name}
                  </Typography>
                  <Typography variant="subtitle2" className="text-center text-gray-600 mt-2">
                    {animal.animal_type?.name || "Bilinmiyor"}
                  </Typography>
                  <Typography variant="subtitle2" className="text-center text-gray-600 mt-2">
                    Doğum Tarihi :{" "}
                    {animal.birth_date
                      ? new Date(animal.birth_date).toLocaleDateString()
                      : "Bilinmiyor"}
                  </Typography>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AnimalSection;
