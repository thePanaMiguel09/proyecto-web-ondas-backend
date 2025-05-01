const mongoose = require("mongoose");

const ProyectoSchema = new mongoose.Schema({
  tituloProyecto: { type: String, required: true },
  area: { type: String, required: true },
  objetivos: [{ type: String, required: true }],
  docenteResponsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Docente",
    required: true,
  },
  institucionAsociada: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institucion",
    required: true,
  },
  presupuesto: { type: Number, required: true },
  cronograma: {
    titulo: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    responsable: { type: String },
    estado: {
      type: String,
      enum: ["pendiente", "en proceso", "finalizado"],
      default: "pendiente",
    },
    observacionesCronograma: { type: String },
  },
  integrantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estudiante",
      required: true,
    },
  ],
  obervaciones: [{ type: String, required: true }],
  estadoActual: {
    type: String,
    enum: ["Formulacion", "Evaluacion", "Activo", "Inactivo", "Finalizado"],
  },
});


module.exports = mongoose.Model("Proyecto", ProyectoSchema) 