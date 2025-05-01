const mongoose = require("mongoose");
const Usuario = require("./Usuario");

const CoordinadorSchema = new mongoose.Schema({
  cargo: { type: String, required: false },
});

module.exports = Usuario.discriminator("COORDINADOR", CoordinadorSchema);
