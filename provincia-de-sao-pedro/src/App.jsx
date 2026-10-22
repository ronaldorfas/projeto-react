import { useState } from "react";
import DestinationCard from "./components/DestinationCard.jsx";
import DestinationDetails from "./components/DestinationDetails.jsx";
import DestinationFilters from "./components/DestinationFilters.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import { atracoes, categorias } from "./data/atracoes.js";

export default function App() {
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [favoritos, setFavoritos] = useState([]);
  const [somenteFavoritos, setSomenteFavoritos] = useState(false);
  const [destinoSelecionado, setDestinoSelecionado] = useState(null);

  const termo = busca.trim().toLocaleLowerCase("pt-BR");
  const destinosFiltrados = atracoes.filter((destino) => {
    const correspondeBusca = [
      destino.nome,
      destino.cidade,
      destino.categoria,
      destino.resumo,
    ].some((texto) => texto.toLocaleLowerCase("pt-BR").includes(termo));
    const correspondeCategoria =
      categoriaSelecionada === "Todas" || destino.categoria === categoriaSelecionada;
    const correspondeFavoritos =
      !somenteFavoritos || favoritos.includes(destino.id);

    return correspondeBusca && correspondeCategoria && correspondeFavoritos;
  });

  function alternarFavorito(id) {
    setFavoritos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((favoritoId) => favoritoId !== id)
        : [...atuais, id],
    );
  }

  return (
    <>
      <SiteHeader />
      <main id="inicio">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow"><span aria-hidden="true">✳</span> Um estado, muitos caminhos</p>
            <h1>O Rio Grande do Sul<br /><em>espera por você.</em></h1>
            <p className="hero-description">
              Da serra ao mar, descubra lugares, histórias e sabores que fazem
              deste estado um destino inesquecível.
            </p>
            <a className="primary-link" href="#destinos">
              Explorar destinos <span aria-hidden="true">↓</span>
            </a>
            <p className="hero-note">8 lugares para começar a sua próxima viagem</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun" />
            <div className="hill hill-back" />
            <div className="hill hill-front" />
            <div className="hero-stamp">RS<br /><span>29° sul</span></div>
            <div className="hero-caption"><span /> Serra, horizonte e liberdade</div>
          </div>
        </section>

        <section className="destinations-section" id="destinos">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Roteiros para se inspirar</p>
              <h2>Encontre seu próximo destino</h2>
            </div>
            <p className="section-aside">
              Natureza grandiosa, cultura viva<br />e hospitalidade gaúcha.
            </p>
          </div>

          <DestinationFilters
            busca={busca}
            aoBuscar={(valor) => {
              setBusca(valor);
              setDestinoSelecionado(null);
            }}
            categoriaSelecionada={categoriaSelecionada}
            categorias={categorias}
            aoSelecionarCategoria={(categoria) => {
              setCategoriaSelecionada(categoria);
              setDestinoSelecionado(null);
            }}
            somenteFavoritos={somenteFavoritos}
            aoAlternarFavoritos={() => {
              setSomenteFavoritos((ativo) => !ativo);
              setDestinoSelecionado(null);
            }}
          />

          <p className="results-count" aria-live="polite">
            {destinosFiltrados.length === 1
              ? "1 destino encontrado"
              : `${destinosFiltrados.length} destinos encontrados`}
            <span> · atualizados conforme sua busca</span>
          </p>

          <DestinationDetails
            destino={destinoSelecionado}
            aoFechar={() => setDestinoSelecionado(null)}
          />

          {destinosFiltrados.length > 0 ? (
            <div className="destination-grid">
              {destinosFiltrados.map((destino) => (
                <DestinationCard
                  key={destino.id}
                  destino={destino}
                  favorito={favoritos.includes(destino.id)}
                  aoAlternarFavorito={alternarFavorito}
                  aoVerDetalhes={setDestinoSelecionado}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span aria-hidden="true">⌕</span>
              <h3>Nenhum destino por aqui</h3>
              <p>Tente outra busca ou escolha uma categoria diferente.</p>
              <button
                className="text-link"
                type="button"
                onClick={() => {
                  setBusca("");
                  setCategoriaSelecionada("Todas");
                  setSomenteFavoritos(false);
                  setDestinoSelecionado(null);
                }}
              >
                Limpar filtros <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </section>

        <section className="about-section" id="sobre">
          <div className="about-mark" aria-hidden="true">RS</div>
          <div>
            <p className="eyebrow">Sobre o projeto</p>
            <h2>Uma viagem pelo estado,<br />construída com React.</h2>
            <p>
              Província de São Pedro é um guia demonstrativo de destinos
              gaúchos. Explore os cartões, filtre por interesse e salve seus
              lugares favoritos.
            </p>
          </div>
          <a className="about-link" href="#inicio">Voltar ao início ↑</a>
        </section>
      </main>
      <footer className="site-footer">
        <span>Província de São Pedro</span>
        <span>Um projeto educativo · Rio Grande do Sul, Brasil</span>
      </footer>
    </>
  );
}
