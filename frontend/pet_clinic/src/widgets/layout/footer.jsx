import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4 text-2xl font-bold text-black">
              {title}
            </Typography>
            <Typography className="font-normal text-black lg:w-2/5">
              {description}
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-4 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-2 block font-medium uppercase text-black"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-black hover:text-green-600"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-black"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "Veteriner Kliniği",
  description:
    "Hayvan dostlarınıza şefkatle bakım sunan, deneyimli ve profesyonel veteriner ekibimizle yanınızdayız.",
  socials: [
    {
      color: "gray",
      name: "facebook",
      path: "",
    },
    {
      color: "gray",
      name: "instagram",
      path: "",
    },
    {
      color: "gray",
      name: "twitter",
      path: "",
    },
    {
      color: "black",
      name: "linkedin",
      path: "",
    },
  ],
  menus: [
    {
      name: "Hizmetlerimiz",
      items: [
        { name: "Genel Muayene", },
        { name: "Acil Servis Hizmeti", },
        { name: "Kolay Randevu Alma",},
        { name: "Cerrahi Hizmetler",},
      ],
    },
    {
      name: "Bilgilendirme",
      items: [
        { name: "Anasayfa", },
        { name: "Hakkımızda", },
        { name: "Ekibimiz", },
        { name: "Randevu", },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} Veteriner Kliniği.{" "}
      <a
        href="/"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        Gizlilik Politikası
      </a>
      .
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
