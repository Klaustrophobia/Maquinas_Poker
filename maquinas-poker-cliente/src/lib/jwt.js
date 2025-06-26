import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro";
const JWT_EXPIRES_IN = "2h";

// Crear token JWT
export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

// Verificar token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};