import mongoose, { Schema, Document } from "mongoose";



export interface Location {
  city: string;
  department: string;
}

export interface Institucion extends Document {
  nameInstitute: string;
  location: Location;
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
