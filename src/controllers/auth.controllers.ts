import { Request, Response, RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFind = await User.findOne({ email: email });
    if (userFind === null) {
      res
        .status(404)
        .json({ msg: "Tú correo de usuario no ha sido encontrado" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, userFind.contraseña);
    if (!passwordMatch) {
      res.status(401).json({ msg: "Contraseña incorrecta" });
      return;
    }

    res.status(200).json({
      msg: `Bienvenido ${userFind.primerNombre! + userFind.primerApellido}`,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const verifyEmail = await User.findOne({ email: email });

  if (verifyEmail) {
    res.status(401).json({ msg: "Ya existe una cuenta con este correo" });
    return;
  }

  const passwordEncrypted = await bcrypt.hash(password, 10);

  const newUser = new User({ email: email, contraseña: passwordEncrypted });

  await newUser.save();
  res.status(201).json({ msg: "Cuenta creada con éxito" });
  } catch (error) {
    res.status(500).json({msg: "Error interno del servidor"});
  }

  
};
