import React, { useState } from 'react';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en localStorage
        localStorage.setItem('token', data.token);
        console.log('Login exitoso. Token:', data.token);

        // Redirigir al usuario a la página principal (puedes usar React Router)
        window.location.href = '/'; // Cambia esto según tu ruta de inicio
      } else {
        // Mostrar errores del backend
        setErrors({ backend: data.msg || 'Error en el servidor' });
      }
    } catch (err) {
      console.error('Error en la solicitud:', err);
      setErrors({ backend: 'Error en la conexión con el servidor' });
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'El correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'El correo electrónico no es válido.';
    }

    if (!password) {
      errors.password = 'La contraseña es requerida.';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    return errors;
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>¡Bienvenido!</h1>
        <h2>EDUNEG</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="login-right">
        <h2>¡Ingresa aquí!</h2>
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
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </div>
  );
};

export default Login;