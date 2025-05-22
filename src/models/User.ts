// models/Usuario.js
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    tipoIdentificacion: {
      type: String,
      enum: ["CC", "TI"],
    },
    numeroIdentificacion: { type: String, unique: true, required:false},

    fechaNacimiento: {
      dia: Number,
      mes: Number,
      año: Number,
    },

    lugarNacimiento: {
      ciudad: String,
      departamento: String,
    },

    edad: Number,

    email: {
      type: String,
      unique: true,
      required: true,
    },
    contraseña: {
      type: String,
      required: true,
    },

    numeroTelefonico: String,

    institucion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institucion",
    },

    rol: {
      type: String,
      enum: ["ESTUDIANTE", "DOCENTE", "COORDINADOR", "PENDIENTE", "SUPERADMIN"],
      default: "PENDIENTE",
    },
    gradoEscolar: {
      type: String,
      required: false,
    },
    materiaAsignada: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
