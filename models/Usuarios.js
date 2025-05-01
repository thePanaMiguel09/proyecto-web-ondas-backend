const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    primerNombre: { type: String, required: true },
    segundoNombre: { type: String },
    primerApellido: { type: String, required: true },
    segundoApellido: { type: String },
    tipoIdentificacion: {
      type: String,
      enum: ["CC", "TI"],
      required: true,
    },
    numeroIdentificacion: { type: Number, required: true, unique: true },
    fechaNacimiento: { type: Date, required: true },
    lugarNacimiento: {
      ciudad: { type: String, required: true },
      departamento: { type: String, required: true },
    },
    edad: { type: Number, required: true },
    email: { type: String, unique: true, required: true },
    contrasenia: { type: String, required: true },
    numeroTelefono: { type: String, required: true },
    rol: {
      type: String,
      enum: ["ESTUDIANTE", "DOCENTE", "COORDINADOR"],
      required: true,
    },
    institucion: { type: mongoose.Schema.Types.ObjectId, ref: "Institucion" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);
