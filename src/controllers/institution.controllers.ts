import { Request, Response } from "express";
import { Institucion } from "../models/Institucion";

export const createInstitution = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, location, id } = req.body;
  try {
    const existInstitution = await Institucion.findOne({ id: id });
    if (existInstitution)
      return res.status(403).json({ msg: "La institucion ya existe" });

    const newInstitution = new Institucion({
      nameInstitute: name,
      location,
      id,
    });
    await newInstitution.save();
    return res.status(201).json({ msg: "Institucion creada" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getAllInstitution = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = await Institucion.find();
    if (!data) return res.status(204).json({ msg: "No existen instituciones" });
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener instituciones" });
  }
};

export const getSingleInstitution = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const data = await Institucion.findOne({
      id: Number(id),
    });

    if (!data)
      return res.status(404).json({ msg: "Institución no encontrada" });
    return res.status(200).json({ msg: "Institución encontrada", data: data });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener institucio" });
  }
};

export const upDateInstitution = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const updtes = req.body;

  try {
    const upDated = await Institucion.findOneAndUpdate(
      { id: Number(id) },
      updtes,
      { new: true, runValidators: true }
    );

    if (!upDated)
      return res.status(404).json({ msg: "Institución no encontrada" });
    return res.status(200).json(upDated);
  } catch (error) {
    return res.status(500).json({ msg: "Error al actualizar la institución" });
  }
};
