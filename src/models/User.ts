// models/Usuario.js
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  primerNombre: String,
  segundoNombre: String,
  primerApellido: String,
  segundoApellido: String,

  tipoIdentificacion: {
    type: String,
    enum: ['CC', 'TI']
  },
  numeroIdentificacion: String,

  fechaNacimiento: {
    dia: Number,
    mes: Number,
    año: Number
  },

  lugarNacimiento: {
    ciudad: String,
    departamento: String
  },

  edad: Number,

  email: {
    type: String,
    unique: true,
    required: true
  },
  contraseña: {
    type: String,
    required: true
  },

  numeroTelefonico: String,

  institucion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institucion'
  },

  rol: {
    type: String,
    enum: ['estudiante', 'docente', 'coordinador', 'pendiente'],
    default: 'pendiente'
  }
}, {
  discriminatorKey: 'rol',
  timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
