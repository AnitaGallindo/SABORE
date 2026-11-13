
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  }

  return (
    <header className="header">
      <Link className="brand" to="/">
  Saborê
</Link>

      <nav>
        <NavLink to="/">Início</NavLink>

        <NavLink to="/oficinas">Oficinas</NavLink>

        <NavLink to="/minhas-reservas">
          Minhas reservas
        </NavLink>

        {token ? (
          <button
            className="login-link"
            type="button"
            onClick={sair}
          >
            Sair
          </button>
        ) : (
          <NavLink className="login-link" to="/login">
            Entrar
          </NavLink>
        )}
      </nav>
    </header>
  );
}
