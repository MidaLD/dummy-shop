import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
