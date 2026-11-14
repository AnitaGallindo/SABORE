
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { oficinas } from "../../data/oficinas.js";
import { apiRequest } from "../../services/api.js";
import "./Pagamento.css";

export default function Pagamento() {
  const navigate = useNavigate();

  const [reservaPendente] = useState(() =>
    JSON.parse(sessionStorage.getItem("reservaPendente") || "null")
  );

  const [metodo, setMetodo] = useState("pix");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  const oficina = oficinas.find(
    (item) => item.id === reservaPendente?.oficinaId
  );

  function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function confirmarPagamento() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!reservaPendente) {
      setMensagem("Não encontramos uma reserva pendente. Volte ao agendamento.");
      return;
    }

    try {
      setCarregando(true);
      setMensagem("");

      const resposta = await apiRequest("/reservas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservaPendente),
      });

      setReservaConfirmada(resposta.reserva);
      sessionStorage.removeItem("reservaPendente");
    } catch (erro) {
      setMensagem(erro.message || "Não foi possível confirmar sua reserva.");
    } finally {
      setCarregando(false);
    }
  }

  if (reservaConfirmada) {
    return (
      <section className="pagamento-page">
        <div className="pagamento-container">
          <div className="pagamento-card pagamento-sucesso">
            <span className="pagamento-selo">✓</span>
            <h1>Pagamento confirmado!</h1>
            <p>Sua reserva no Saborê foi realizada com sucesso.</p>

            <div className="pagamento-resumo">
              <p><strong>Oficina:</strong> {reservaConfirmada.oficinaNome}</p>
              <p><strong>Data:</strong> {reservaConfirmada.data}</p>
              <p><strong>Horário:</strong> {reservaConfirmada.horario}</p>
              <p><strong>Participantes:</strong> {reservaConfirmada.participantes}</p>
              <p><strong>Total:</strong> {formatarMoeda(reservaConfirmada.valorTotal)}</p>
              <p><strong>Local:</strong> {oficina?.endereco || "Ateliê Saborê — Recife, PE"}</p>
            </div>

            <p className="pagamento-aviso">
              Esta foi uma confirmação de pagamento simulada para fins acadêmicos.
              Nenhuma cobrança real foi realizada.
            </p>

            <Link to="/minhas-reservas" className="pagamento-botao">
              Ver minhas reservas
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!reservaPendente) {
    return (
      <section className="pagamento-page">
        <div className="pagamento-container">
          <div className="pagamento-card">
            <h1>Nenhuma reserva encontrada</h1>
            <p>Escolha uma oficina antes de prosseguir para o pagamento.</p>
            <Link to="/oficinas" className="pagamento-botao">
              Ver oficinas
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pagamento-page">
      <div className="pagamento-container">
        <h1 className="pagamento-titulo">Finalizar pagamento</h1>

        <div className="pagamento-card">
          <div className="pagamento-resumo">
            <h2>Resumo da reserva</h2>
            <p><strong>Oficina:</strong> {reservaPendente.oficinaNome}</p>
            <p><strong>Data:</strong> {reservaPendente.data}</p>
            <p><strong>Horário:</strong> {reservaPendente.horario}</p>
            <p><strong>Participantes:</strong> {reservaPendente.participantes}</p>
            <p className="pagamento-total">
              Total: {formatarMoeda(reservaPendente.valorTotal)}
            </p>
          </div>

          <div className="pagamento-metodos">
            <h2>Escolha a forma de pagamento</h2>

            <label className={`pagamento-opcao ${metodo === "pix" ? "selecionado" : ""}`}>
              <input
                type="radio"
                name="metodo"
                value="pix"
                checked={metodo === "pix"}
                onChange={(event) => setMetodo(event.target.value)}
              />
              <span>Pix</span>
              <small>Pagamento simulado</small>
            </label>

            <label className={`pagamento-opcao ${metodo === "cartao" ? "selecionado" : ""}`}>
              <input
                type="radio"
                name="metodo"
                value="cartao"
                checked={metodo === "cartao"}
                onChange={(event) => setMetodo(event.target.value)}
              />
              <span>Cartão</span>
              <small>Pagamento simulado</small>
            </label>
          </div>

          <p className="pagamento-aviso">
            Ambiente acadêmico: esta etapa é apenas uma simulação.
            Não informe dados bancários ou de cartão.
          </p>

          {mensagem && <p className="pagamento-mensagem">{mensagem}</p>}

          <button
            type="button"
            className="pagamento-botao"
            onClick={confirmarPagamento}
            disabled={carregando}
          >
            {carregando ? "Confirmando..." : "Confirmar pagamento"}
          </button>

          <Link to={`/agendamento/${reservaPendente.oficinaId}`} className="pagamento-voltar">
            Voltar ao agendamento
          </Link>
        </div>
      </div>
    </section>
  );
}
