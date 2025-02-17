import React, { useState } from "react";
import "./LoginForm.css";

type LoginFormProps = {
  loginData: { name: string; password: string };
  setLoginData: React.Dispatch<
    React.SetStateAction<{ name: string; password: string }>
  >;
  handleLogin: () => void;
  closeModal: () => void;
};

const LoginForm = ({
  loginData,
  setLoginData,
  handleLogin,
  closeModal,
}: LoginFormProps) => {
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loginData.name.trim() === "" || loginData.password.trim() === "") {
      setIsNameValid(loginData.name.trim() !== "");
      setIsPasswordValid(loginData.password.trim() !== "");
      return;
    }
    handleLogin();
  };

  return (
    <div className="login-form-overlay">
      <form
        className="login-form"
        onSubmit={handleSubmit}
        aria-labelledby="login-form-title"
      >
        <button
          type="button"
          className="login-form__close"
          onClick={closeModal}
          aria-label="Close login form"
        >
          X
        </button>

        <h2 id="login-form-title" className="login-form__title">
          Login form
        </h2>

        <div className="login-form__input-container">
          <label htmlFor="username" className="login-form__label">
            Username
          </label>
          <input
            id="username"
            className={`login-form__input ${!isNameValid ? "error" : ""}`}
            type="text"
            value={loginData.name}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          {!isNameValid && (
            <span className="error-message">Username is required.</span>
          )}
        </div>

        <div className="login-form__input-container">
          <label htmlFor="password" className="login-form__label">
            Password
          </label>
          <input
            id="password"
            className={`login-form__input ${!isPasswordValid ? "error" : ""}`}
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {!isPasswordValid && (
            <span className="error-message">Password is required.</span>
          )}
        </div>

        <button type="submit" className="login-form__button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
