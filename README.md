# Aula React

Interface didática simples com seis componentes independentes, cada um apresentando um conceito fundamental do React:

1. JSX
2. Componentes
3. Props
4. Virtual DOM e estado
5. Listas e keys
6. Renderização condicional

## Executar localmente

```bash
npm install
npm run dev
```

A página inicial apresenta os seis conceitos em cartões, sem navegação adicional ou camadas de interface desnecessárias.

## Projeto de turismo: Província de São Pedro

O projeto turístico é uma aplicação React independente dentro da pasta [`provincia-de-sao-pedro`](./provincia-de-sao-pedro/). Apresenta destinos do Rio Grande do Sul com busca, filtros, favoritos, páginas compartilháveis com React Router e um formulário de planejamento que sugere destinos por duração e interesse. Favoritos e o roteiro planejado persistem no navegador com `useEffect` e `localStorage`.

Para executá-lo a partir da raiz deste repositório:

```bash
cd provincia-de-sao-pedro
npm install
npm run dev
```

A documentação dos conceitos, das tecnologias e das formas de execução está no [README do projeto turístico](./provincia-de-sao-pedro/README.md).
