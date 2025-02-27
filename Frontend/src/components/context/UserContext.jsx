import React, { createContext, useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar si hay un token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validar el token y obtener los datos del usuario
      validateToken(token);
    }
  }, []);

  // Función para validar el token y obtener los datos del usuario
  const validateToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/validate-token"`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user); // Actualizar el estado del usuario
      } else {
        localStorage.removeItem("token"); // Eliminar el token si no es válido
      }
    } catch (error) {
      console.error("Error al validar el token:", error);
    }
  };

  // Función para actualizar los datos del usuario
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};