import { Request, Response } from "express";
import { Estudiante } from "../models/Estudiante";

export const createStudent = async (req: Request, res: Response) => {
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
    grade,
  } = req.body;

  

  try {
    const userExist = await Estudiante.findOne({
        numberId: Number(numberId)
      })
    
      if (userExist) return res.status(401).json({msg:"Usuario ya existente"});
    
      const newUser = new Estudiante({firstName,
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
        grade});
      await newUser.save()
      res.status(201).json({msg: "Usuario Registrado"});
  } catch (error) {
    res.status(500).json({msg: "Error al registrar"});

  }
};
