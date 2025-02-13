import React, { useState } from 'react';
import { User } from '../types/User';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; 
import { VscLoading } from 'react-icons/vsc';
import LoginForm from './LoginForm'; 
import './Header.css';

type HeaderProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const Header = ({ user, setUser }: HeaderProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    if (loginPassword === "password" && loginName.trim()) {
      setUser({ name: loginName, isLoggedIn: true });
      setIsLoginModalOpen(false);
      setLoginName("");
      setLoginPassword("");
    } else {
      alert("Invalid password!");
    }
    setIsLoading(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginName("");
    setLoginPassword("");
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
            <button className="header__button" onClick={() => setIsLoginModalOpen(true)}>
              <FaUserCircle style={{ marginRight: '0.5rem' }} />
              Login
            </button>
            {isLoginModalOpen && (
              <LoginForm
                loginName={loginName}
                loginPassword={loginPassword}
                setLoginName={setLoginName}
                setLoginPassword={setLoginPassword}
                handleLogin={handleLogin}
                closeModal={closeLoginModal} 
              />
            )}
          </>
        ) : (
          <div className="header__logged-in">
            <span className="header__user-name">{user.name}</span>
            <button className="header__button header__button--logout" onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
              Logout
            </button>
          </div>
        )}
        {isLoading && <VscLoading className="header__spinner" />}
      </div>
    </header>
  );
};

export default Header;
