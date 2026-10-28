import { useEffect, useState } from "react";
import DestinationCard from "./components/DestinationCard.jsx";
import DestinationDetails from "./components/DestinationDetails.jsx";
import DestinationFilters from "./components/DestinationFilters.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import TripPlanner from "./components/TripPlanner.jsx";
import { atracoes, categorias } from "./data/atracoes.js";

const CHAVE_PERSISTENCIA = "provincia-de-sao-pedro:preferencias";

function carregarPreferencias() {
  try {
    const salvas = localStorage.getItem(CHAVE_PERSISTENCIA);
    if (!salvas) return { favoritos: [], roteiro: [], erro: "" };

    const preferencias = JSON.parse(salvas);
    if (
      !preferencias ||
      !Array.isArray(preferencias.favoritos) ||
      !Array.isArray(preferencias.roteiro) ||
      !preferencias.favoritos.every((id) => typeof id === "string") ||
      !preferencias.roteiro.every((id) => typeof id === "string")
    ) {
      throw new Error("Formato de preferências salvo é inválido.");
    }

    const idsValidos = new Set(atracoes.map((destino) => destino.id));
    return {
      favoritos: [...new Set(preferencias.favoritos.filter((id) => idsValidos.has(id)))],
      roteiro: [...new Set(preferencias.roteiro.filter((id) => idsValidos.has(id)))],
      erro: "",
    };
  } catch (error) {
    console.error("Não foi possível carregar as preferências salvas.", error);
    return {
      favoritos: [],
      roteiro: [],
      erro: "Não foi possível carregar os dados salvos. Favoritos e roteiro começam vazios.",
    };
  }
}

export default function App() {
  const [preferenciasIniciais] = useState(carregarPreferencias);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [favoritos, setFavoritos] = useState(preferenciasIniciais.favoritos);
  const [somenteFavoritos, setSomenteFavoritos] = useState(false);
  const [destinoSelecionado, setDestinoSelecionado] = useState(null);
  const [roteiro, setRoteiro] = useState(preferenciasIniciais.roteiro);
  const [erroPersistencia, setErroPersistencia] = useState(preferenciasIniciais.erro);
  const [persistenciaHabilitada, setPersistenciaHabilitada] = useState(
    !preferenciasIniciais.erro,
  );
  const destinosNoRoteiro = roteiro
    .map((id) => atracoes.find((destino) => destino.id === id))
    .filter(Boolean);

  useEffect(() => {
    if (!persistenciaHabilitada) return;

    try {
      localStorage.setItem(
        CHAVE_PERSISTENCIA,
        JSON.stringify({ favoritos, roteiro }),
      );
      setErroPersistencia("");
    } catch (error) {
      console.error("Não foi possível salvar as preferências no navegador.", error);
      setErroPersistencia(
        "Não foi possível salvar favoritos e roteiro neste navegador.",
      );
    }
  }, [favoritos, roteiro, persistenciaHabilitada]);

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
    setPersistenciaHabilitada(true);
    setFavoritos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((favoritoId) => favoritoId !== id)
        : [...atuais, id],
    );
  }

  function adicionarAoRoteiro(destino) {
    setPersistenciaHabilitada(true);
    setRoteiro((atuais) =>
      atuais.includes(destino.id) ? atuais : [...atuais, destino.id],
    );
  }

  function removerDoRoteiro(id) {
    setPersistenciaHabilitada(true);
    setRoteiro((atuais) => atuais.filter((destinoId) => destinoId !== id));
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

          {erroPersistencia && (
            <p className="storage-warning" role="alert">{erroPersistencia}</p>
          )}

          <TripPlanner
            categorias={categorias}
            destinos={atracoes}
            destinosNoRoteiro={roteiro}
            aoAdicionarAoRoteiro={adicionarAoRoteiro}
          />

          <section className="itinerary" id="roteiro" aria-labelledby="itinerary-title">
            <div className="itinerary-heading">
              <div>
                <p className="eyebrow">Sua próxima viagem</p>
                <h3 id="itinerary-title">Meu roteiro</h3>
              </div>
              <span aria-live="polite">
                {roteiro.length} {roteiro.length === 1 ? "destino" : "destinos"}
              </span>
            </div>
            {destinosNoRoteiro.length > 0 ? (
              <ol className="itinerary-list">
                {destinosNoRoteiro.map((destino) => (
                  <li key={destino.id}>
                    <span>
                      <strong>{destino.nome}</strong>
                      <small>{destino.cidade}</small>
                    </span>
                    <button
                      className="itinerary-remove"
                      type="button"
                      onClick={() => removerDoRoteiro(destino.id)}
                      aria-label={`Remover ${destino.nome} do roteiro`}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="itinerary-empty">
                Adicione destinos pelos cartões para começar a planejar sua viagem.
              </p>
            )}
          </section>

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
                  noRoteiro={roteiro.includes(destino.id)}
                  aoAdicionarAoRoteiro={adicionarAoRoteiro}
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
