import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Manual Admin User
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "123456";

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "admin",
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Auto load user from localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
