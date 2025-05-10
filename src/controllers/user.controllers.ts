import { Request, RequestHandler, Response } from "express";
import Usuario from "../models/User";
import { Estudiante } from "../models/Estudiante";
import { Docente } from "../models/Docente";



export const registrarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    const findUser = await Usuario.findById(id);

    if (!findUser) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }

    if (findUser.rol !== "pendiente") {
      res.status(400).json({ msg: "Usuario ya registrado" });
      return;
    }

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

    switch (rol) {
      case "estudiante":
        await Estudiante.findByIdAndUpdate(id, { gradoEscolar }, { new: true });
        break;
      case "docente":
        await Docente.findByIdAndUpdate(id, { materiaAsignada }, { new: true });
        break;
      default:
        res.status(400).json({ msg: "Rol no existente" });
        return;
    }

    res.status(200).json({ msg: "Perfil registrado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const data = await Usuario.find();
    res.status(200).json({ msg: "Usuarios obtenidos con éxtio", data: data });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};
