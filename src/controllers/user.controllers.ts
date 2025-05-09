import { Request, Response } from "express";
import Usuario from "../models/User";
import bcrypt from "bcryptjs";
import {Estudiante} from "../models/Estudiante";
import {Docente} from "../models/Docente";

export const login = async (req: Request, res: Response) => {
  const { email, contraseña } = req.body;
  try {
    const existingUser = await Usuario.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "El usuario ya está registrado" });

    const passHashed = await bcrypt.hash(contraseña, 10);
    const newUser = new Usuario({ email, contraseña: passHashed });
    await newUser.save();
    res.status(201).json({ msg: "Logged" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const completarRegistro = async (req: Request, res: Response) => {
  const {
    id,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
    lugarNacimiento,
    edad,
    numeroTelefonico,
    institucion,
    rol,
    gradoEscolar,
    materiaAsignada,
  } = req.body;
  try {
    const findUser = await Usuario.findById({ _id: id });
    if (!findUser)
      return res.status(404).json({ msg: "Usuario no encontrado" });

    if (findUser.rol !== "pendiente")
      return res.status(400).json({ msg: "Usuario ya registrado" });

    findUser.set({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoIdentificacion,
      numeroIdentificacion,
      fechaNacimiento,
      lugarNacimiento,
      edad,
      numeroTelefonico,
      institucion,
      rol,
    });

    await findUser.save();

    let usuarioConRol;
    switch (rol) {
      case "estudiante":
        usuarioConRol = await Estudiante.findByIdAndUpdate(
          id,
          { gradoEscolar },
          { new: true }
        );
        break;
      case "docente":
        usuarioConRol = await Docente.findByIdAndUpdate(
          id,
          { materiaAsignada },
          { new: true }
        );
        break;
      default:
        res.status(500).json({ msg: "Rol no existente" });

        break;
    }
    return res.status(200).json({ msg: "Perfil registrado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error: error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await Usuario.find();
    return res
      .status(200)
      .json({ msg: "Usuarios obtenidos con éxtio", data: data });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};
