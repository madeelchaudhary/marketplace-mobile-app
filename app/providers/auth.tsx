import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import auth from "../lib/auth";

interface User {
  email: string;
  iat: number;
  name: string;
  userId: number;
}

interface AuthContextType {
  loading: boolean | null;
  user: User | null;
  login: (token: any) => void;
  logout: () => void;
}

const initialState: AuthContextType = {
  loading: false,
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState<AuthContextType["loading"]>(null);

  useEffect(() => {
    setLoading(true);
    const token = auth.getToken();
    token
      .then((res) => {
        if (res) {
          const user = jwtDecode(res);
          setUser(user as User);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUserChange = (token: any) => {
    auth.setToken(token);
    const user = token ? jwtDecode(token) : null;
    if (user) return setUser(user as User);
    return setUser(null);
  };

  const handleLogout = () => {
    setUser(null);
    auth.removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login: handleUserChange,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
