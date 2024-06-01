import axios from "axios";

const API_URL = "http://localhost:3006/users";

const login = async (username, password) => {
  const response = await axios.get(API_URL);
  const user = response.data.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    const expiryTime = new Date().getTime() + 30 * 60 * 1000;
    localStorage.setItem(
      "user",
      JSON.stringify({ username, expiry: expiryTime })
    );
  }
  return user;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  const user = JSON.parse(userStr);
  if (new Date().getTime() > user.expiry) {
    localStorage.removeItem("user");
    return null;
  }

  return user;
};

export { login, logout, getCurrentUser };
