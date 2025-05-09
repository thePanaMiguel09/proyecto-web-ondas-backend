import { Request, Response } from "express";
import { Docente } from "../models/Docente";

export const createDocente = async (req: Request, res: Response) => {
  const {
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    numberId,
    typeId,
    cellphone,
    age,
    dateBorned,
    placeBorned,
    institution,
  } = req.body;

  try {
    const alreadyExist = await Docente.findOne({ numberId: Number(numberId) });
    if (alreadyExist) return res.status(401).json({ msg: "Docente ya existe" });

    const newDocente = new Docente({
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      numberId,
      typeId,
      cellphone,
      age,
      dateBorned,
      placeBorned,
      institution,
    });

    await newDocente.save();
    res.status(201).json({ msg: "Usuario Registrado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar" });
  }
};
