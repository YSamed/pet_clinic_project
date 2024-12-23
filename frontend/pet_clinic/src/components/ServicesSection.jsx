import React from "react";
import { PageTitle } from "@/widgets/layout";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

const ServicesSection = () => {
  
return (
    
<section
  id="services"
  className="bg-white px-4 pt-10 pb-20 bg-gradient-to-r from-green-100 via-blue-50 to-green-100" >
  <div className="container mx-auto">
    <PageTitle heading="Hizmetlerimiz" />

    <div className="mt-10 flex flex-wrap items-center">
      {/* Mobilde sadece kartı göster */}
      <div className="mx-auto w-full px-4 md:w-5/12 hidden md:block">
        <Typography
          variant="h3"
          className="mb-3 font-bold text-blue-gray-900 text-xl md:text-3xl"
        >
          Hayvanınıza En İyi Bakımı Sağlıyoruz
        </Typography>
        <Typography className="mb-8 font-normal text-blue-gray-500 text-base md:text-lg">
          Kliniğimizde, hayvanlarınıza en iyi bakımı sunmak için her zaman yanınızdayız.
          Veteriner hekimlerimiz ve uzman ekibimizle, her türlü sağlık sorunu için çözüm sağlıyoruz.
        </Typography>
      </div>

      <div className="mx-auto mt-8 w-full md:w-4/12">
        <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
          <CardHeader floated={false} className="relative h-56">
            <img
              alt="Veterinerlik Hizmeti"
              src="/img/vet1.jpg"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="small" color="blue-gray" className="font-normal">
              Veterinerlik Hizmetleri
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-3 mt-2 font-bold">
              En İyi Sağlık Hizmetini Sunuyoruz
            </Typography>
            <Typography className="font-normal text-blue-gray-500">
              Kliniğimizde, her yaştan ve her türden hayvan için sağlıklı yaşam hizmetleri sunuyoruz.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>

    <div className="mt-10 flex flex-wrap items-center">
      <div className="mx-auto mt-8 w-full md:w-4/12">
        <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
          <CardHeader floated={false} className="relative h-56">
            <img
              alt="Veterinerlik Hizmeti"
              src="/img/vet2.jpg"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="small" color="blue-gray" className="font-normal">
              Acil Servis Hizmeti
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-3 mt-2 font-bold">
              Acil Durumlarda Yanınızdayız
            </Typography>
            <Typography className="font-normal text-blue-gray-500">
              Kliniğimizde, 7/24 acil servis hizmeti sunuyoruz. Her türlü acil durumda yanınızdayız.
            </Typography>
          </CardBody>
        </Card>
      </div>

      <div className="mx-auto w-full px-4 md:w-5/12 hidden md:block">
        <Typography
          variant="h3"
          className="mb-3 font-bold text-blue-gray-900 text-xl md:text-3xl"
        >
          7/24 Acil Veteriner Hizmeti Sağlıyoruz
        </Typography>
        <Typography className="mb-8 font-normal text-blue-gray-500 text-base md:text-lg">
          Her an her türlü acil durumda yanınızdayız. Hayvanınızın sağlığı bizim için önemli.
        </Typography>
      </div>
    </div>

    <div className="mt-10 flex flex-wrap items-center">
      <div className="mx-auto w-full px-4 md:w-5/12 hidden md:block">
        <Typography
          variant="h3"
          className="mb-3 font-bold text-blue-gray-900 text-xl md:text-3xl"
        >
          Online Randevu Sistemi
        </Typography>
        <Typography className="mb-8 font-normal text-blue-gray-500 text-base md:text-lg">
          Online randevu sistemimiz ile istediğiniz yerden istediğiniz zaman randevu alabilirsiniz.
        </Typography>
      </div>

      <div className="mx-auto mt-8 w-full md:w-4/12">
        <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
          <CardHeader floated={false} className="relative h-56">
            <img
              alt="Veterinerlik Hizmeti"
              src="/img/vet3.jpg"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="small" color="blue-gray" className="font-normal">
              Kolay Randevu Alma
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-3 mt-2 font-bold">
              En Ulaşılbilir Hizmet
            </Typography>
            <Typography className="font-normal text-blue-gray-500">
              Kolaylıklar sunan online randevu sistemimiz ile istediğiniz zaman randevu alabilirsiniz.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>

  </div>
</section>


  );
};

export default ServicesSection;
