import { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

export function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Boş alanları kontrol et
    if (!formData.first_name) {
      errors.first_name = "Ad boş olamaz.";
      isValid = false;
    }
    if (!formData.last_name) {
      errors.last_name = "Soyad boş olamaz.";
      isValid = false;
    }
    if (!formData.username) {
      errors.username = "Kullanıcı adı boş olamaz.";
      isValid = false;
    }
    if (!formData.email) {
      errors.email = "E-posta boş olamaz.";
      isValid = false;
    }
    if (!formData.password) {
      errors.password = "Şifre boş olamaz.";
      isValid = false;
    }

    // Şifreyi kontrol et
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password = "Şifre en az 8 karakter olmalı ve hem harf hem de rakam içermelidir.";
      isValid = false;
    }

    // Telefon numarasını kontrol et
    if (formData.phone_number.length !== 11) {
      errors.phone_number = "Telefon numarası 11 haneli olmalıdır.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    // Form doğrulama
    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/users/", formData);
      console.log("Kayıt başarılı", response.data);
  
      // Kayıt başarılı olduğunda toast mesajı
      toast.success("Kayıt başarılı, giriş yapabilirsiniz!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
  
      // Kayıt olduktan sonra giriş ekranına yönlendir
      navigate("/sign-in");
  
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
  
      // API'den gelen hata mesajlarına göre bildirim
      const apiError = err.response?.data;
  
      // Eğer apiError varsa, her bir alan için hata mesajlarını formErrors'a ekleyelim
      if (apiError) {
        const newFormErrors = {};
  
        // API'den gelen her hatayı formErrors'a ekle
        Object.keys(apiError).forEach((key) => {
          if (key === 'phone_number' && apiError[key].includes("user with this phone number already exists.")) {
            newFormErrors[key] = "Bu telefon numarası zaten kayıtlı."; // Türkçe telefon hatası
          } else if (key === 'username' && apiError[key].includes("A user with that username already exists.")) {
            newFormErrors[key] = "Bu kullanıcı adı zaten alınmış."; // Türkçeleştirilmiş kullanıcı adı hatası
          } else {
            newFormErrors[key] = apiError[key].join(" "); // Diğer hataları birleştir
          }
        });
  
        setFormErrors(newFormErrors);  // Yeni hataları formErrors state'ine ekle
        setError("Lütfen hataları düzeltin."); // Genel hata mesajı
      } else {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-18">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Kayıt Ol</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Kayıt olmak için bilgilerinizi giriniz.</Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            
            {error && <p className="text-red-500">{error}</p>}

            {/* Ad */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Ad</Typography>
            <Input
              size="lg"
              placeholder="Adınız"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            {formErrors.first_name && <p className="text-red-500 text-sm">{formErrors.first_name}</p>}

            {/* Soyad */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Soyad</Typography>
            <Input
              size="lg"
              placeholder="Soyadınız"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            {formErrors.last_name && <p className="text-red-500 text-sm">{formErrors.last_name}</p>}

            {/* Kullanıcı Adı */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Kullanıcı Adı</Typography>
            <Input
              size="lg"
              placeholder="Kullanıcı Adı"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}

            {/* E-Posta */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">E-Posta</Typography>
            <Input
              size="lg"
              placeholder="isim@mail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

            {/* Telefon Numarası */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Telefon Numarası</Typography>
            <Input
              size="lg"
              placeholder="05********"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            {formErrors.phone_number && <p className="text-red-500 text-sm">{formErrors.phone_number}</p>}

            {/* Şifre */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Şifre</Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>

          <Button
            type="submit"
            className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            fullWidth
            disabled={loading} 
          >
            {loading ? "Yükleniyor..." : "Kayıt Ol"}
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Bir Hesabın Mı Var? <Link to="/sign-in" className="text-gray-900 ml-1"> Giriş Yap </Link>
          </Typography>
        </form>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/sigin.jpeg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignUp;
