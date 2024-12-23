import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify"; // React Toastify'i ekleyin
import 'react-toastify/dist/ReactToastify.css'; // CSS'i eklemeyi unutmayın

const AppointmentModal = ({ isOpen, closeModal }) => {
  const [animals, setAnimals] = useState([]);
  const [times, setTimes] = useState([]);
  const [formData, setFormData] = useState({
    animal: "",
    date: "",
    time: "",
    status: "pending",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Token'ı localStorage'dan al
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setError("Erişim token'ı bulunamadı. Lütfen giriş yapın.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Hayvanları al
        const animalsResponse = await axios.get("http://127.0.0.1:8000/clinic/animals/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnimals(animalsResponse.data);

        // Saatleri al
        const timesResponse = await axios.get("http://127.0.0.1:8000/appointments/appointment-times/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTimes(timesResponse.data);
      } catch (error) {
        console.error("Veriler alınırken bir hata oluştu:", error);
        setError("Veriler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Form verisini güncelle
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Formu gönder
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      animal: formData.animal,
      date: formData.date,
      time: formData.time,
      status: formData.status,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/appointments/appointments/",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      // Randevu başarıyla oluşturulursa bildirim göster
      toast.success("Randevunuz başarıyla oluşturuldu!", {
        position: "top-center",
        autoClose: 2000,
      }); 

      closeModal(); // Randevu başarılı ise, modal'ı kapat
    } catch (error) {
      toast.error("Seçmiş Olduğunuz Randevu Dolu", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // Bugünün tarihini almak için
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD formatına çevir
  
  if (!isOpen) return null; // Modal kapalıysa hiçbir şey gösterme

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Çarpı butonu */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Randevu Al</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="animal" className="block text-sm font-medium text-gray-700">Hayvan</label>
            <select
              name="animal"
              id="animal"
              value={formData.animal}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Bir hayvan seçin</option>
              {Array.isArray(animals) &&
                animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tarih</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              min={today} 
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Saat</label>
            <select
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Bir saat seçin</option>
              {Array.isArray(times) &&
                times.map((time) => (
                  <option key={time.id} value={time.id}>
                    {time.time}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {loading ? "Yükleniyor..." : "Randevu Al"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
