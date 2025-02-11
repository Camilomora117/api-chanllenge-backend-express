import jwt from "jsonwebtoken";
import { environments } from "../../config/config";

interface TokenPayload {
  userId: string;
  email: string;
  role?: string;
}

/**
 * Genera un token JWT con un tiempo de expiración.
 * @param payload Datos del usuario a incluir en el token
 * @returns Token JWT
 */
export const generateToken = (payload: TokenPayload): string => {
  try {
    return jwt.sign(payload, environments.JWT_SECRET, { expiresIn: "30d" });
  } catch (error) {
    throw new Error('No se pudo generar el token');
  }
};

/**
 * Verifica si un token es válido.
 * @param token Token JWT
 * @returns Datos decodificados o null si es inválido
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, environments.JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Token Incorrecto');
  }
};
