import jwt from 'jsonwebtoken'; // Use import instead of require

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Extraer el token del encabezado 'Authorization'
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Si no hay token, devolver un error
  if (!token) {
    return res.status(401).send({ error: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, 'secretkey');
    
    // Añadir los datos del usuario decodificados al objeto `req`
    req.user = decoded;
    
    // Continuar con el siguiente middleware o controlador
    next();
  } catch (err) {
    // Si el token es inválido, devolver un error
    res.status(400).send({ error: 'Token inválido.' });
  }
};

export default authMiddleware; // Use export default instead of module.exports