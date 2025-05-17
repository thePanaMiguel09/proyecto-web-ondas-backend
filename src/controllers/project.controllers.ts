import { Request, Response, RequestHandler } from "express";
import { Proyecto } from "../models/Project";
import { uploadToCloudinary } from "../utils/uploadCloudinary"; // asegúrate de tener esta función implementada
import fs from "fs";

export const createProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
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
    if (alreadyExist) res.status(401).json({ msg: "Proyecto ya existente" });

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
    res.status(500).json({ error });
  }
};

export const createAdvance: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const descripcion = req.body.descripcion;
    const id = req.params.id;
    const file = req.file;

    if (!file) {
      res.status(400).json({ msg: "No se encontró el archivo para subir" });
      return;
    }

    // Verifica que el proyecto exista
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      res.status(404).json({ msg: "Proyecto no encontrado" });
      return;
    }

    // multer-storage-cloudinary pone la URL en file.path o file.url según versión
    // para asegurar, usa file.path o file.secure_url
    const urlAvance = (file as any).path || (file as any).secure_url;

    if (!urlAvance) {
      res.status(500).json({ msg: "Error al obtener la URL de Cloudinary" });
      return;
    }

    // Crea el objeto de avance
    const nuevoAvance = {
      descripcion,
      evidencias: [urlAvance], // arreglo porque el schema lo espera así
      fecha: new Date(),
    };

    // Agrega el avance al proyecto y guarda
    proyecto.avances.push(nuevoAvance);
    await proyecto.save();

    res
      .status(201)
      .json({ msg: "Avance creado con éxito", avance: nuevoAvance });
    return;
  } catch (error) {
    console.error("Error al crear avance:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
    return;
  }
};
