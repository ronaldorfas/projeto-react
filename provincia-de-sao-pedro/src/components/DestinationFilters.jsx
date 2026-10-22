export default function DestinationFilters({
  busca,
  aoBuscar,
  categoriaSelecionada,
  categorias,
  aoSelecionarCategoria,
  somenteFavoritos,
  aoAlternarFavoritos,
}) {
  return (
    <div className="filters">
      <label className="search-field">
        <span className="sr-only">Buscar por destino, cidade ou categoria</span>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          value={busca}
          onChange={(event) => aoBuscar(event.target.value)}
          placeholder="Busque um lugar, cidade ou experiência"
        />
      </label>

      <div className="filter-row">
        <div className="category-list" aria-label="Filtrar por categoria">
          {categorias.map((categoria) => (
            <button
              className={`filter-chip ${categoriaSelecionada === categoria ? "is-active" : ""}`}
              type="button"
              key={categoria}
              aria-pressed={categoriaSelecionada === categoria}
              onClick={() => aoSelecionarCategoria(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
        <button
          className={`favorites-filter ${somenteFavoritos ? "is-active" : ""}`}
          type="button"
          aria-pressed={somenteFavoritos}
          onClick={aoAlternarFavoritos}
        >
          <span aria-hidden="true">♥</span>
          Favoritos
        </button>
      </div>
    </div>
  );
}
