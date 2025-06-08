// src/LoginButton.js
import React from "react";
import { useAuth } from "./AuthContext";

function LoginButton() {
  const { login } = useAuth();

  const handleLogin = () => {
    login({ name: "John Doe", email: "john@example.com" });
  };

  return <button onClick={handleLogin}>Login</button>;
}

export default LoginButton;
