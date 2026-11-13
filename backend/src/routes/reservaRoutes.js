
import express from "express";
import Reserva from "../models/Reserva.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Verificar se o usuário está autenticado.
function autenticarUsuario(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      mensagem: "Faça login para realizar uma reserva.",
    });
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = dados.id;
    next();
  } catch (error) {
    return res.status(401).json({
      mensagem: "Sessão inválida. Faça login novamente.",
    });
  }
}

// Salvar uma nova reserva.
router.post("/", autenticarUsuario, async (req, res) => {
  try {
    const {
      oficinaId,
      oficinaNome,
      data,
      horario,
      participantes,
      valorTotal,
    } = req.body;

    if (
      !oficinaId ||
      !oficinaNome ||
      !data ||
      !horario ||
      !participantes ||
      valorTotal === undefined
    ) {
      return res.status(400).json({
        mensagem: "Preencha todos os dados da reserva.",
      });
    }

    const novaReserva = await Reserva.create({
      usuario: req.usuarioId,
      oficinaId,
      oficinaNome,
      data,
      horario,
      participantes,
      valorTotal,
    });

    return res.status(201).json({
      mensagem: "Reserva realizada com sucesso!",
      reserva: novaReserva,
    });
  } catch (error) {
    console.error("Erro ao salvar reserva:", error);

    return res.status(500).json({
      mensagem: "Erro ao realizar reserva.",
    });
  }
});

// Buscar as reservas do usuário conectado.
router.get("/", autenticarUsuario, async (req, res) => {
  try {
    const reservas = await Reserva.find({
      usuario: req.usuarioId,
    }).sort({ createdAt: -1 });

    return res.status(200).json(reservas);
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);

    return res.status(500).json({
      mensagem: "Erro ao buscar reservas.",
    });
  }
});

export default router;
