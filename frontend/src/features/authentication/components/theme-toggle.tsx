import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Event handlers
  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <label className="rounded-full w-24 h-11 p-2 fixed bottom-2 right-2 bg-blue-800 overflow-hidden dark:bg-neutral-100">
      <input
        onChange={handleChange}
        type="checkbox"
        className="peer/toggle appearance-none w-7 h-7 bg-white rounded-full absolute bottom-2 left-2 checked:left-[calc(100%-calc(1.75rem+0.5rem))]
        transition-[left] duration-100 dark:bg-blue-800
"
      />
      <Sun className="text-yellow-400 peer-checked/toggle:opacity-100 opacity-0 transition-all duration-200 absolute left-2 top-2 -translate-y-[150%] peer-checked/toggle:translate-y-0 peer-checked/toggle:delay-100" />
      <Moon
        className="text-neutral-50 absolute right-2 top-2 peer-checked/toggle:opacity-0 transition-all duration-200 peer-checked/toggle:translate-y-[150%] translate-y-0 dark:text-neutral-800"
        size={26}
      />
    </label>
  );
}

export { ThemeToggle };
