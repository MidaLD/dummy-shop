import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
