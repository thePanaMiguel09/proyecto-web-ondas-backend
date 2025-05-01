const mongoose = require("mongoose");

const AvanceSchema = new mongoose.Schema({
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto",
    required: true,
  },
  descripcionAvance: { type: String, required: true },
  documentos: [{ type: String, required: true }],
  Timestamp: true,
});


module.exports = mongoose.model("Avance", AvanceSchema);
