# Província de São Pedro

Guia demonstrativo de destinos turísticos do Rio Grande do Sul, feito com React. A aplicação reúne lugares de natureza, cultura, litoral e enogastronomia; permite pesquisar, filtrar, salvar favoritos, montar um roteiro e acessar páginas compartilháveis de cada destino.

**Acesse a página publicada:** [provincia-de-sao-pedro.vercel.app](https://provincia-de-sao-pedro.vercel.app/)

> As informações são introdutórias e servem para demonstração. Horários, condições de acesso, reservas e regras de visitação devem ser confirmados nos canais oficiais antes da viagem.

## Executar o projeto

Requisitos: Node.js e npm.

```bash
cd provincia-de-sao-pedro
npm install
npm run dev
```

Os comandos abaixo também devem ser executados dentro de `provincia-de-sao-pedro`. Para gerar e pré-visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura

```text
src/
  components/
    DestinationCard.jsx
    DestinationFilters.jsx
    SiteHeader.jsx
    TripPlanner.jsx
    WeatherForecast.jsx
  data/
    atracoes.js
  App.jsx
  main.jsx
  styles.css
```

Os dados turísticos ficam separados dos componentes para facilitar a revisão e a inclusão de destinos. Cada destino usa um `id` estável, independente do nome apresentado na interface.

## Conceitos de React aplicados

### 1. JSX

JSX aparece nos componentes para descrever a estrutura da página junto ao JavaScript. Por exemplo, os textos, categorias e nomes são inseridos na interface com expressões entre chaves, como `{destino.nome}`. JSX é transformado pelo Vite em chamadas JavaScript que o React consegue renderizar.

**Se não fosse usado:** seria necessário construir os elementos com APIs como `document.createElement` ou escrever chamadas explícitas de `React.createElement`. A interface ficaria mais verbosa e seria mais difícil relacionar estrutura, dados e comportamento.

### 2. Componentes reutilizáveis

`SiteHeader`, `DestinationFilters`, `DestinationCard` e `TripPlanner` dividem a interface em partes com responsabilidades claras. `App` reúne os componentes, rotas e estado compartilhado.

**Se não fossem usados:** o conteúdo ficaria concentrado em uma única função ou arquivo, com trechos repetidos para cada cartão. Alterar o layout ou manter a página se tornaria mais trabalhoso.

### 3. Props

Os dados e ações são passados dos componentes pais para os filhos por props. Por exemplo, `DestinationCard` recebe `destino`, `favorito` e funções para abrir detalhes e alternar favoritos. O cartão não precisa conhecer toda a aplicação para exibir seu destino.

**Se não fossem usadas:** os componentes precisariam acessar dados globais ou duplicar estado e lógica, aumentando o acoplamento e tornando a reutilização menos previsível.

### 4. Estado e atualização da interface (Virtual DOM)

`App` usa `useState` para guardar a busca, a categoria, os favoritos e o roteiro da viagem. É possível adicionar destinos pelos cartões ou pelo planejador e removê-los na página “Meu roteiro”; destinos repetidos não são adicionados. Favoritos e roteiro são carregados e salvos no `localStorage` do navegador com `useEffect`, permanecendo após recarregar a página no mesmo navegador. Se o navegador bloquear o armazenamento ou os dados salvos forem inválidos, a página informa o problema.

O Virtual DOM não é um segundo DOM que o usuário precisa atualizar manualmente: é parte do mecanismo interno de renderização do React. Este projeto demonstra o efeito observável do estado na interface, não uma simulação separada do DOM.

**Se o estado e o mecanismo do React não fossem usados:** seria preciso gerenciar esses valores e sincronizar as mudanças no DOM diretamente. Isso torna mais fácil que os dados e o que aparece na página fiquem divergentes.

### 5. Listas e keys

Os destinos são armazenados em `src/data/atracoes.js` e exibidos com `map()`. Cada cartão recebe `key={destino.id}`, uma identificação estável e única que permite ao React acompanhar os itens da lista quando os filtros mudam.

**Se as listas não fossem renderizadas a partir dos dados:** cada cartão teria de ser escrito manualmente, o que aumentaria duplicação e dificultaria atualizar ou filtrar o catálogo. Sem keys estáveis, o React perde uma referência confiável para identificar os itens entre renderizações.

### 6. Renderização condicional

O app mostra cartões ou uma mensagem com ação para limpar os filtros quando não há resultados. Páginas inexistentes e identificadores de destinos inválidos também recebem mensagens apropriadas.

**Se condições não fossem usadas:** a página não poderia adaptar claramente o conteúdo aos resultados da busca ou às ações da pessoa usuária; mensagens vazias e estados de erro precisariam de manipulação manual do DOM.

### 7. Formulários

`TripPlanner` usa um formulário controlado pelo React para receber cidade de partida, duração da viagem e interesse. Os campos são validados antes de gerar sugestões; cada sugestão pode ser adicionada ao roteiro persistido. A cidade é exibida como contexto, mas as sugestões são filtradas pelo interesse e não representam cálculo de distância ou rota real.

**Se formulários não fossem usados:** seria necessário recolher essas informações por outros controles ou manipulação manual do DOM, dificultando a validação e a atualização das sugestões.

### 8. Efeitos e persistência

`useEffect` sincroniza favoritos e roteiro com `localStorage`, mantendo esses dados após recarregar a página no mesmo navegador.

**Sem esse efeito:** as alterações continuariam disponíveis somente enquanto a aplicação estivesse aberta.

### 9. Rotas e navegação

React Router apresenta páginas distintas para início, catálogo, favoritos, roteiro e detalhes de cada destino. Os links atualizam a URL sem recarregar a aplicação; a configuração `vercel.json` encaminha as rotas ao app para que links diretos e recarregamentos funcionem na publicação.

**Sem um roteador:** seria necessário concentrar todas as telas em uma página ou implementar manualmente a leitura e sincronização da URL, histórico do navegador e navegação.

Rotas disponíveis:

| URL | Conteúdo |
|---|---|
| `/` | Página inicial e catálogo |
| `/destinos` | Catálogo completo |
| `/destinos/:id` | Detalhes compartilháveis de um destino |
| `/favoritos` | Destinos favoritos |
| `/roteiro` | Planejador e roteiro salvo |
| `/sobre` | Informações sobre o projeto |

### 10. Consumo de APIs

Na página de cada destino, `WeatherForecast` consulta a API pública da [Open-Meteo](https://open-meteo.com/) usando coordenadas aproximadas da cidade. Exibe a previsão para três dias e informa estados de carregamento e erro, com opção para tentar novamente. A requisição é cancelada se a pessoa sair da página antes da resposta; respostas inválidas também são tratadas como erro.

A previsão usa a cidade como referência e é informativa: não representa necessariamente as condições dentro de parques ou pontos específicos e pode mudar. É necessária conexão com a internet para carregar os dados.

**Sem uma API:** seria necessário manter e atualizar os dados meteorológicos manualmente; a previsão deixaria de refletir informações atuais.

## Tecnologias e comparação

| Tecnologia | Uso neste projeto | Sem ela / alternativa |
|---|---|---|
| React 18 | Componentes, estado e renderização declarativa. | JavaScript com manipulação direta do DOM ou outra biblioteca/framework; seria necessário escolher e manter outro modelo para compor e atualizar a interface. |
| JSX | Sintaxe declarativa para escrever a árvore de interface nos arquivos `.jsx`. | `React.createElement` ou criação manual de elementos; possível, porém mais verboso para uma página composta por vários componentes. |
| JavaScript | Dados dos destinos, filtros e interações do usuário. | HTML estático não ofereceria busca, filtros ou favoritos dinâmicos. Outra linguagem de navegador, como TypeScript, poderia ser adotada com configuração adicional. |
| Formulários HTML e estado React | Coletam e validam a cidade de partida, duração e interesse para sugerir destinos. | Sem o formulário, as preferências teriam de ser escolhidas por outra interface ou manipuladas diretamente no DOM. |
| React `useEffect` e `localStorage` | Carregam e persistem favoritos e roteiro neste navegador entre visitas. | Sem persistência local, esses dados seriam perdidos ao recarregar a página; um servidor ou banco de dados seria necessário para sincronizá-los entre dispositivos. |
| React Router | Navegação por URLs para catálogo, favoritos, roteiro e detalhes. | Sem roteador, histórico e rotas precisariam ser controlados manualmente ou todas as telas ficariam em uma única página. |
| API Open-Meteo e Fetch | Buscam a previsão diária de três dias nas páginas de destino, sem chave de API. | Sem o serviço externo, seria preciso manter dados meteorológicos manualmente, que ficariam desatualizados. |
| Vite | Servidor de desenvolvimento e empacotamento de produção. | Outras ferramentas, como webpack ou Parcel, poderiam cumprir essa função; sem ferramenta de build, seria preciso configurar a transformação de JSX e os módulos para produção. |
| CSS | Layout responsivo, cores, tipografia, foco e estados visuais. | Sem estilos próprios, o conteúdo ainda poderia existir, mas perderia a identidade visual e parte da adaptação a telas diferentes. Frameworks CSS seriam alternativas, com dependência e convenções adicionais. |
| Google Fonts e imagens locais | As fontes DM Sans e Playfair Display são carregadas do Google Fonts; as fotografias ficam nos arquivos locais de `public/images`. | Sem acesso à internet, as fontes usam alternativas do sistema; as fotos locais continuam disponíveis. As fontes poderiam ser hospedadas no projeto para remover essa dependência externa. |

## Acessibilidade e experiência

- Estrutura com cabeçalho, navegação, conteúdo principal, seções e rodapé.
- Navegação entre páginas por links, campo de busca com rótulo acessível, botões com estados `aria-pressed` e feedback com `aria-live`.
- Campos do planejador com rótulos, validação nativa e apresentação acessível das sugestões.
- Texto alternativo nas imagens, foco visível e layout responsivo.
- Favoritos e roteiro persistem no armazenamento local do navegador; filtros são reiniciados ao recarregar. Os dados não são sincronizados entre dispositivos.
- URLs de destinos e páginas de favoritos/roteiro podem ser abertas diretamente e compartilhadas.
- A previsão meteorológica é obtida pela internet; indisponibilidade da API é exibida com opção para tentar novamente.

## Melhorias futuras

- Documentar a origem e verificar a licença de cada imagem local; substituir as que não tiverem uso autorizado.
- Adicionar links oficiais, mapas, rotas e informações de acessibilidade dos locais.
- Criar testes automatizados para filtros, favoritos e renderização sem resultados.
