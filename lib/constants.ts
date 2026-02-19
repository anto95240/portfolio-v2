import { faHouse, faCircleInfo, faFile, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

export const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  ydays: { 
    bg: "bg-gradient-to-r from-light-green to-green-blue", 
    text: "text-black" 
  },
  web: { 
    bg: "bg-gradient-to-r from-green-blue to-blue-darkBlue", 
    text: "text-black" 
  },
  jeux: { 
    bg: "bg-gradient-to-r from-blue-darkBlue to-dark-blue", 
    text: "text-white" 
  },
};

export const DEFAULT_STYLE = { bg: "bg-white", text: "text-black" };

export const CATEGORIES_DATA = [
  {
    name: "YDAYS",
    categorySlug: "ydays",
    gradient: "from-light-green to-green-blue",
    imageSrc: "/images/ydays.svg",
    description: "Les YDAYS c'est quoi ?\n\nC'est une spécificité d'Ynov campus ! Toute l'année, les étudiants de différentes filières se réunissent un mercredi pour travailler en projet collaboratif et donner vie à leur idée",
    className: "text-black",
  },
  {
    name: "WEB",
    categorySlug: "web",
    gradient: "from-green-blue to-blue-darkBlue",
    imageSrc: "/images/web.webp",
    description: "Il s'agit de site web, d'application web réalisés à l'école ou en stage",
    className: "text-black",
  },
  {
    name: "JEUX",
    categorySlug: "jeux",
    gradient: "from-blue-darkBlue to-dark-blue",
    imageSrc: "/images/jeux.webp",
    description: "Il s'agit des jeux locaux sur le web ou en ligne de commande réalisés à l'école ou en stage ",
    className: "text-white",
  }
];

export const NAV_LINKS = [
  { 
    label: "Accueil", 
    href: "/", 
    icon: faHouse 
  },
  {
    label: "Projets",
    href: "/projet",
    icon: faFileCircleCheck,
    hasDropdown: true,
    subLinks: [
      { label: "Ydays", href: "/projet/ydays" },
      { label: "Web", href: "/projet/web" },
      { label: "Jeux", href: "/projet/jeux" },
    ]
  },
  { 
    label: "A propos", 
    href: "/about", 
    icon: faCircleInfo 
  },
  { 
    label: "CV", 
    href: "/cv", 
    icon: faFile 
  },
];

export const HOBBIES_DATA = [
  { id: 1, name: "Football", bgColor: "bg-blue-300" },
  { id: 2, name: "Cinéma", bgColor: "bg-blue-300" },
  { id: 3, name: "Lecture", bgColor: "bg-blue-300" }
];

export const PROJECT_CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  ydays: { bg: "bg-category-blue", text: "text-black" },
  web: { bg: "bg-category-green", text: "text-black" },
  jeux: { bg: "bg-category-green", text: "text-black" },
};

export const CATEGORY_SLUGS = ["ydays", "web", "jeux"];