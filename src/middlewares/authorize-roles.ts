import { RequestHandler } from "express";
import { AuthRequest } from "./validate-token";

export const authorizeRoutes = (...roles: string[]): RequestHandler => {
  return ((req, res, next) => {
    const usuario = (req as AuthRequest).usuario;
    if (usuario.rol === "SUPERADMIN") {
      return next();
    }
    if (!roles.includes(usuario?.rol)) {
      res.status(403).json({ msg: "No tienes autorización" });
      return;
    }
    next();
  }) as RequestHandler;
};
