import { useState, useEffect } from "react";

export function useIsLargeDesktop() {
  const [isLargeDesktop, setIsLargeDesktop] = useState(
    window.innerWidth >= 1440,
  );

  useEffect(() => {
    function handleResize() {
      setIsLargeDesktop(window.innerWidth >= 1440);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLargeDesktop;
}
