import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, Profile, SignIn, SignUp } from "@/pages";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import ScrollToTopButton from "@/widgets/layout/ScrollToTopButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import AppointmentForm from "@/components/AppointmentModal";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Token doğrulama fonksiyonu
  const validateToken = (token) => {
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1])); // JWT Token'ı çözümle
      return exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token && validateToken(token)) {
      setIsAuthenticated(true);
      

    } else {
      setIsAuthenticated(false);
    }
  }, []);


  const handleLogin = () => {
    setIsAuthenticated(true); // Kullanıcıyı giriş yapmış olarak işaretle
    navigate("/home"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/sign-in"); // Çıkış yaptıktan sonra login sayfasına yönlendir
  };

  const shouldShowNavbar = () =>
    !(pathname === "/sign-in" || pathname === "/sign-up");

  return (
    <>
      {/* Navbar */}
      {shouldShowNavbar() && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar
            brandName="PetVet"
            routes={routes}
            isAuthenticated={isAuthenticated}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        </div>
      )}

      {/* Sayfa Yönlendirmeleri */}
      <Routes>
        {routes.map(({ path, element, requiresAuth }) => (
          <Route
            key={path}
            path={path}
            element={
              requiresAuth && !isAuthenticated ? (
                <Navigate to="/sign-in" /> //kullanıcı doğrulanmamışsa giriş ekranına yönlendir
              ) : (
                element
              )
            }
          />
        ))}

        {/* Sabit rotalar */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/components/AppointmentForm" element={<AppointmentForm />} />

      </Routes>

      {/* Yukarıya Çık Butonu */}
      <ScrollToTopButton />

      {/* ToastContainer bildirimlerin görüneceği alan */}
      <ToastContainer
        position="top-center"
        autoClose={2000}/>
    </>
  );
}

export default App;
