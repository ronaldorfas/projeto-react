export default function DestinationDetails({ destino, aoFechar }) {
  if (!destino) return null;

  return (
    <section className="destination-details" aria-live="polite" aria-labelledby="details-title">
      <div>
        <p className="eyebrow">Em destaque · {destino.cidade}</p>
        <h3 id="details-title">{destino.nome}</h3>
        <p>{destino.descricao}</p>
      </div>
      <button className="details-close" type="button" onClick={aoFechar}>
        Fechar <span aria-hidden="true">×</span>
      </button>
    </section>
  );
}
