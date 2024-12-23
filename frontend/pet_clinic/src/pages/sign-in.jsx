import { useState, useEffect } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast } from "react-toastify"; // Toast bildirimleri

export function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Çıkış yapıldıysa, toast ile mesaj göster
    if (localStorage.getItem("hasLoggedOut")) {
      toast.info("Çıkış yapıldı.", {
        position: "top-center",
        autoClose: 2000,
      });
      
      // Çıkış yapıldığını gösteren işaretçiyi temizle
      localStorage.removeItem("hasLoggedOut");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/token/", formData);
      console.log("Login başarılı", response.data);

      // Yalnızca access token'ı sakla
      localStorage.setItem("access_token", response.data.access);
    
      // Giriş yapıldığını işaret etmek için localStorage'a bir işaretçi ekle
      localStorage.setItem("hasLoggedIn", "true");

      // Home sayfasına yönlendir
      navigate("/home"); // Başarıyla giriş yapıldıktan sonra yönlendir

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      if (err.response?.status === 400) {
        setError("Kullanıcı adı veya şifre hatalı!");
      } else {
        setError("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-32">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Giriş Yap</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Giriş yapmak için bilgilerinizi giriniz.</Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            {error && <p className="text-red-500">{error}</p>} 
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Kullanıcı Adı</Typography>
            <Input
              size="lg"
              placeholder="Kullanıcı Adı"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            
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
          </div>

          <Button
            type="submit"
            className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            fullWidth
            disabled={loading}  
          >
            {loading ? "Yükleniyor..." : "Giriş Yap"}  
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Hesabın Yok Mu? <Link to="/sign-up" className="text-gray-900 ml-1">Kayıt Ol</Link>
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

export default SignIn;
