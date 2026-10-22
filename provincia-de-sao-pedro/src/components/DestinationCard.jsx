export default function DestinationCard({
  destino,
  favorito,
  aoAlternarFavorito,
  aoVerDetalhes,
}) {
  return (
    <article className="destination-card">
      <div className="destination-image-wrap">
        <img
          className="destination-image"
          src={destino.imagem}
          alt={destino.imagemAlt}
          loading="lazy"
        />
        <span className="image-icon" aria-hidden="true">{destino.icone}</span>
        <span className="destination-category">{destino.categoria}</span>
        <button
          className={`favorite-button ${favorito ? "is-favorite" : ""}`}
          type="button"
          aria-label={favorito ? `Remover ${destino.nome} dos favoritos` : `Adicionar ${destino.nome} aos favoritos`}
          aria-pressed={favorito}
          onClick={() => aoAlternarFavorito(destino.id)}
        >
          <span aria-hidden="true">{favorito ? "♥" : "♡"}</span>
        </button>
      </div>
      <div className="destination-copy">
        <p className="destination-location">
          <span aria-hidden="true">⌖</span> {destino.cidade}
        </p>
        <h3>{destino.nome}</h3>
        <p className="destination-summary">{destino.resumo}</p>
        <button
          className="text-link"
          type="button"
          onClick={() => aoVerDetalhes(destino)}
        >
          Descobrir destino <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
