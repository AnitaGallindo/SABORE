
import dns from "node:dns";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";


dns.setServers(["1.1.1.1", "1.0.0.1"]);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/reservas", reservaRoutes);

// Rota para verificar se o servidor está funcionando.
app.get("/api/status", (req, res) => {
  res.json({ mensagem: "API do Saborê funcionando!" });
});

// Iniciar o servidor depois de conectar ao MongoDB.
async function iniciarServidor() {
  await connectDatabase();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor Saborê rodando na porta ${PORT}`);
  });
}

iniciarServidor();
