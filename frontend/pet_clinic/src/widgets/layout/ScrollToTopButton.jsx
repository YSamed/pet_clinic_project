import React, { useState, useEffect } from "react";
import { AiOutlineUp } from "react-icons/ai";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Sayfanın ne kadar kaydırıldığını kontrol et
  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false); 
    }
  };

  // Sayfa kaydırıldıkça scroll pozisyonunu kontrol et
  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // Sayfayı en üste kaydır
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animasyonu
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-4 bg-gradient-to-tl from-green-400 to-blue-500 text-white rounded-full shadow-2xl transform transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      } hover:scale-110 hover:shadow-xl`}
      style={{
        display: isVisible ? "block" : "none",
      }}
    >
      <AiOutlineUp className="w-6 h-6" />
    </button>
  );
}

export default ScrollToTopButton;
