import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const PrimerLogin = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Obtén la URL de la API desde las variables de entorno
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el correo electrónico
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "El correo electrónico no es válido." });
      return;
    }

    try {
      // Hacer la solicitud al backend para validar el correo
      const response = await fetch(`${apiUrl}/api/auth/validate-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir al formulario de creación de contraseña con el token
        navigate(`/crear-contrasena?token=${data.token}`);
      } else {
        // Mostrar errores del backend
        setErrors({ backend: data.msg || "Correo no válido" });
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setErrors({ backend: "Error en la conexión con el servidor" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Iniciar sesión por primera vez</h1>
        <p className="mb-4">
          Por favor, ingresa el correo electrónico que registró el administrador.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          {errors.backend && <p className="text-red-500">{errors.backend}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Validar Correo
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrimerLogin;