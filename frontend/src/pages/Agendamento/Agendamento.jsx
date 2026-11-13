
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { oficinas } from "../../data/oficinas.js";
import { apiRequest } from "../../services/api.js";
import "./Agendamento.css";

export default function Agendamento() {
  const { oficinaId } = useParams();
  const oficina = oficinas.find((item) => item.id === oficinaId);

  const [data, setData] = useState("");
  const [horario, setHorario] = useState("14:00");
  const [participantes, setParticipantes] = useState(1);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  const valorTotal = oficina ? oficina.preco * participantes : 0;

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function confirmarReserva(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMensagem("Faça login para realizar sua reserva.");
      return;
    }

    setMensagem("");
    setCarregando(true);

    try {
      const dados = await apiRequest("/reservas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oficinaId: oficina.id,
          oficinaNome: oficina.nome,
          data,
          horario,
          participantes,
          valorTotal,
        }),
      });

      setReservaConfirmada(dados.reserva);
      setMensagem(dados.mensagem);
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setCarregando(false);
    }
  }

  if (!oficina) {
    return (
      <section className="page">
        <h1>Oficina não encontrada</h1>
        <p>Volte ao catálogo e escolha uma oficina disponível.</p>

        <Link className="button" to="/oficinas">
          Ver oficinas
        </Link>
      </section>
    );
  }

  if (reservaConfirmada) {
    return (
      <section className="agendamento-page">
        <div className="confirmacao-container">
          <p className="eyebrow">
            Sua experiência está garantida
          </p>

          <h1>Reserva confirmada!</h1>

          <div className="confirmacao-aviso">
            {mensagem}
          </div>

          <div className="confirmacao-card">
            <h2>Detalhes da sua reserva</h2>

            <p>
              <strong>Oficina:</strong>{" "}
              {reservaConfirmada.oficinaNome}
            </p>

            <p>
              <strong>Local:</strong> {oficina.endereco}
            </p>

            <p>
              <strong>Data:</strong>{" "}
              {new Date(
                `${reservaConfirmada.data}T00:00:00`
              ).toLocaleDateString("pt-BR")}
            </p>

            <p>
              <strong>Horário:</strong>{" "}
              {reservaConfirmada.horario}
            </p>

            <p>
              <strong>Participantes:</strong>{" "}
              {reservaConfirmada.participantes}
            </p>

            <p>
              <strong>Valor total:</strong>{" "}
              {formatarMoeda(reservaConfirmada.valorTotal)}
            </p>
          </div>

          <Link
            className="agendamento-button"
            to="/minhas-reservas"
          >
            Ver minhas reservas <span>→</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="agendamento-page">
      <div className="agendamento-container">

        <h1 className="agendamento-title">
          Agendar oficina
        </h1>

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
              onSubmit={confirmarReserva}
            >

              {/* CAMPO DATA */}
              <label className="agendamento-label">
                Data

                <div className="campo-data">
                  <input
                    type="date"
                    value={data}
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

              {/* CAMPO HORÁRIO */}
              <label className="agendamento-label">
                Horário

                <div className="campo-horario">
                  <span className="campo-icone">◷</span>

                  <select
                    value={horario}
                    onChange={(event) =>
                      setHorario(event.target.value)
                    }
                  >
                    <option value="09:00">09:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                  </select>

                  <span className="select-seta"></span>
                </div>
              </label>

              {/* QUANTIDADE DE PARTICIPANTES */}
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

              {/* VALOR TOTAL E CONFIRMAÇÃO */}
              <div className="agendamento-total">
                <h2>
                  Total: {formatarMoeda(valorTotal)}
                </h2>

                <button
                  className="agendamento-button"
                  type="submit"
                  disabled={carregando}
                >
                  {carregando
                    ? "Salvando reserva..."
                    : "Prosseguir para confirmação"}

                  <span>→</span>
                </button>
              </div>

              {mensagem && (
                <div className="agendamento-mensagem">
                  {mensagem}

                  {!localStorage.getItem("token") && (
                    <Link to="/login">Entrar</Link>
                  )}
                </div>
              )}

            </form>

            {/* IMAGEM DO FOUET */}
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
