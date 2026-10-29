import { Link } from "react-router-dom";

export default function DestinationCard({
  destino,
  favorito,
  aoAlternarFavorito,
  noRoteiro,
  aoAdicionarAoRoteiro,
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
        <Link className="text-link" to={`/destinos/${destino.id}`}>
          Descobrir destino <span aria-hidden="true">→</span>
        </Link>
        <button
          className="itinerary-add"
          type="button"
          disabled={noRoteiro}
          onClick={() => aoAdicionarAoRoteiro(destino)}
        >
          {noRoteiro ? "Adicionado ao roteiro" : "Adicionar ao roteiro"}
        </button>
      </div>
    </article>
  );
}
