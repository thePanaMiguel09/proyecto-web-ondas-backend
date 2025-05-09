// models/Estudiante.js
import mongoose from "mongoose";
import Usuario from "./User";

const estudianteSchema = new mongoose.Schema({
  gradoEscolar: {
    type: String,
    required: false,
  },
});

const Estudiante = Usuario.discriminator("estudiante", estudianteSchema);
export default Estudiante;