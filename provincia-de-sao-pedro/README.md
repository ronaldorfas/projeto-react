# Província de São Pedro

Guia demonstrativo de destinos turísticos do Rio Grande do Sul, feito com React. A página reúne lugares de natureza, cultura, litoral e enogastronomia; permite pesquisar, filtrar, salvar favoritos e abrir uma descrição de cada destino.

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
    DestinationDetails.jsx
    DestinationFilters.jsx
    SiteHeader.jsx
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

`SiteHeader`, `DestinationFilters`, `DestinationCard` e `DestinationDetails` dividem a página em partes com responsabilidades claras. `App` reúne os componentes e controla o estado compartilhado.

**Se não fossem usados:** o conteúdo ficaria concentrado em uma única função ou arquivo, com trechos repetidos para cada cartão. Alterar o layout ou manter a página se tornaria mais trabalhoso.

### 3. Props

Os dados e ações são passados dos componentes pais para os filhos por props. Por exemplo, `DestinationCard` recebe `destino`, `favorito` e funções para abrir detalhes e alternar favoritos. O cartão não precisa conhecer toda a aplicação para exibir seu destino.

**Se não fossem usadas:** os componentes precisariam acessar dados globais ou duplicar estado e lógica, aumentando o acoplamento e tornando a reutilização menos previsível.

### 4. Estado e atualização da interface (Virtual DOM)

`App` usa `useState` para guardar a busca, a categoria, os favoritos, o destino selecionado e o roteiro da viagem. É possível adicionar destinos pelo cartão e removê-los no painel “Meu roteiro”; destinos repetidos não são adicionados. Ao interagir, o estado muda e React atualiza a interface.

O Virtual DOM não é um segundo DOM que o usuário precisa atualizar manualmente: é parte do mecanismo interno de renderização do React. Este projeto demonstra o efeito observável do estado na interface, não uma simulação separada do DOM.

**Se o estado e o mecanismo do React não fossem usados:** seria preciso gerenciar esses valores e sincronizar as mudanças no DOM diretamente. Isso torna mais fácil que os dados e o que aparece na página fiquem divergentes.

### 5. Listas e keys

Os destinos são armazenados em `src/data/atracoes.js` e exibidos com `map()`. Cada cartão recebe `key={destino.id}`, uma identificação estável e única que permite ao React acompanhar os itens da lista quando os filtros mudam.

**Se as listas não fossem renderizadas a partir dos dados:** cada cartão teria de ser escrito manualmente, o que aumentaria duplicação e dificultaria atualizar ou filtrar o catálogo. Sem keys estáveis, o React perde uma referência confiável para identificar os itens entre renderizações.

### 6. Renderização condicional

O app mostra os cartões quando há resultados e uma mensagem com ação para limpar os filtros quando não há nenhum. O painel de detalhes também aparece somente após a seleção de um destino.

**Se condições não fossem usadas:** a página não poderia adaptar claramente o conteúdo aos resultados da busca ou às ações da pessoa usuária; mensagens vazias e detalhes selecionados precisariam de manipulação manual do DOM.

## Tecnologias e comparação

| Tecnologia | Uso neste projeto | Sem ela / alternativa |
|---|---|---|
| React 18 | Componentes, estado e renderização declarativa. | JavaScript com manipulação direta do DOM ou outra biblioteca/framework; seria necessário escolher e manter outro modelo para compor e atualizar a interface. |
| JSX | Sintaxe declarativa para escrever a árvore de interface nos arquivos `.jsx`. | `React.createElement` ou criação manual de elementos; possível, porém mais verboso para uma página composta por vários componentes. |
| JavaScript | Dados dos destinos, filtros e interações do usuário. | HTML estático não ofereceria busca, filtros ou favoritos dinâmicos. Outra linguagem de navegador, como TypeScript, poderia ser adotada com configuração adicional. |
| Vite | Servidor de desenvolvimento e empacotamento de produção. | Outras ferramentas, como webpack ou Parcel, poderiam cumprir essa função; sem ferramenta de build, seria preciso configurar a transformação de JSX e os módulos para produção. |
| CSS | Layout responsivo, cores, tipografia, foco e estados visuais. | Sem estilos próprios, o conteúdo ainda poderia existir, mas perderia a identidade visual e parte da adaptação a telas diferentes. Frameworks CSS seriam alternativas, com dependência e convenções adicionais. |
| Google Fonts e imagens Unsplash | Fontes e fotografias carregadas por URLs externas. | Com bloqueio de rede, as fontes voltam às alternativas do sistema e as imagens podem não carregar. Recursos locais ou hospedados pelo projeto eliminariam essa dependência externa. |

## Acessibilidade e experiência

- Estrutura com cabeçalho, navegação, conteúdo principal, seções e rodapé.
- Campo de busca com rótulo acessível, botões com estados `aria-pressed` e feedback de resultados com `aria-live`.
- Texto alternativo nas imagens, foco visível e layout responsivo.
- Favoritos, filtros e roteiro permanecem em memória durante a sessão; ainda não há armazenamento persistente.

## Evoluções possíveis

- Persistir favoritos e roteiro no navegador com `localStorage` e `useEffect`.
- Criar um formulário para organizar o roteiro por duração e interesses.
- Adicionar páginas compartilháveis com React Router.
- Consultar previsão do tempo para os destinos por uma API.
- Usar imagens próprias ou locais com fonte e licença verificadas.
- Adicionar links oficiais, mapas, rotas e informações de acessibilidade dos locais.
- Criar testes automatizados para filtros, favoritos e renderização sem resultados.
