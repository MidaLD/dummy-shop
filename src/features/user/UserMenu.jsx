import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniUserCircle,
} from "react-icons/hi2";
import { Link } from "react-router";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useState } from "react";
import { useLogout } from "../authentication/useLogout";
import { useOutsideClick } from "../hooks/useOutsideClick";

function UserMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, isLoading } = useCurrentUser();
  const { logout, isPending } = useLogout();

  const fullName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "";

  function handleUserMenu() {
    setUserMenuOpen((prev) => !prev);
  }

  function handleLogout() {
    logout();
  }

  const ref = useOutsideClick(() => setUserMenuOpen(false));

  if (isLoading || isPending) return null;

  return (
    <div ref={ref} className="user-box">
      {currentUser ? (
        <>
          <button className="user-menu-btn" onClick={handleUserMenu}>
            <img className="user-img" src={currentUser.image} alt="" />
            <p data-first={currentUser.firstName}>{fullName}</p>
            {userMenuOpen ? (
              <HiMiniChevronUp className="header-icon" />
            ) : (
              <HiMiniChevronDown className="header-icon" />
            )}
          </button>
          {userMenuOpen && (
            <ul className="user-menu">
              <li>
                <Link to="/user">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          )}
        </>
      ) : (
        <Link to="/login" className="user-btn">
          <HiMiniUserCircle className="header-icon" />
          <p className="login-text">Log in</p>
        </Link>
      )}
    </div>
  );
}

export default UserMenu;
