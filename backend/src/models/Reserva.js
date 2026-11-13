
import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    oficinaId: {
      type: String,
      required: true,
    },

    oficinaNome: {
      type: String,
      required: true,
    },

    data: {
      type: String,
      required: true,
    },

    horario: {
      type: String,
      required: true,
    },

    participantes: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },

    valorTotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reserva = mongoose.model("Reserva", reservaSchema);

export default Reserva;
