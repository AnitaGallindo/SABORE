
import { Link } from "react-router-dom";

export default function OficinaCard({ oficina }) {
  return (
    <article className="card">
      <p className="eyebrow">{oficina.categoria}</p>

      <h3>{oficina.nome}</h3>

      <p className="muted">{oficina.descricao}</p>

      <p>
        <strong>R$ {oficina.preco.toFixed(2).replace(".", ",")}</strong>
        {" · "}
        {oficina.duracao}
      </p>

      <p>
        <strong>Local:</strong> {oficina.local}
      </p>

      <p>
        <strong>Endereço:</strong> {oficina.endereco}
      </p>

      <Link
        className="button"
        to={`/agendamento/${oficina.id}`}
      >
        Ver horários
      </Link>
    </article>
  );
}
