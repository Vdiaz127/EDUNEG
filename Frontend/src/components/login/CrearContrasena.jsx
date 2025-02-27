import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Para redirecciones y obtener el token
import "./Login.css"; // Asegúrate de tener estilos adecuados

const CrearContrasena = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Obtén el token de la URL
  const token = new URLSearchParams(location.search).get("token");

  // Obtén la URL de la API desde las variables de entorno
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar las contraseñas
    if (password.length < 6) {
      setErrors({ password: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden." });
      return;
    }

    try {
      // Hacer la solicitud al backend para crear la contraseña
      const response = await fetch(`${apiUrl}/api/auth/create-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir al login para que el usuario inicie sesión
        navigate("/");
      } else {
        // Mostrar errores del backend
        setErrors({ backend: data.msg || "Error al crear la contraseña" });
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setErrors({ backend: "Error en la conexión con el servidor" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Crear Contraseña</h1>
        <p className="mb-4">
          Por favor, ingresa y confirma tu nueva contraseña.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
          {errors.backend && <p className="text-red-500">{errors.backend}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Establecer Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearContrasena;