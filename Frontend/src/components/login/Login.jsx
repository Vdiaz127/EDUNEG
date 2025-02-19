import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Función para manejar el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();

    // Validar campos
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Hacer la solicitud al backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en localStorage
        localStorage.setItem("token", data.token);
        console.log("Login exitoso. Token:", data.token);

        // Redirigir al usuario a la página principal (puedes usar React Router)
        window.location.href = "/"; // Cambia esto según tu ruta de inicio
      } else {
        // Mostrar errores del backend
        setErrors({ backend: data.msg || "Error en el servidor" });
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setErrors({ backend: "Error en la conexión con el servidor" });
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = "El correo electrónico es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "El correo electrónico no es válido.";
    }

    if (!password) {
      errors.password = "La contraseña es requerida.";
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    return errors;
  };

  return (
    <div class="bg-sky-100 flex lg:flex-row flex-col justify-center items-center h-screen">
      <div class="lg:w-1/2 h-screen lg:block flex justify-center content-center flex-col login-left">
        <div class="w-full p-3 flex items-center content-center flex-col">
            <img class="leftLogo" src="/img/birrete.png"  />
            <h1>¡Bienvenido!</h1>
            <h2>EDUNEG</h2>
            <p>
                Bienvenido@ al Panel Administrativo EDUNEG!
                <br />
                Estás a punto de acceder a una plataforma diseñada para gestionar, administrar y optimizar los procesos académicos y administrativos de nuestra institución. Aquí encontrarás las herramientas necesarias para realizar tus tareas de manera eficiente y segura.
            </p>
        </div>
      </div>
      <div class="lg:p-15 md:p-52 sm:20 p-8 h-full w-full lg:w-1/2 flex flex-col justify-center items-center login-right">
        
        <h1 class="text-2xl font-semibold mb-4">Inicia Sesión</h1>
        <p>
            Por favor, ingresa tus credenciales para continuar. Recuerda que este espacio es exclusivo para personal autorizado, por lo que te recomendamos mantener la confidencialidad de tu usuario y contraseña.
        </p>
        
        <div class="lg:w-6/10 w-full flex items-center content-center flex-col">
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

            <p className="forgot-password">
                <a href="#">¿Olvidaste tu contraseña?</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
