import { useState } from "react";

export default function TripPlanner({
  categorias,
  destinos,
  destinosNoRoteiro,
  aoAdicionarAoRoteiro,
}) {
  const [cidadePartida, setCidadePartida] = useState("");
  const [duracao, setDuracao] = useState("3");
  const [interesse, setInteresse] = useState("Todas");
  const [sugestoes, setSugestoes] = useState(null);
  const [erro, setErro] = useState("");

  function gerarSugestoes(event) {
    event.preventDefault();
    const origem = cidadePartida.trim();

    if (!origem) {
      setErro("Informe a cidade de partida.");
      return;
    }

    const quantidadeDeDias = Number(duracao);
    if (!Number.isInteger(quantidadeDeDias) || quantidadeDeDias < 1 || quantidadeDeDias > destinos.length) {
      setErro(`Informe uma duração entre 1 e ${destinos.length} dias.`);
      return;
    }

    const destinosSugeridos = destinos
      .filter((destino) => interesse === "Todas" || destino.categoria === interesse)
      .slice(0, quantidadeDeDias);

    setErro("");
    setSugestoes({
      origem,
      duracao: quantidadeDeDias,
      destinos: destinosSugeridos,
    });
  }

  return (
    <section className="planner" aria-labelledby="planner-title">
      <div className="planner-heading">
        <p className="eyebrow">Planeje sua viagem</p>
        <h3 id="planner-title">Encontre ideias para o roteiro</h3>
        <p>Conte de onde você sai, quantos dias tem e o que gostaria de conhecer.</p>
      </div>

      <form className="planner-form" onSubmit={gerarSugestoes}>
        <div className="planner-fields">
          <label>
            <span>Cidade de partida</span>
            <input
              type="text"
              value={cidadePartida}
              onChange={(event) => setCidadePartida(event.target.value)}
              placeholder="Ex.: Porto Alegre"
              maxLength={60}
              required
            />
          </label>
          <label>
            <span>Duração (dias)</span>
            <input
              type="number"
              value={duracao}
              onChange={(event) => setDuracao(event.target.value)}
              min="1"
              max={destinos.length}
              required
            />
          </label>
          <label>
            <span>Interesse</span>
            <select
              value={interesse}
              onChange={(event) => setInteresse(event.target.value)}
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </label>
        </div>
        {erro && <p className="planner-error" role="alert">{erro}</p>}
        <button className="planner-submit" type="submit">Ver sugestões</button>
      </form>

      {sugestoes && (
        <div className="planner-results" aria-live="polite">
          <h4>
            Ideias para {sugestoes.duracao} {sugestoes.duracao === 1 ? "dia" : "dias"},
            {" "}saindo de {sugestoes.origem}
          </h4>
          {sugestoes.destinos.length > 0 ? (
            <ul>
              {sugestoes.destinos.map((destino) => {
                const jaEstaNoRoteiro = destinosNoRoteiro.includes(destino.id);
                return (
                  <li key={destino.id}>
                    <span>
                      <strong>{destino.nome}</strong>
                      <small>{destino.cidade} · {destino.categoria}</small>
                    </span>
                    <button
                      type="button"
                      disabled={jaEstaNoRoteiro}
                      onClick={() => aoAdicionarAoRoteiro(destino)}
                    >
                      {jaEstaNoRoteiro ? "No roteiro" : "Adicionar"}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="planner-empty">Não há destinos para esse interesse no momento.</p>
          )}
          <p className="planner-note">
            Sugestões demonstrativas por interesse; a página não calcula distâncias nem trajetos.
          </p>
        </div>
      )}
    </section>
  );
}
