import { getCookie, setCookie, deleteCookie } from "./cookies";
import { Navigate } from "react-router-dom";
import React from "react";

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState(getCookie("user"));

  let signin = (newUser: string, callback: VoidFunction) => {
    // set user in cookie so it can be found on load
    setCookie("user", newUser);
    setUser(newUser);
    callback();
  };

  let signout = (callback: VoidFunction) => {
    deleteCookie("user");
    setUser("");
    callback();
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
