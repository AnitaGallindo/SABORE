
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { oficinas } from "../../data/oficinas.js";
import "./Agendamento.css";

export default function Agendamento() {
  const { oficinaId } = useParams();
  const navigate = useNavigate();

  const oficina = oficinas.find((item) => item.id === oficinaId);

  const [data, setData] = useState("");
  const [horario, setHorario] = useState("14:00");
  const [participantes, setParticipantes] = useState(1);
  const [mensagem, setMensagem] = useState("");

  const valorTotal = oficina ? oficina.preco * participantes : 0;

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function prosseguirParaPagamento(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMensagem("Faça login para continuar com sua reserva.");
      return;
    }

    if (!data) {
      setMensagem("Selecione uma data para continuar.");
      return;
    }

    // Guarda os dados temporariamente até a confirmação simulada.
    sessionStorage.setItem(
      "reservaPendente",
      JSON.stringify({
        oficinaId: oficina.id,
        oficinaNome: oficina.nome,
        data,
        horario,
        participantes,
        valorTotal,
      })
    );

    navigate("/pagamento");
  }

  if (!oficina) {
    return (
      <section className="agendamento-page">
        <div className="agendamento-container">
          <h1>Oficina não encontrada</h1>
          <p>Volte ao catálogo e escolha uma oficina disponível.</p>

          <Link className="button" to="/oficinas">
            Ver oficinas
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="agendamento-page">
      <div className="agendamento-container">
        <h1 className="agendamento-title">Agendar oficina</h1>

        <div className="agendamento-card">
          <div className="oficina-resumo">
            <h2>{oficina.nome}</h2>

            <p>{oficina.descricao}</p>

            <p className="oficina-local">
              <strong>Local:</strong> {oficina.endereco}
            </p>

            <p className="oficina-preco">
              <strong>{formatarMoeda(oficina.preco)}</strong>{" "}
              por participante
            </p>
          </div>

          <div className="agendamento-layout">
            <form
              className="agendamento-form"
              onSubmit={prosseguirParaPagamento}
            >
              <label className="agendamento-label">
                Data

                <div className="campo-data">
                  <input
                    type="date"
                    value={data}
                    min={new Date().toLocaleDateString("en-CA")}
                    onChange={(event) => setData(event.target.value)}
                    required
                  />

                  <svg
                    className="calendario-icone"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M7 3V7M17 3V7M3 10H21"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </label>

              <label className="agendamento-label">
                Horário

                <div className="campo-horario">
                  <span className="campo-icone">◷</span>

                  <select
                    value={horario}
                    onChange={(event) => setHorario(event.target.value)}
                  >
                    <option value="09:00">09:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                  </select>

                  <span className="select-seta"></span>
                </div>
              </label>

              <div className="agendamento-label">
                Quantidade de participantes

                <div className="participantes-controle">
                  <button
                    type="button"
                    className="participantes-botao"
                    onClick={() =>
                      setParticipantes((atual) =>
                        Math.max(1, atual - 1)
                      )
                    }
                    disabled={participantes <= 1}
                    aria-label="Diminuir participantes"
                  >
                    −
                  </button>

                  <span className="participantes-valor">
                    {participantes}
                  </span>

                  <button
                    type="button"
                    className="participantes-botao"
                    onClick={() =>
                      setParticipantes((atual) =>
                        Math.min(4, atual + 1)
                      )
                    }
                    disabled={participantes >= 4}
                    aria-label="Aumentar participantes"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="agendamento-total">
                <h2>Total: {formatarMoeda(valorTotal)}</h2>

                <button className="agendamento-button" type="submit">
                  Prosseguir para pagamento <span>→</span>
                </button>
              </div>

              {mensagem && (
                <div className="agendamento-mensagem">
                  {mensagem}

                  {!localStorage.getItem("token") && (
                    <Link to="/login"> Entrar</Link>
                  )}
                </div>
              )}
            </form>

            <div
              className="agendamento-ilustracao"
              aria-hidden="true"
            >
              <img
                src="/images/fouet-tigela.png"
                alt="Fouet dentro de uma tigela"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
