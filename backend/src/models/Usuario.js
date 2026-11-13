import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    senha: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Criptografar a senha antes de salvar o usuário.
usuarioSchema.pre("save", async function () {
  if (!this.isModified("senha")) return;

  const salt = await bcrypt.genSalt(10);
 this.senha = await bcrypt.hash(this.senha, salt);
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;