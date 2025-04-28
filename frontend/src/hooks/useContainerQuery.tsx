import { useRef, useState, useEffect, useMemo } from "react";

const useContainerQuery = (breakpoint: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMatch, setIsMatch] = useState(false);
  const observer = useMemo(
    () =>
      new ResizeObserver(([entry]) => {
        const width = entry.contentRect.width;
        setIsMatch(width >= breakpoint);
      }),
    [breakpoint],
  );
  useEffect(() => {
    if (!containerRef.current) return;
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [observer]);
  return { containerRef, isMatch };
};

export { useContainerQuery };
