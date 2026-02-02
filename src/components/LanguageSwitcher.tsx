import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language, languageNames } from "@/lib/i18n";
import { motion } from "framer-motion";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ["en", "fr", "tw"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-foreground"
        >
          <Globe size={16} />
          <span className="text-sm font-medium uppercase">{language}</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`cursor-pointer ${language === lang ? "bg-primary/10 text-primary" : ""}`}
          >
            <span className="font-medium">{languageNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
