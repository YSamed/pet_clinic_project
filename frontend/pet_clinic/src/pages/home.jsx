import React, { useEffect } from "react";
import { toast } from "react-toastify"; // Toast bildirimleri
import { Footer } from "@/widgets/layout";
import { teamData } from "@/data";
import WelcomeSection from "@/components/WelcomeSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import AboutSection from "@/components/AboutSection";

export function Home() {
  useEffect(() => {
    // Eğer giriş yapılmışsa ve "hasLoggedIn" işaretçisi varsa, bildirim göster
    const hasLoggedIn = localStorage.getItem("hasLoggedIn");

    if (hasLoggedIn) {
      // Bildirim göster
      toast.success("Başarıyla giriş yaptınız!");

      // Bildirim gösterildikten sonra flag'i kaldırıyoruz
      localStorage.removeItem("hasLoggedIn");
    }
  }, []); // Bu useEffect, Home sayfası render edildikten sonra çalışacak

  return (
    <>
      <WelcomeSection />
      <ServicesSection />
      <TeamSection id="team" teamData={teamData} />
      <AboutSection id="about" />
      <Footer />
    </>
  );
}

export default Home;
