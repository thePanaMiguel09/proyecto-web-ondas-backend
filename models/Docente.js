const mongoose = require("mongoose");
const Usuario = require("./Usuario");

const DocenteSchema = new mongoose.Schema({
  institucion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institucion",
    required: true,
  },
  areaFormacion: { type: String },
});

module.exports = Usuario.discriminator("DOCENTE", DocenteSchema);
