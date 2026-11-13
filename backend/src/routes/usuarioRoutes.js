import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Rota de login do usuário.
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "Informe seu e-mail e sua senha.",
      });
    }

    const usuario = await Usuario.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!usuario) {
      return res.status(401).json({
        mensagem: "E-mail ou senha incorretos.",
      });
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: "E-mail ou senha incorretos.",
      });
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });

  } catch (error) {
    console.error("Erro ao realizar login:", error);

    return res.status(500).json({
      mensagem: "Erro ao realizar login.",
    });
  }
});

// Rota de cadastro de usuário.
router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos.",
      });
    }

   const emailNormalizado = email.trim().toLowerCase();

    const usuarioExistente = await Usuario.findOne({
    email: emailNormalizado,
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensagem: "Este e-mail já está cadastrado.",
      });
    }

    const novoUsuario = await Usuario.create({
    nome,
    email: emailNormalizado,
    senha,
    });


    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar usuário.",
    });
  }
});

export default router;