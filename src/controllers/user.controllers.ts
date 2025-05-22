import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/User";
import { Estudiante } from "../models/Estudiante";
import { Docente } from "../models/Docente";

//Completar el registro de datos
export const registrarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    id,
    tipoIdentificacion,
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

    if (findUser.rol !== "PENDIENTE") {
      res.status(400).json({ msg: "Usuario ya registrado" });
      return;
    }

    findUser.set({
      tipoIdentificacion,
      fechaNacimiento,
      lugarNacimiento,
      edad,
      numeroTelefonico,
      institucion,
      rol,
    });

    await findUser.save();

    

    switch (rol) {
      case "ESTUDIANTE":
        await Usuario.findByIdAndUpdate(id, { gradoEscolar }, { new: true });
        break;
      case "DOCENTE":
        await Usuario.findByIdAndUpdate(id, { materiaAsignada }, { new: true });
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

//Obtener todos los usuarios
export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const data = await Usuario.find();
    res.status(200).json({ msg: "Usuarios obtenidos con éxtio", data: data });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};

//Crear súper admin
export const createAdmin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password, nombres, apellidos } = req.body;

  const findedEmail = await Usuario.findOne({ email: email });
  if (findedEmail) {
    res.status(401).json({ msg: "Este correo ya existe" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserAdmin = new Usuario({
    email: email,
    contraseña: hashedPassword,
    nombres: nombres,
    apellidos: apellidos,
    rol: "SUPERADMIN",
  });

  try {
    await newUserAdmin.save();
    res.status(201).json({ msg: "SuperAdmin creado" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//Eliminacion lógica de un usuario, se modifica el estado, se busca el usuario por su docID
export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findOneAndUpdate(
      { numeroIdentificacion: Number(id) },
      { isActive: false },
      {
        new: true,
      }
    );

    if (!user) {
      res.status(400).json({ msg: "No fue posible eliminar el usuario" });
      return;
    }

    res.status(200).json({ msg: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", err: error });
  }
};

export const upDateUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const updated = req.body;

  console.log("ID:", id);
  console.log("Data a actualizar:", updated);

  try {
    const user = await Usuario.findOneAndUpdate(
      { numeroIdentificacion: Number(id) },
      updated,
      { new: true, runValidators: false }
    );

    if (!user) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }
    console.log("Resultado:", user);

    res.status(202).json({ msg: "Usuario actualizado" });
    return;
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
