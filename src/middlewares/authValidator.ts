import { Request, Response, NextFunction } from "express";
import { verifyToken, generateToken } from "../utils/data/authToken";

/**
 * Middleware para validar el token JWT en las solicitudes.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader?.split(" ")[1] || '';

  try {
    verifyToken(token);
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden: Invalid token" });
  }
};
