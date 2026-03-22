import { useState, useEffect } from "react";

export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 320);

  useEffect(() => {
    function handleResize() {
      setIsSmallMobile(window.innerWidth <= 320);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmallMobile;
}
