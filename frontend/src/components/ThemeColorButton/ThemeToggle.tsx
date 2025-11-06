import { IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AnimatePresence, motion } from "framer-motion";

export const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const currentMode = mode ?? "light"; // 'light' | 'dark'
  const isLight = currentMode === "light";

  const handleToggle = () => {
    setMode(isLight ? "dark" : "light");
  };

  return (
    <AnimatePresence>
      <motion.div
        key={currentMode}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          color={isLight ? "primary" : "warning"}
          onClick={handleToggle}
        >
          {isLight ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};
