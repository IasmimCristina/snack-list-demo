import React, { useState } from "react";
import { User } from "../types/User";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import LoginForm from "./LoginForm";
import "./Header.css";

type HeaderProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const Header = ({ user, setUser }: HeaderProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ name: "", password: "" });

  const handleLogin = () => {
    if (loginData.password === "password" && loginData.name.trim()) {
      setUser({ name: loginData.name, isLoggedIn: true });
      closeLoginModal();
    } else {
      alert("Invalid password!");
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginData({ name: "", password: "" });
  };

  const handleLogout = () => {
    setUser({ name: "", isLoggedIn: false });
  };

  return (
    <header className="header">
      <div className="header__logo">
        <span>🍿</span> SnackList <span>🥤</span>
      </div>
      <div className="header__login">
        {!user.isLoggedIn ? (
          <>
            <button
              className="header__button"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <FaUserCircle style={{ marginRight: "0.5rem" }} />
              Login
            </button>
            {isLoginModalOpen && (
              <LoginForm
                loginData={loginData}
                setLoginData={setLoginData}
                handleLogin={handleLogin}
                closeModal={closeLoginModal}
              />
            )}
          </>
        ) : (
          <div className="header__logged-in">
            <span className="header__user-name">{user.name}</span>
            <button
              className="header__button header__button--logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt style={{ marginRight: "0.5rem" }} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
