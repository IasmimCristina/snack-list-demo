import React, { useState } from 'react';
import './LoginForm.css';

type LoginFormProps = {
  loginName: string;
  loginPassword: string;
  setLoginName: React.Dispatch<React.SetStateAction<string>>;
  setLoginPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => void;
  closeModal: () => void;
};

const LoginForm = ({ loginName, loginPassword, setLoginName, setLoginPassword, handleLogin, closeModal }: LoginFormProps) => {
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleSubmit = () => {
    if (loginName.trim() === "" || loginPassword.trim() === "") {
      setIsNameValid(loginName.trim() !== "");
      setIsPasswordValid(loginPassword.trim() !== "");
      return;
    }
    handleLogin();
  };

  return (
    <div className="login-form-overlay">
      <div className="login-form">
        <button className="login-form__close" onClick={closeModal}>X</button>

        <div className="login-form__input-container">
          <label htmlFor="username" className="login-form__label">Username</label>
          <input
            id="username"
            className={`login-form__input ${!isNameValid ? 'error' : ''}`}
            type="text"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
          />
          {!isNameValid && <span className="error-message">Username is required.</span>}
        </div>

        <div className="login-form__input-container">
          <label htmlFor="password" className="login-form__label">Password</label>
          <input
            id="password"
            className={`login-form__input ${!isPasswordValid ? 'error' : ''}`}
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          {!isPasswordValid && <span className="error-message">Password is required.</span>}
        </div>

        <button className="login-form__button" onClick={handleSubmit}>Log In</button>
      </div>
    </div>
  );
};

export default LoginForm;
