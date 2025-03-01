import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import "./Login.css";

const PrimerLogin = () => {
  const [step, setStep] = useState('email'); // 'email' o 'password'
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "El correo electrónico no es válido." });
      return;
    }

    try {
      // Primero validamos el email para el primer login
      const validateResponse = await fetch(`${apiUrl}/api/auth/validate-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const validateData = await validateResponse.json();

      if (!validateResponse.ok) {
        setErrors({ email: validateData.msg || "Correo no encontrado" });
        return;
      }

      // Guardamos el token
      setToken(validateData.token);

      // Si el email es válido, buscamos la información del usuario
      const userResponse = await fetch(`${apiUrl}/api/professors?email=${email}`);
      let userData = null;

      if (userResponse.ok) {
        const professors = await userResponse.json();
        userData = professors.find(prof => prof.email === email);
      }

      if (!userData) {
        // Si no es profesor, intentamos buscar en estudiantes
        const studentResponse = await fetch(`${apiUrl}/api/students?email=${email}`);
        if (studentResponse.ok) {
          const students = await studentResponse.json();
          userData = students.find(student => student.email === email);
        }
      }

      if (userData) {
        setUserData(userData);
        setStep('password');
      } else {
        setErrors({ email: "No se pudo obtener la información del usuario" });
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors({ email: "Error en la conexión con el servidor" });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "La contraseña es requerida";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/create-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        // Esperar 3 segundos antes de redirigir
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setErrors({ backend: data.msg || "Error al crear la contraseña" });
      }
    } catch (err) {
      setErrors({ backend: "Error en la conexión con el servidor" });
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Contraseña creada exitosamente!</h2>
          <p className="text-gray-600">
            Serás redirigido al inicio de sesión en unos segundos...
          </p>
        </div>
      </div>
    );
  }

  if (step === 'email') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ¡Bienvenido a EDUNEG!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Por favor, ingresa tu correo electrónico para comenzar
          </p>

          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white w-full px-4 py-2 border-b-2 border-blue-500 rounded outline-none focus:border-blue-700 transition-colors"
                  placeholder="Ingresa tu correo electrónico"
                />
                <MdOutlineEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-blue-900 transition duration-200 transform hover:scale-[1.02]"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 py-8 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-2xl mx-4 relative z-10">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gray-800 text-white p-6 text-center">
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido a EDUNEG!</h1>
            <p className="text-gray-300">Configuración inicial de tu cuenta</p>
          </div>

          {userData && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaRegUser className="w-12 h-12 text-gray-600" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaRegAddressCard className="w-5 h-5" />
                    <span className="font-medium">Nombre completo:</span>
                  </div>
                  <p className="mt-1 text-gray-900 font-semibold">
                    {userData.firstName} {userData.lastName}
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MdOutlineEmail className="w-5 h-5" />
                    <span className="font-medium">Correo electrónico:</span>
                  </div>
                  <p className="mt-1 text-gray-900 font-semibold">{userData.email}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    className="bg-gray-100 w-full px-4 py-2 border-b-2 border-gray-500 rounded outline-none"
                    placeholder="Ingresa tu nueva contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('password')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="bg-gray-100 w-full px-4 py-2 border-b-2 border-gray-500 rounded outline-none"
                    placeholder="Confirma tu nueva contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {errors.backend && (
              <p className="text-red-500 text-sm mt-4">{errors.backend}</p>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Crear contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrimerLogin;