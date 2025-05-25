import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secretoXD";

export interface AuthRequest extends Request {
  usuario?: any;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ msg: "Acceso Denegado" });
    return;
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET as string) as { id: string };
    const usuario = await User.findById(verified.id).select("-contraseña");

    if (!usuario) {
      res.status(401).json({ msg: "Token No válido" });
      return;
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
