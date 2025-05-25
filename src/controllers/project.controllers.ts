import { Request, Response, RequestHandler } from "express";
import { Proyecto } from "../models/Project";

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

export const getAllProjects: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await Proyecto.find()
      .populate("docente", "-contraseña")
      .populate("integrantes", "-contraseña")
      .populate("institucion");

    if (!data || data.length === 0) {
      res.status(404).json({ msg: "No se encontraron proyectos" });
      return;
    }

    res.status(200).json({ msg: "Proyectos", data });
  } catch (error) {
    console.error(error);
    console.error("Error en getAllProjects:", error);

    res.status(500).json({ msg: "Error al obtener proyectos" });
  }
};

export const getSingleProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  try {
    const project = await Proyecto.findOne({ _id: id })
      .populate("docente", "-contraseña")
      .populate("integrantes", "-contraseña")
      .populate("institucion");

    if (!project) {
      res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    res.status(200).json({ msg: "Proyecto", data: project });
    return;
  } catch (error) {
    res.status(500).json({ err: "Error al obtener información del proyecto" });
  }
};

export const updateState: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { nuevoEstado, observacion } = req.body;

  if (!nuevoEstado || !observacion) {
    res.status(400).json({ msg: "Estado y observación son requeridos" });
    return;
  }

  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      res.status(404).json({ msg: "Proyecto no encontrado" });
      return;
    }

    // Guardar en el historial
    proyecto.historialEstados.push({
      estado: nuevoEstado,
      observacion,
      fecha: new Date(),
    });

    // Actualizar estado actual
    proyecto.estadoActual = nuevoEstado;

    await proyecto.save();

    res.status(200).json({ msg: "Estado actualizado", proyecto });
    return;
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentState: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      res.status(404).json({ msg: "Proyecto no encontrado" });
      return;
    }

    res.status(200).json({
      estadoActual: proyecto.estadoActual,
      historial: proyecto.historialEstados,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener estado del proyecto" });
  }
};


