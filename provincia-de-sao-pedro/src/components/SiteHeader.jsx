export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Província de São Pedro, início">
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>
          <strong>Província de São Pedro</strong>
          <small>Rio Grande do Sul, Brasil</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Navegação principal">
        <a href="#destinos">Destinos</a>
        <a href="#sobre">Sobre o projeto</a>
      </nav>
    </header>
  );
}
