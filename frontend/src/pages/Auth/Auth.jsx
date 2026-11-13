import { useState } from "react";
import { apiRequest } from "../../services/api.js";

export default function Auth() {
  const [modo, setModo] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(event) {
    event.preventDefault();

    setMensagem("");
    setCarregando(true);

    try {
      if (modo === "cadastro") {
        const dados = await apiRequest("/usuarios/cadastro", {
          method: "POST",
          body: JSON.stringify({
            nome,
            email,
            senha,
          }),
        });

        setMensagem(dados.mensagem);
        setModo("login");
        setSenha("");
        setNome("");
      } else {
        const dados = await apiRequest("/usuarios/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            senha,
          }),
        });

        localStorage.setItem("token", dados.token);
        localStorage.setItem(
          "usuario",
          JSON.stringify(dados.usuario)
        );

        setMensagem(dados.mensagem);
        setSenha("");
      }
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="page">
      <p className="eyebrow">Bem-vindo ao Saborê</p>

      <h1>
        {modo === "login"
          ? "Entrar na sua conta"
          : "Criar conta"}
      </h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button
          className={`button ${modo !== "login" ? "secondary" : ""}`}
          onClick={() => {
            setModo("login");
            setMensagem("");
          }}
        >
          Login
        </button>

        <button
          className={`button ${modo !== "cadastro" ? "secondary" : ""}`}
          onClick={() => {
            setModo("cadastro");
            setMensagem("");
          }}
        >
          Cadastro
        </button>
      </div>

      <form onSubmit={enviar}>
        {modo === "cadastro" && (
          <label>
            Nome completo
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>
        )}

        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength="6"
          />
        </label>

        <button
          className="button"
          type="submit"
          disabled={carregando}
        >
          {carregando
            ? "Aguarde..."
            : modo === "login"
              ? "Entrar"
              : "Cadastrar"}
        </button>
      </form>

      {mensagem && (
        <div className="notice">{mensagem}</div>
      )}
    </section>
  );
}