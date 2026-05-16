import {
  HiMiniUserCircle,
  HiArrowRightOnRectangle,
  HiUser,
} from "react-icons/hi2";
import { Link } from "react-router";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useState } from "react";
import { useLogout } from "../authentication/useLogout";
import { useOutsideClick } from "../hooks/useOutsideClick";

function UserMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, isLoading } = useCurrentUser();
  const logout = useLogout();

  const fullName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "";

  function handleToggleUserMenu() {
    setUserMenuOpen((prev) => !prev);
  }

  function handleLogout() {
    logout();
  }

  function handleCloseUserMenu(params: type) {
    setUserMenuOpen(false);
  }

  const ref = useOutsideClick<HTMLDivElement>(() => setUserMenuOpen(false));

  if (isLoading) return null;

  return (
    <div ref={ref} className="relative">
      {currentUser ? (
        <>
          <button
            onClick={handleToggleUserMenu}
            className="cursor-pointer flex items-center gap-2 rounded-full pl-0.5 pr-3 py-0.5 hover:bg-white/10 transition-all duration-200 max-w-[160px] sm:max-w-[200px]"
          >
            <img
              className="w-7 h-7 rounded-full object-cover shrink-0 ring-2 ring-white/30"
              src={currentUser.image}
              alt=""
            />
            <span className="hidden sm:block text-sm font-medium text-white truncate">
              {currentUser.firstName}
            </span>
          </button>

          {userMenuOpen && (
            <div className="absolute z-50 right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                <img
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                  src={currentUser.image}
                  alt=""
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {fullName}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <ul className="py-1">
                <li>
                  <Link
                    to="/user"
                    onClick={handleCloseUserMenu}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <HiUser className="w-4 h-4 text-slate-400 shrink-0" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-2.5 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <HiArrowRightOnRectangle className="w-4 h-4 text-slate-400 shrink-0" />
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-200"
        >
          <HiMiniUserCircle className="w-5 h-5 shrink-0" />
          <span className="hidden sm:block">Sign in</span>
        </Link>
      )}
    </div>
  );
}

export default UserMenu;
