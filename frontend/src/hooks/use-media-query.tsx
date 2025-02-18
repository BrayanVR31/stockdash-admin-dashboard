import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    // Synchronize state with matched media query
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    // Global event handlers on each resized screen
    const handleResize = () => setMatches(media.matches);
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, [matches, query]);
  return matches;
};

export { useMediaQuery };
