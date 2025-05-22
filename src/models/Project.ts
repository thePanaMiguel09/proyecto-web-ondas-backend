// models/Proyecto.ts
import mongoose, { Schema, Document } from "mongoose";

interface Avance {
  descripcion: string;
  fecha: Date;
  evidencias: string[];
}

export interface Project extends Document {
  titulo: string;
  area: string;
  objetivos: string;
  cronograma: string;
  presupuesto: number;
  institucion: mongoose.Types.ObjectId;
  docente: mongoose.Types.ObjectId;
  integrantes: mongoose.Types.ObjectId[];
  observaciones?: string;
  estadoActual: string;
  avances: Avance[];
  historialEstados: Object[];
}

const ProyectoSchema = new Schema<Project>(
  {
    titulo: { type: String, required: true },
    area: { type: String, required: true },
    objetivos: { type: String, required: true },
    cronograma: { type: String, required: true },
    presupuesto: { type: Number, required: true },

    institucion: {
      type: Schema.Types.ObjectId,
      ref: "Institucion",
      required: true,
    },

    docente: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    integrantes: {
      type: [Schema.Types.ObjectId],
      ref: "Usuario",
      required: true,
    },

    observaciones: {
      type: String,
    },

    estadoActual: {
      type: String,
      required: true,
      enum: ["Formulación", "Evaluación", "Activo", "Inactivo", "Finalizado"],
      default: "Formulación",
    },
    avances: [
      {
        descripcion: { type: String, required: true },
        fecha: { type: Date, default: Date.now },
        evidencias: [{ type: String }],
      },
    ],
    historialEstados: [
      {
        estado: {
          type: String,
          enum: [
            "Formulación",
            "Evaluación",
            "Activo",
            "Inactivo",
            "Finalizado",
          ],
          required: true,
        },
        observacion: {
          type: String,
          required: true,
        },
        fecha: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Proyecto = mongoose.model<Project>("Proyecto", ProyectoSchema);
