import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import DestinationCard from "./components/DestinationCard.jsx";
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

function DestinationGrid({
  destinos,
  favoritos,
  roteiro,
  aoAlternarFavorito,
  aoAdicionarAoRoteiro,
}) {
  const navigate = useNavigate();

  if (destinos.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">⌕</span>
        <h3>Nenhum destino por aqui</h3>
        <p>Experimente ajustar a busca ou os filtros.</p>
        <Link className="text-link" to="/destinos">
          Ver todos os destinos <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="destination-grid">
      {destinos.map((destino) => (
        <DestinationCard
          key={destino.id}
          destino={destino}
          favorito={favoritos.includes(destino.id)}
          aoAlternarFavorito={aoAlternarFavorito}
          aoVerDetalhes={() => navigate(`/destinos/${destino.id}`)}
          noRoteiro={roteiro.includes(destino.id)}
          aoAdicionarAoRoteiro={aoAdicionarAoRoteiro}
        />
      ))}
    </div>
  );
}

function ItineraryList({ destinos, aoRemover }) {
  if (destinos.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">⌖</span>
        <h3>Seu roteiro está vazio</h3>
        <p>Explore os destinos e adicione os lugares que gostaria de conhecer.</p>
        <Link className="text-link" to="/destinos">
          Explorar destinos <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <ol className="itinerary-list">
      {destinos.map((destino) => (
        <li key={destino.id}>
          <span>
            <Link to={`/destinos/${destino.id}`}><strong>{destino.nome}</strong></Link>
            <small>{destino.cidade}</small>
          </span>
          <button
            className="itinerary-remove"
            type="button"
            onClick={() => aoRemover(destino.id)}
            aria-label={`Remover ${destino.nome} do roteiro`}
          >
            Remover
          </button>
        </li>
      ))}
    </ol>
  );
}

function DestinationCatalog({
  mostrarHero,
  busca,
  setBusca,
  categoriaSelecionada,
  setCategoriaSelecionada,
  somenteFavoritos,
  setSomenteFavoritos,
  destinosFiltrados,
  favoritos,
  roteiro,
  aoAlternarFavorito,
  aoAdicionarAoRoteiro,
}) {
  return (
    <>
      {mostrarHero && (
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow"><span aria-hidden="true">✳</span> Um estado, muitos caminhos</p>
            <h1>O Rio Grande do Sul<br /><em>espera por você.</em></h1>
            <p className="hero-description">
              Da serra ao mar, descubra lugares, histórias e sabores que fazem
              deste estado um destino inesquecível.
            </p>
            <Link className="primary-link" to="/destinos">
              Explorar destinos <span aria-hidden="true">↓</span>
            </Link>
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
      )}
      <section className="destinations-section" id="destinos">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{mostrarHero ? "Roteiros para se inspirar" : "Explore o estado"}</p>
            <h2>{mostrarHero ? "Encontre seu próximo destino" : "Todos os destinos"}</h2>
          </div>
          <p className="section-aside">
            Natureza grandiosa, cultura viva<br />e hospitalidade gaúcha.
          </p>
        </div>
        <DestinationFilters
          busca={busca}
          aoBuscar={setBusca}
          categoriaSelecionada={categoriaSelecionada}
          categorias={categorias}
          aoSelecionarCategoria={setCategoriaSelecionada}
          somenteFavoritos={somenteFavoritos}
          aoAlternarFavoritos={() => setSomenteFavoritos((ativo) => !ativo)}
        />
        <p className="results-count" aria-live="polite">
          {destinosFiltrados.length === 1
            ? "1 destino encontrado"
            : `${destinosFiltrados.length} destinos encontrados`}
          <span> · atualizados conforme sua busca</span>
        </p>
        <DestinationGrid
          destinos={destinosFiltrados}
          favoritos={favoritos}
          roteiro={roteiro}
          aoAlternarFavorito={aoAlternarFavorito}
          aoAdicionarAoRoteiro={aoAdicionarAoRoteiro}
        />
      </section>
    </>
  );
}

function AboutProject() {
  return (
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
      <Link className="about-link" to="/">Voltar ao início ↑</Link>
    </section>
  );
}

function DestinationDetailPage({
  favoritos,
  roteiro,
  aoAlternarFavorito,
  aoAdicionarAoRoteiro,
}) {
  const { id } = useParams();
  const destino = atracoes.find((item) => item.id === id);

  if (!destino) {
    return (
      <section className="route-page empty-state">
        <h1>Destino não encontrado</h1>
        <p>Esse lugar não está disponível no guia.</p>
        <Link className="text-link" to="/destinos">Ver todos os destinos →</Link>
      </section>
    );
  }

  const favorito = favoritos.includes(destino.id);
  const noRoteiro = roteiro.includes(destino.id);

  return (
    <section className="route-page destination-page">
      <Link className="back-link" to="/destinos">← Voltar aos destinos</Link>
      <div className="destination-page-content">
        <img src={destino.imagem} alt={destino.imagemAlt} />
        <div className="destination-page-copy">
          <p className="eyebrow">{destino.categoria} · {destino.cidade}</p>
          <h1>{destino.nome}</h1>
          <p className="destination-page-summary">{destino.resumo}</p>
          <p className="destination-page-description">{destino.descricao}</p>
          <div className="destination-page-actions">
            <button
              className={`filter-chip ${favorito ? "is-active" : ""}`}
              type="button"
              aria-pressed={favorito}
              onClick={() => aoAlternarFavorito(destino.id)}
            >
              {favorito ? "♥ Nos favoritos" : "♡ Adicionar aos favoritos"}
            </button>
            <button
              className="planner-submit"
              type="button"
              disabled={noRoteiro}
              onClick={() => aoAdicionarAoRoteiro(destino)}
            >
              {noRoteiro ? "Adicionado ao roteiro" : "Adicionar ao roteiro"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [preferenciasIniciais] = useState(carregarPreferencias);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [favoritos, setFavoritos] = useState(preferenciasIniciais.favoritos);
  const [somenteFavoritos, setSomenteFavoritos] = useState(false);
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

  const dadosCatalogo = {
    busca,
    setBusca,
    categoriaSelecionada,
    setCategoriaSelecionada,
    somenteFavoritos,
    setSomenteFavoritos,
    destinosFiltrados,
    favoritos,
    roteiro,
    aoAlternarFavorito: alternarFavorito,
    aoAdicionarAoRoteiro: adicionarAoRoteiro,
  };

  return (
    <>
      <SiteHeader quantidadeFavoritos={favoritos.length} />
      <main id="inicio">
        {erroPersistencia && (
          <p className="storage-warning" role="alert">{erroPersistencia}</p>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <DestinationCatalog mostrarHero {...dadosCatalogo} />
                <AboutProject />
              </>
            }
          />
          <Route
            path="/destinos"
            element={<DestinationCatalog mostrarHero={false} {...dadosCatalogo} />}
          />
          <Route
            path="/favoritos"
            element={
              <section className="route-page">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Seus lugares salvos</p>
                    <h1>Destinos favoritos</h1>
                  </div>
                </div>
                <DestinationGrid
                  destinos={atracoes.filter((destino) => favoritos.includes(destino.id))}
                  favoritos={favoritos}
                  roteiro={roteiro}
                  aoAlternarFavorito={alternarFavorito}
                  aoAdicionarAoRoteiro={adicionarAoRoteiro}
                />
              </section>
            }
          />
          <Route
            path="/roteiro"
            element={
              <section className="route-page">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Sua próxima viagem</p>
                    <h1>Meu roteiro</h1>
                  </div>
                  <span>{roteiro.length} {roteiro.length === 1 ? "destino" : "destinos"}</span>
                </div>
                <TripPlanner
                  categorias={categorias}
                  destinos={atracoes}
                  destinosNoRoteiro={roteiro}
                  aoAdicionarAoRoteiro={adicionarAoRoteiro}
                />
                <ItineraryList destinos={destinosNoRoteiro} aoRemover={removerDoRoteiro} />
              </section>
            }
          />
          <Route
            path="/destinos/:id"
            element={
              <DestinationDetailPage
                favoritos={favoritos}
                roteiro={roteiro}
                aoAlternarFavorito={alternarFavorito}
                aoAdicionarAoRoteiro={adicionarAoRoteiro}
              />
            }
          />
          <Route
            path="*"
            element={
              <section className="route-page empty-state">
                <h1>Página não encontrada</h1>
                <p>O endereço acessado não corresponde a uma página deste guia.</p>
                <Link className="text-link" to="/">Voltar ao início →</Link>
              </section>
            }
          />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>Província de São Pedro</span>
        <span>Um projeto educativo · Rio Grande do Sul, Brasil</span>
      </footer>
    </>
  );
}
