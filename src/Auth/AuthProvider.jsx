import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Checks authenticatiion on initial load

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await fetch("/api/Auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Store token
      localStorage.setItem("token", data.token);

      // Set user
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.log("Login in error", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Token Validation
  const validateToken = async (token) => {
    try {
      const response = await fetch("/api/validate-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.log("Token validation error", error);
      logout();
      setIsLoading(false);
    }
  };

  //  Registration
  const register = async (registrationData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error("Registration Failed");
      }

      const data = response.json();

      //Store token
      localStorage.setItem("token", data.token);

      //Set user
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.log("Registration error", error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    isLoading,
  };
  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

// custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("useAuth must be useed within an AuthProvider");
  }
  return context;
};
