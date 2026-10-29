# Aula React

O React Lab publicado apresenta onze conceitos do React em exemplos interativos. Este repositório contém o código local do laboratório e a aplicação turística Província de São Pedro, que também demonstra esses conceitos em um projeto completo.

## Executar localmente

```bash
npm install
npm run dev
```

> **Diferença entre a versão publicada e o código local:** a página publicada do React Lab lista os onze conceitos abaixo, mas `src/App.jsx` no código local deste repositório ainda monta somente os seis primeiros cartões. Os conceitos de estado, formulários, efeitos, APIs e navegação têm exemplos práticos na aplicação Província; suas demonstrações como cartões independentes do laboratório ainda não estão implementadas no `src/App.jsx`.

## Conceitos do React Lab e exemplos na Província

| # | Conceito | O que significa | Exemplo na Província de São Pedro |
|---|---|---|---|
| 1 | **JSX** | Sintaxe que permite descrever a interface junto ao JavaScript; o projeto transforma JSX em código que o React renderiza. | Os componentes escrevem a interface com elementos como `<DestinationCard />` e expressões como `{destino.nome}`. |
| 2 | **Componentes** | Partes independentes e reutilizáveis da interface, cada uma com uma responsabilidade. | `DestinationCard`, `DestinationFilters`, `TripPlanner` e `WeatherForecast` separam cartão, filtros, formulário e previsão. |
| 3 | **Props** | Dados e funções passados de um componente pai para um filho. | `App` passa destinos, categorias e ações para `DestinationCard` e `TripPlanner`. |
| 4 | **Virtual DOM** | Modelo interno que o React usa para comparar renderizações e atualizar o DOM necessário quando a interface muda. | Ao aplicar um filtro ou receber a previsão, React atualiza os elementos afetados sem reconstruir manualmente a página. |
| 5 | **Listas e keys** | Coleções de elementos podem ser renderizadas com `map()`; `key` identifica cada item de forma estável entre renderizações. | Os cartões usam `key={destino.id}` e a previsão usa a data como chave. |
| 6 | **Renderização condicional** | A interface pode apresentar conteúdos diferentes conforme o estado ou os dados disponíveis. | O app mostra estados vazios, erros de rota, carregamento da previsão ou os dados quando chegam. |
| 7 | **State e `useState`** | Estado guarda dados que mudam durante o uso; atualizar o estado solicita uma nova renderização. | Busca, filtros, favoritos, roteiro, campos do planejador e estado da previsão são controlados pelo React. |
| 8 | **Formulários** | Campos coletam dados; o formulário permite validar e processar o envio. | `TripPlanner` recebe cidade de partida, número de dias e interesse, valida os dados e sugere destinos. |
| 9 | **`useEffect`** | Hook para sincronizar um componente com sistemas externos, como armazenamento do navegador ou rede. | O app salva favoritos e roteiro no `localStorage`; `WeatherForecast` consulta a API e cancela a requisição se o componente sair da página. |
| 10 | **Consumo de APIs** | A aplicação solicita dados de um serviço externo e precisa tratar carregamento, sucesso e falha. | `WeatherForecast` busca a previsão Open-Meteo para três dias e informa carregamento, erro e opção de tentar novamente. |
| 11 | **React Router** | Associa URLs a páginas e permite navegar mantendo o comportamento de uma aplicação React. | `/destinos`, `/favoritos`, `/roteiro`, `/sobre` e `/destinos/:id` são páginas navegáveis e compartilháveis. |

O Virtual DOM e o estado estão relacionados, mas são conceitos diferentes: `useState` representa dados da aplicação; o Virtual DOM faz parte do mecanismo que o React usa para refletir mudanças desses dados na interface.

## Projeto de turismo: Província de São Pedro

O projeto turístico é uma aplicação React independente dentro da pasta [`provincia-de-sao-pedro`](./provincia-de-sao-pedro/). Apresenta destinos do Rio Grande do Sul com busca, filtros, favoritos, páginas compartilháveis com React Router, previsão do tempo via Open-Meteo e um formulário de planejamento que sugere destinos por duração e interesse. Favoritos e o roteiro planejado persistem no navegador com `useEffect` e `localStorage`. O [README da Província](./provincia-de-sao-pedro/README.md) detalha a implementação, as rotas e as limitações de cada recurso.

**Acesse:** [React Lab](https://projeto-react-five-swart.vercel.app/) · [Província de São Pedro](https://provincia-de-sao-pedro.vercel.app/)

Para executá-lo a partir da raiz deste repositório:

```bash
cd provincia-de-sao-pedro
npm install
npm run dev
```

A documentação dos conceitos, das tecnologias e das formas de execução está no [README do projeto turístico](./provincia-de-sao-pedro/README.md).
