import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (authApi.isLoggedIn()) {
        try {
          const profile = await authApi.getProfile();
          setUser(profile);
        } catch {
          authApi.logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    await authApi.login(username, password);
    const profile = await authApi.getProfile();
    setUser(profile);
  };

  const register = async (data) => {
    await authApi.register(data);
    await login(data.username, data.password);
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
