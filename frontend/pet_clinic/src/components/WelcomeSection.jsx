import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import AppointmentModal from "./AppointmentModal"; 
import { useNavigate } from "react-router-dom";

const WelcomeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal'ın açık/kapalı durumunu kontrol et
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token"); 

  // Modal'ı açmak için
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Modal'ı kapatmak için
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Giriş yapmamış kullanıcıyı giriş sayfasına yönlendir
  const handleSignInClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="relative flex h-screen content-center items-center justify-center pt-16 md:pt-32 pb-32">
      <div className="absolute top-0 h-full w-full bg-[url('/img/background-5.jpg')] bg-cover bg-center sm:bg-top" />
      <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      <div className="max-w-8xl container relative mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="ml-auto mr-auto w-full px-4 text-center sm:w-10/12 md:w-9/12 lg:w-8/12">
            <Typography
              variant="h1"
              color="white"
              className="mb-6 font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Onların Mutluluğu Bizim İçin En Önemlisi
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="opacity-70 text-sm sm:text-base md:text-lg"
            >
              Sevdiklerinize en iyi bakımı sunmak için buradayız. Hem acil durumlarda
              hem de rutin sağlık kontrollerinde, deneyimli ekibimizle yanınızdayız.
            </Typography>
            <div className="flex justify-center mt-8">
              {token ? (
                // Eğer giriş yapmışsa, "Randevu Al" butonu göster
                <Button
                  onClick={openModal}
                  variant="gradient"
                  size="sm"
                  className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Randevu Al
                </Button>
              ) : (
                // Eğer giriş yapmamışsa, "Giriş Yap" butonu göster
                <Button
                  onClick={handleSignInClick}
                  variant="gradient"
                  size="sm"
                  className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Randevu Almak İçin Giriş Yap
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Kısmı */}
      <AppointmentModal isOpen={isModalOpen} closeModal={closeModal} />
      
    </div>
  );
};

export default WelcomeSection;
