import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../app/service/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error, isSuccess: isLoginSuccess }] =
    useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/");
    }
  }, [isLoginSuccess, navigate]);

  const handleLogin = async ({ email, password }) => {
    try {
      await login({ email, password }).unwrap();
    } catch (err) {
      console.error("Login error: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-black"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p>{error.data?.message || "Login failed"}</p>}
    </form>
  );
}

export default Login;
