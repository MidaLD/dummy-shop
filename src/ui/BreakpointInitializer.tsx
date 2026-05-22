import { useEffect } from "react";
import { setIsLargeDesktop } from "../redux/breakpointSlice";
import { useAppDispatch } from "../features/hooks/useAppDispatch";
import { hideCategoriesMenu } from "../redux/shopSlice";

function BreakpointInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1440px)");

    dispatch(setIsLargeDesktop(mql.matches));
    if (mql.matches) dispatch(hideCategoriesMenu());

    const handler = (e: MediaQueryListEvent) => {
      dispatch(setIsLargeDesktop(e.matches));
      if (e.matches) dispatch(hideCategoriesMenu());
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [dispatch]);

  return null;
}

export default BreakpointInitializer;
