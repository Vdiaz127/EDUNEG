import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Importa el contexto
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext); // Obtén la función para actualizar el usuario

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "El correo electrónico no es válido." });
      return;
    }

    if (!password) {
      setErrors({ password: "La contraseña es requerida." });
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Guardar el token
        updateUser(data.user); // Actualizar el estado del usuario
        navigate(`/${data.user.lastName}`); // Redirigir según el rol
      } else {
        setErrors({ backend: data.msg || "Error en el servidor" });
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setErrors({ backend: "Error en la conexión con el servidor" });
    }
  };

  return (
    <div className="bg-sky-100 flex lg:flex-row flex-col justify-center items-center h-screen">
      <div className="lg:w-1/2 h-screen lg:block flex justify-center content-center flex-col login-left">
        <div className="w-full p-3 flex items-center content-center flex-col">
          <img className="leftLogo" src="/images/birrete.png" />
          <h1>¡Bienvenido!</h1>
          <h2>EDUNEG</h2>
          <p>
            Bienvenido@ al Panel Administrativo EDUNEG!
            <br />
            Estás a punto de acceder a una plataforma diseñada para gestionar,
            administrar y optimizar los procesos académicos y administrativos de
            nuestra institución. Aquí encontrarás las herramientas necesarias
            para realizar tus tareas de manera eficiente y segura.
          </p>
        </div>
      </div>
      <div className="lg:p-15 md:p-52 sm:20 p-8 h-full w-full lg:w-1/2 flex flex-col justify-center items-center login-right">
        <h1 className="text-2xl font-semibold mb-4">Inicia Sesión</h1>
        <p>
          Por favor, ingresa tus credenciales para continuar. Recuerda que este
          espacio es exclusivo para personal autorizado, por lo que te
          recomendamos mantener la confidencialidad de tu usuario y contraseña.
        </p>

        <div className="lg:w-6/10 w-full flex items-center content-center flex-col">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <button type="submit">Iniciar Sesión</button>
          </form>

          {errors.backend && <p className="error">{errors.backend}</p>}

          {/* Botón para "Iniciar sesión por primera vez" */}
          <button
            onClick={() => navigate("/registro")}
            className="mt-4 text-blue-500 underline"
          >
            Iniciar sesión por primera vez
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;