import { Request, Response, RequestHandler } from "express";
import { Proyecto } from "../models/Project";

export const createProject:RequestHandler = async (req: Request, res: Response) => {
  const {
    titulo,
    area,
    objetivos,
    cronograma,
    presupuesto,
    institucion,
    docente,
    integrantes,
    observaciones,
    estadoActual,
    id,
  } = req.body;

  try {
    const alreadyExist = await Proyecto.findOne({ id: Number(id) });
    if (alreadyExist)
       res.status(401).json({ msg: "Proyecto ya existente" });

    const newProyecto = new Proyecto({
      titulo,
      area,
      objetivos,
      cronograma,
      presupuesto,
      institucion,
      docente,
      integrantes,
      observaciones,
      estadoActual,
      id,
    });

    await newProyecto.save();

     res.status(201).json("Proyecto Creado");
  } catch (error) {
     res.status(500).json({error});
  }
};
