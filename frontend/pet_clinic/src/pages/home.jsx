import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Footer } from "@/widgets/layout";
import { teamData } from "@/data";
import WelcomeSection from "@/components/WelcomeSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import AboutSection from "@/components/AboutSection";

export function Home() {
  useEffect(() => {
    const hasLoggedIn = localStorage.getItem("hasLoggedIn");

    if (hasLoggedIn) {
   
      toast.success("Başarıyla giriş yaptınız!");

      localStorage.removeItem("hasLoggedIn");
    }
  }, []); 

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
