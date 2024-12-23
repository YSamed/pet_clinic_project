import React from "react";
import { Typography } from "@material-tailwind/react";
import { PageTitle } from "@/widgets/layout";

const AboutSection = () =>  {
  return (
    <section id="about" className="bg-white px-4 pt-20 pb-48 bg-gradient-to-r from-green-100 via-blue-50 to-green-100">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <PageTitle heading="Hakkımızda" />
          <Typography className="text-lg text-blue-gray-500 mb-6">
          PetVet , 2004 yılında, veteriner hekim Dr. Samed Erol tarafından kurulmuştur. Hayvan sağlığına olan derin tutkusu ve yıllarca edindiği deneyimle, evcil hayvanların sağlık ihtiyaçlarını en iyi şekilde karşılamak amacıyla kliniğimizi kurmuştur. O günden bu yana, [Veteriner Kliniği Adı] olarak, sevimli dostlarınıza en kaliteli bakımı sunmayı kendimize görev edindik.       Amacımız, hayvanların sağlıklı ve mutlu bir yaşam sürmelerini sağlamak, aynı zamanda sahiplerine güvenli ve kaliteli hizmet sunmaktır. Her hayvan bir aile üyesidir ve biz, onların sağlığına gereken özeni göstermek için burada olmayı sürdürüyoruz.
          </Typography>
        </div>
        
        <div className="flex gap-8 justify-center">
          <div className="w-1/3">
            <img src="/img/about1.jpg" alt="Veterinerlik Hizmeti 1" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div className="w-1/3">
            <img src="/img/about2.jpg" alt="Veterinerlik Hizmeti 2" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div className="w-1/3">
            <img src="/img/about3.jpg" alt="Veterinerlik Hizmeti 3" className="w-full h-64 object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
