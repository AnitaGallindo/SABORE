
import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api.js";
import { oficinas } from "../../data/oficinas.js";

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function buscarReservas() {
      const token = localStorage.getItem("token");

      if (!token) {
        setMensagem("Faça login para visualizar suas reservas.");
        setCarregando(false);
        return;
      }

      try {
        const dados = await apiRequest("/reservas", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReservas(dados);
      } catch (error) {
        setMensagem(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarReservas();
  }, []);

  return (
    <section className="page">
      <p className="eyebrow">Sua área</p>
      <h1>Minhas reservas</h1>

      {carregando && <p>Carregando suas reservas...</p>}

      {!carregando && mensagem && (
        <div className="notice">{mensagem}</div>
      )}

      {!carregando && !mensagem && reservas.length === 0 && (
        <div className="card">
          <h3>Você ainda não tem reservas</h3>
          <p className="muted">
            Quando você confirmar uma oficina, os detalhes aparecerão aqui.
          </p>
        </div>
      )}

      {!carregando && reservas.map((reserva) => {
        const oficina = oficinas.find(
          (item) => item.id === reserva.oficinaId
        );

        return (
          <div className="card" key={reserva._id}>
            <h3>{reserva.oficinaNome}</h3>

            <p>
              <strong>Local:</strong>{" "}
              {oficina?.local || "Ateliê Saborê"}
            </p>

            <p>
              <strong>Endereço:</strong>{" "}
              {oficina?.endereco || "Espaço demonstrativo - Recife, PE"}
            </p>

            <p>
              <strong>Data:</strong>{" "}
              {new Date(
                `${reserva.data}T00:00:00`
              ).toLocaleDateString("pt-BR")}
            </p>

            <p>
              <strong>Horário:</strong> {reserva.horario}
            </p>

            <p>
              <strong>Participantes:</strong> {reserva.participantes}
            </p>

            <p>
              <strong>Valor total:</strong>{" "}
              R$ {reserva.valorTotal.toFixed(2).replace(".", ",")}
            </p>
          </div>
        );
      })}
    </section>
  );
}
