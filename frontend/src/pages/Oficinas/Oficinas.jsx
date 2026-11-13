import { oficinas } from "../../data/oficinas.js";
import OficinaCard from "../../components/OficinaCard/OficinaCard.jsx";

export default function Oficinas() {
  // Exibir o catálogo completo.
  // Próxima etapa: buscar os dados usando oficinaService e mostrar carregamento/erro.
  return (
    <section className="page">
      <p className="eyebrow">Encontre sua próxima experiência</p>
      <h1>Nossas oficinas</h1>
      <p className="muted">Escolha uma experiência e consulte as próximas datas disponíveis.</p>
      <div className="grid">
        {oficinas.map((oficina) => <OficinaCard key={oficina.id} oficina={oficina} />)}
      </div>
    </section>
  );
}