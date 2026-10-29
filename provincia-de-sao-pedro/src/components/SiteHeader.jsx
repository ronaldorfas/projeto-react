import { NavLink } from "react-router-dom";

export default function SiteHeader({ quantidadeFavoritos }) {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Província de São Pedro, início">
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>
          <strong>Província de São Pedro</strong>
          <small>Rio Grande do Sul, Brasil</small>
        </span>
      </NavLink>

      <nav className="main-nav" aria-label="Navegação principal">
        <NavLink to="/destinos">Destinos</NavLink>
        <NavLink to="/favoritos">Favoritos ({quantidadeFavoritos})</NavLink>
        <NavLink to="/roteiro">Meu roteiro</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
      </nav>
    </header>
  );
}
