// models/Coordinador.js
import Usuario from "./User";
import mongoose from "mongoose";

const coordinadorSchema = new mongoose.Schema({
 
});

const Coordinador = Usuario.discriminator('coordinador', coordinadorSchema);
export default Coordinador;