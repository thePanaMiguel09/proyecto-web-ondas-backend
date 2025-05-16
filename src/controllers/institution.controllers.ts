import { Request, RequestHandler, Response } from "express";
import { Institucion } from "../models/Institucion";

export const createInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, location, id } = req.body;
  try {
    const existInstitution = await Institucion.findOne({ id: id });
    if (existInstitution)
      res.status(403).json({ msg: "La institucion ya existe" });

    const newInstitution = new Institucion({
      nameInstitute: name,
      location,
      id,
    });
    await newInstitution.save();
    res.status(201).json({ msg: "Institucion creada" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getAllInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await Institucion.find();
    if (!data) res.status(204).json({ msg: "No existen instituciones" });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener instituciones" });
  }
};

export const getSingleInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const data = await Institucion.findOne({
      id: Number(id),
    });

    if (!data) {
      res.status(404).json({ msg: "Institución no encontrada" });
    }
    res.status(200).json({ msg: "Institución encontrada", data: data });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener institucio" });
  }
};

export const upDateInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updtes = req.body;

  try {
    const upDated = await Institucion.findOneAndUpdate(
      { id: Number(id) },
      updtes,
      { new: true, runValidators: true }
    );

    if (!upDated) res.status(404).json({ msg: "Institución no encontrada" });
    res.status(200).json(upDated);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar la institución" });
  }
};

export const deleteInstitution: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;

  try {
    if (!(await Institucion.findById(id))) {
      res.status(404).json({ msg: "Institución no encontrada" });
      return;
    }

    await Institucion.findByIdAndUpdate(id, { isActive: false });
    res.status(200).json({ msg: "Institución Eliminada" });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

export const getActiveInstitutions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const institucions = await Institucion.find({ isActive: true });

    if (institucions === null) {
      res.status(404).json({ msg: "No se encontraron instituciones activas" });
      return;
    }

    res.status(200).json({ msg: "Instituciones activas", data: institucions });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
