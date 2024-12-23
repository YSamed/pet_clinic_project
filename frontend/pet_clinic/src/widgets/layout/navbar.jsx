import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {Navbar as MTNavbar,MobileNav,Typography,Button,IconButton,} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  // Kullanıcı giriş yapmış mı kontrolü
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  React.useEffect(() => {

  }, );

  // Sayfaavigate] içi kaydırma fonksiyonu
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section && section.scrollIntoView({ behavior: "smooth" });
  };

  // Çıkış yap işlevi
  const handleLogout = () => {
    const token = localStorage.getItem("access_token");
  
    // Çıkış işlemi sonrasında token'ı siliyoruz
    axios
      .post("http://127.0.0.1:8000/auth/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .finally(() => {
        // Token'ı sil
        localStorage.removeItem("access_token");
        
        // Çıkış yapıldıktan sonra sadece sign-in sayfasına yönlendir
        navigate("/sign-in", { replace: true });
      });
  };
  
  // Giriş yap işlevi
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/token/", {
        username: "example",
        password: "password",
      });
  
      localStorage.setItem("access_token", response.data.access_token);
      
    } catch (error) {
      console.error("Giriş hatası:", error);
    }
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              onClick={() => scrollToSection(href.substring(1))}
              className="flex items-center gap-1 p-1 font-bold cursor-pointer"
            >
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            {brandName}
          </Typography>
        </Link>

        {/* Home sayfasında ise sadece gösterilecek öğeleri kontrol et */}
        {(location.pathname === "/" || location.pathname === "/home") && (
          <div className="hidden lg:block">
            {navList}
          </div>
        )}

        <div className="hidden gap-2 lg:flex">
          {/* Eğer kullanıcı giriş yapmışsa Profil ve Çıkış Yap butonları, yapmamışsa Giriş Yap butonu gösterilecek */}
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <Button variant="text" size="sm" color="white" fullWidth>
                  Profil
                </Button>
              </Link>
              <Button
                variant="text"
                size="sm"
                color="white"
                fullWidth
                onClick={handleLogout}
              >
                Çıkış Yap
              </Button>
            </>
          ) : (
            <Link to="/sign-in">
              <Button variant="text" size="sm" color="white" fullWidth>
                Giriş Yap
              </Button>
            </Link>
          )}
        </div>

        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
          {location.pathname === "/home" && navList} {/* Yalnızca Home sayfasında navList göster */}
          
          {/* Çıkış Yap butonuna tıklandığında handleLogout işlevi çalışacak */}
          {isLoggedIn ? (
            <Button
              variant="text"
              size="sm"
              fullWidth
              onClick={handleLogout}  // Çıkış işlemi için handleLogout çağrılıyor
            >
              Çıkış Yap
            </Button>
          ) : (
            <Button
              variant="text"
              size="sm"
              fullWidth
              onClick={handleLogin}  // Giriş Yap butonuna tıklanınca handleLogin çağrılıyor
            >
              Giriş Yap
            </Button>
          )}
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {

  action: (
    <a
      href=""
      target="_blank"
    >
      <Button variant="gradient" size="sm" fullWidth>
        Çıkış Yap
      </Button>
    </a>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
