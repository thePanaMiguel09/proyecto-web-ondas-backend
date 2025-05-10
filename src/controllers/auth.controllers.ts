import { Request, Response, RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userFind = await User.findOne({ email: email });
  if (userFind === null) {
    res.status(404).json({ msg: "Tú correo de usuario no ha sido encontrado" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, userFind.contraseña);
  if (!passwordMatch) {
    res.status(401).json({ msg: "Contraseña incorrecta" });
    return;
  }

  res
    .status(200)
    .json({
      msg: `Bienvenido ${userFind.primerNombre! + userFind.primerApellido}`,
    });
};
