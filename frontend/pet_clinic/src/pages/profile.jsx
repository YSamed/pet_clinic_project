import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { AnimalSection } from "@/components/AnimalSection";
import { Modal } from "@/components/Modal";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

// Ana Profil Bileşeni
export function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone_number: "",
    profile_picture: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const animalSectionRef = useRef(null);


  const fetchProfileData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Token bulunamadı, lütfen giriş yapın.");
      setLoading(false);
      return;
    }
  
    try {
      // Profil verilerini al
      const userResponse = await axios.get("http://127.0.0.1:8000/users/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!userResponse.data || userResponse.data.length === 0) {
        setLoading(false);
        return;
      }
  
      const user = userResponse.data[0];
  
      setProfileData(user);
      setFormData({
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        profile_picture: user.profile_picture,
      });
  
      // Hayvan verilerini al
      const animalResponse = await axios.get("http://127.0.0.1:8000/clinic/animals/", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const userId = user.id;
      if (!animalResponse.data || animalResponse.data.length === 0) {
        
      } else {
        setAnimals(animalResponse.data.filter((animal) => animal.owner === userId));
      }
  
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || "Profil verisi veya hayvanlar alınırken bir hata oluştu.");
      } else {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_picture: file });
  };
  
  const scrollToAnimalSection = () => {
    animalSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div className="text-center py-4">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <ToastContainer /> 
    
      {/* Hero Bölümü */}
      <div className="relative flex h-[50vh] items-center justify-center pt-16 pb-16">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
        <div className="max-w-7xl container mx-auto relative">
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-bold text-4xl sm:text-5xl lg:text-6xl"
              >
                Profil
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Profil Bölümü */}
      <section className="px-6 pt-24 pb-48 bg-gradient-to-r from-green-100 via-blue-50 to-green-100">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
            <div className="rounded-xl items-center lg:items-start text-center lg:text-left space-y-6">
              <img
                className="w-72 h-72 rounded-xl border-2 border-gray-100 shadow-xl object-cover"
                src={profileData?.profile_picture || "img/user.jpg"}
                alt="Profile"
              />
            </div>
            <div className="mt-6 lg:mt-0 w-full lg:w-2/4">
              <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Kullanıcı Bilgileri</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-user text-green-500 text-2xl"></i>
                    <div>
                      <p className="text-sm text-gray-500">İsim Soyisim</p>
                      <p className="text-lg font-semibold text-gray-800">{formData.firstName} {formData.lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-phone-alt text-blue-500 text-2xl"></i>
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <p className="text-lg font-semibold text-gray-800">{formData.phone_number}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-id-badge text-blue-100 text-2xl"></i>
                    <div>
                      <p className="text-sm text-gray-500">Kullanıcı Adı</p>
                      <p className="text-lg font-semibold text-gray-800">{formData.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-envelope text-green-200 text-2xl"></i>
                    <div>
                      <p className="text-sm text-gray-500">E-posta</p>
                      <p className="text-lg font-semibold text-gray-800">{formData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Butonlar kısmı */}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={scrollToAnimalSection}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                  >
                    Hayvanlarım
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                  >
                    Bilgileri Düzenle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={profileData?.id}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
      />
      {/* Hayvanalr Bölümü */}
      <section ref={animalSectionRef} className="py-24 bg-gray-50">
        <AnimalSection animals={animals} />
      </section>

      <Footer />
    </>
  );
}
