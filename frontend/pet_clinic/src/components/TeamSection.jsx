import React from "react";
import { PageTitle } from "@/widgets/layout";
import { IconButton } from "@material-tailwind/react";

const TeamSection = ({ teamData }) => {
  return (
    <section id="team" className="px-4 pt-20 pb-48">
      <div className="container mx-auto">
        <PageTitle heading="Ekibimiz" />
        <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
          {teamData.map(({ img, name, position, socials }) => (
            <div key={name} className="text-center">
              <div className="relative mb-4">
                <img
                  src={img}
                  alt={name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-500">{position}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                {socials.map(({ color, name }) => (
                  <IconButton key={name} color={color} variant="text">
                    <i className={`fa-brands text-xl fa-${name}`} />
                  </IconButton>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
