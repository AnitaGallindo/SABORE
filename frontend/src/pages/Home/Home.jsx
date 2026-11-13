import { Link } from "react-router-dom";
import { oficinas } from "../../data/oficinas.js";
import OficinaCard from "../../components/OficinaCard/OficinaCard.jsx";
import "./Home.css";

export default function Home() {
  return (
    <section className="home-page">

      {/* Seção principal */}
      <div className="home-hero">

        <div className="home-hero-content">

          <p className="eyebrow">
            Cozinhar também é descobrir
          </p>

          <h1>
            Nova experiência
            <br />
            começa na <span>mesa.</span>
          </h1>

          <p className="home-description">
            Encontre oficinas gastronômicas, aprenda novas receitas
            e viva experiências na cozinha.
          </p>

          <Link className="home-button" to="/oficinas">
            Explorar oficinas
            <span>→</span>
          </Link>

        </div>

        <img
          className="home-hero-image"
          src="/images/Natureza-morta minimalista com faca e trigo.png"
          alt="Faca de cozinha sobre farinha e trigo"
        />

      </div>

      {/* Oficinas em destaque */}
      <div className="home-featured">

        <h2>
          <span className="featured-line"></span>
          Experiências em destaque
        </h2>

        <div className="grid">
          {oficinas.slice(0, 2).map((oficina) => (
            <OficinaCard
              key={oficina.id}
              oficina={oficina}
            />
          ))}
        </div>

      </div>

    </section>
  );
}