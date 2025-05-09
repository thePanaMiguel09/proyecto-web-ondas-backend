// models/Docente.js
import Usuario from "./User";
import mongoose from "mongoose";

const docenteSchema = new mongoose.Schema({
  materiaAsignada: {
    type: String,
    required: false,
  },
});

export const Docente = Usuario.discriminator("docente", docenteSchema);
 