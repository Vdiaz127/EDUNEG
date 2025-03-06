import React, { createContext, useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    } else {
      setLoading(false); 
    }
  }, []);

  const validateToken = async (token) => {
    // console.log(token);
    // console.log(`Bearer ${token}`);
    // console.log(`${API_URL}/api/auth/validate-token`);
    try {
      const response = await fetch(`${API_URL}/api/auth/validate-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        const errorText = await response.text(); // Extrae el texto de la respuesta
        console.warn("Token inválido. Código:", response.status, "Respuesta:", errorText);
      }
    } catch (error) {
      console.error("Error al APP validar el token:", error);
      console.log(error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };
  

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
