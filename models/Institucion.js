const mongoose = require("mongoose");

const InstitucionSchema = new mongoose.Schema({
  nombreInstitucional: { type: String, requiered: true },
  ubicacion: {
    ciudad: { type: String, required: true },
    departamento: { type: String, required: true },
  },
});


module.exports = mongoose.Model("Institucion", InstitucionSchema)