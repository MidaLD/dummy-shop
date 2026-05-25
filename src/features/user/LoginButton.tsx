import { HiMiniUserCircle } from "react-icons/hi2";
import { Link } from "react-router";

function LoginButton() {
  return (
    <Link
      to="/login"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-200"
    >
      <HiMiniUserCircle className="w-5 h-5 shrink-0" />
      <span className="hidden sm:block">Sign in</span>
    </Link>
  );
}

export default LoginButton;
