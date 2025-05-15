import { Request, Response, RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretoXD";

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

    const token = jwt.sign(
      {
        id: userFind._id,
        rol: userFind.rol,
      },
      JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Login exitoso",
      token,
      usuario: {
        id: userFind._id,
        email: userFind.email,
        rol: userFind.rol,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      msg: "Error interno del servidor dentra al controlador del login",
    });
  }
};

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const {
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    email,
    password,
  } = req.body;

  try {
    const verifyEmail = await User.findOne({ email: email });

    if (verifyEmail) {
      res.status(401).json({ msg: "Ya existe una cuenta con este correo" });
      return;
    }

    const passwordEncrypted = await bcrypt.hash(password, 10);

    const newUser = new User({
      primerNombre: firstName,
      segundoNombre: secondName,
      primerApellido: firstLastName,
      segundoApellido: secondLastName,
      email: email,
      contraseña: passwordEncrypted,
    });

    await newUser.save();
    res.status(201).json({ msg: "Cuenta creada con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
