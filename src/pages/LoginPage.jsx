import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthServices";
import "./css/Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    if (user) {
      navigate("/content");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="loginForm">
      <div className="container">
        <div className="header">
          <h2>Login Form</h2>
        </div>
        <div className="main">
          <div className="theform">
            <form onSubmit={handleLogin}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="inputting"
                  placeholder="Username is user1"
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inputting"
                  placeholder="Password is password1"
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
};

export default LoginPage;
