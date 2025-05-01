const mongoose = require("mongoose");
const Usuario = require("./Usuario");

const EstudianteSchema = new mongoose.Schema({
  grado: { type: String, required: true },
  institucion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institucion",
    required: true,
  },
});

module.exports = Usuario.discriminator("ESTUDIANTE", EstudianteSchema);
