import { Home} from "@/pages";

export const routes = [
  {
    name: "Anasayfa",
    path: "/home",
    element: <Home />,
  },

  {
    name: "Hizmetlerimiz",
    href: "#services", 
  },
  {
    name: "Ekibimiz",
    href: "#team", 
  },
  {
    name: "Hakkımızda",
    href: "#about", 
  },
];

export default routes;
