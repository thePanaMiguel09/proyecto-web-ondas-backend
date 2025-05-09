// models/Estudiante.js
import mongoose from "mongoose";
import Usuario from "./User";

const estudianteSchema = new mongoose.Schema({
  gradoEscolar: {
    type: String,
    required: false,
  },
});

export const Estudiante = Usuario.discriminator("estudiante", estudianteSchema);
 