import mongoose, { Schema, Document } from "mongoose";



export interface Location {
  city: string;
  department: string;
}

export interface Institucion extends Document {
  nameInstitute: string;
  location: Location;
  id: number;
  isActive: boolean;
}


const InstitutionSchema = new Schema<Institucion>({
  nameInstitute: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    city: { type: String, required: true },
    department: { type: String, required: true },
  },
  id: { type: Number, required: true, unique: true },
  isActive: {
    type: Boolean,
    default: true
  }

},
{timestamps: true}
);

export const Institucion = mongoose.model<Institucion>(
  "Institucion",
  InstitutionSchema
);
