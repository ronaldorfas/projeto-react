import { useEffect, useState } from "react";

const descricoesClima = {
  0: "Céu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina com geada",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa intensa",
  56: "Garoa congelante leve",
  57: "Garoa congelante intensa",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva intensa",
  66: "Chuva congelante leve",
  67: "Chuva congelante intensa",
  71: "Neve leve",
  73: "Neve moderada",
  75: "Neve intensa",
  77: "Grãos de neve",
  80: "Pancadas de chuva leves",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva intensas",
  85: "Pancadas de neve leves",
  86: "Pancadas de neve intensas",
  95: "Trovoadas",
  96: "Trovoadas com granizo leve",
  99: "Trovoadas com granizo intenso",
};

function validarPrevisao(dados) {
  const diario = dados?.daily;
  const campos = [
    diario?.time,
    diario?.temperature_2m_max,
    diario?.temperature_2m_min,
    diario?.weather_code,
  ];

  if (
    campos.some((campo) => !Array.isArray(campo) || campo.length === 0) ||
    !campos.every((campo) => campo.length === campos[0].length) ||
    !campos[0].every((data) => typeof data === "string") ||
    !campos[1].every(Number.isFinite) ||
    !campos[2].every(Number.isFinite) ||
    !campos[3].every(Number.isFinite)
  ) {
    throw new Error("A API retornou dados de previsão em formato inválido.");
  }

  return diario;
}

function formatarDia(data) {
  const [ano, mes, dia] = data.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(
    new Date(ano, mes - 1, dia),
  );
}

function WeatherForecast({ destino }) {
  const [tentativa, setTentativa] = useState(0);
  const [estado, setEstado] = useState({ status: "loading" });

  useEffect(() => {
    const controlador = new AbortController();
    const { latitude, longitude } = destino.coordenadas;
    const parametros = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      forecast_days: "3",
      timezone: "auto",
    });

    async function carregarPrevisao() {
      setEstado({ status: "loading" });

      try {
        const resposta = await fetch(
          `https://api.open-meteo.com/v1/forecast?${parametros}`,
          { signal: controlador.signal },
        );
        if (!resposta.ok) {
          throw new Error(`A API de previsão respondeu com status ${resposta.status}.`);
        }

        const dados = await resposta.json();
        const previsao = validarPrevisao(dados);
        setEstado({ status: "success", previsao });
      } catch (error) {
        if (controlador.signal.aborted) return;
        console.error(`Não foi possível carregar a previsão para ${destino.cidade}.`, error);
        setEstado({
          status: "error",
          message: "Não foi possível carregar a previsão agora. Verifique sua conexão e tente novamente.",
        });
      }
    }

    carregarPrevisao();
    return () => controlador.abort();
  }, [destino.cidade, destino.coordenadas.latitude, destino.coordenadas.longitude, tentativa]);

  return (
    <section className="weather" aria-labelledby="weather-title">
      <div className="weather-heading">
        <div>
          <p className="eyebrow">Previsão do tempo</p>
          <h2 id="weather-title">Próximos 3 dias em {destino.cidade}</h2>
        </div>
        <span className="weather-location-note">Referência aproximada da cidade</span>
      </div>

      {estado.status === "loading" && (
        <p className="weather-message" role="status">Carregando previsão do tempo...</p>
      )}

      {estado.status === "error" && (
        <div className="weather-error" role="alert">
          <p>{estado.message}</p>
          <button type="button" onClick={() => setTentativa((atual) => atual + 1)}>
            Tentar novamente
          </button>
        </div>
      )}

      {estado.status === "success" && (
        <ul className="weather-list">
          {estado.previsao.time.map((data, indice) => (
            <li key={data}>
              <span className="weather-day">{formatarDia(data)}</span>
              <span className="weather-condition">
                {descricoesClima[estado.previsao.weather_code[indice]] ??
                  "Condição do tempo indisponível"}
              </span>
              <span className="weather-temperatures">
                <strong>{Math.round(estado.previsao.temperature_2m_max[indice])}°</strong>
                <span>{Math.round(estado.previsao.temperature_2m_min[indice])}°</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="weather-attribution">
        Dados: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>.
        {" "}A previsão é informativa e pode mudar.
      </p>
    </section>
  );
}

export default WeatherForecast;
