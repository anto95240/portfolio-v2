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

// Fallback par défaut si la catégorie n'existe pas
export const DEFAULT_STYLE = { bg: "bg-white", text: "text-black" };