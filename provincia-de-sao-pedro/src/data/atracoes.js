export const categorias = [
  "Todas",
  "Natureza",
  "Cultura",
  "Litoral",
  "Enogastronomia",
];

export const atracoes = [
  {
    id: "aparados-da-serra",
    nome: "Parque Nacional de Aparados da Serra",
    cidade: "Cambará do Sul",
    categoria: "Natureza",
    resumo: "Cânions imponentes, campos de altitude e trilhas em meio à natureza.",
    descricao:
      "Na divisa entre o Rio Grande do Sul e Santa Catarina, o parque protege paisagens de campos e cânions. O Itaimbezinho é um de seus cenários mais conhecidos; consulte as condições das trilhas e as regras de visitação antes de ir.",
    imagem:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    imagemAlt: "Montanhas cobertas por nuvens em uma paisagem de altitude",
    icone: "⛰",
    destaque: "Campos de altitude",
  },
  {
    id: "lago-negro",
    nome: "Lago Negro",
    cidade: "Gramado",
    categoria: "Natureza",
    resumo: "Um passeio tranquilo entre árvores, jardins e águas serenas.",
    descricao:
      "O Lago Negro é um dos espaços ao ar livre mais conhecidos de Gramado. A área arborizada convida a uma caminhada tranquila e oferece uma pausa entre as atrações da cidade.",
    imagem:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
    imagemAlt: "Lago cercado por montanhas e vegetação",
    icone: "🌲",
    destaque: "Passeio ao ar livre",
  },
  {
    id: "parque-do-caracol",
    nome: "Parque do Caracol",
    cidade: "Canela",
    categoria: "Natureza",
    resumo: "A famosa cascata e trilhas em uma área de mata preservada.",
    descricao:
      "O parque é conhecido pela Cascata do Caracol, uma queda d'água cercada pela mata da Serra Gaúcha. Mirantes e caminhos sinalizados permitem apreciar a paisagem em diferentes pontos.",
    imagem:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=85",
    imagemAlt: "Queda d'água em meio à vegetação",
    icone: "💧",
    destaque: "Cascata e mirantes",
  },
  {
    id: "vale-dos-vinhedos",
    nome: "Vale dos Vinhedos",
    cidade: "Bento Gonçalves",
    categoria: "Enogastronomia",
    resumo: "Vinhedos, cantinas e tradições da imigração italiana.",
    descricao:
      "Entre Bento Gonçalves, Garibaldi e Monte Belo do Sul, o Vale dos Vinhedos reúne paisagens de vinhedos, vinícolas e experiências gastronômicas. Confirme horários e necessidade de reserva diretamente com cada estabelecimento.",
    imagem:
      "https://www.google.com/imgres?q=s%C3%ADtio%20arqueol%C3%B3gico%20de%20s%C3%A3o%20miguel%20arcanjo&imgurl=https%3A%2F%2Fwww.portaldasmissoes.com.br%2Fuploads%2Fempreendimentos%2F0000406_regular_patrimonio_historico_de_sao_miguel_das_missoes-ruinas-sao-miguel-fone-iphan-prefeitura-som-e-luz-jesuitas-reducaosregiao-missoes.jpg&imgrefurl=https%3A%2F%2Fwww.portaldasmissoes.com.br%2Fempreendimentos%2Ftodos%2Fsitio-arqueologico-de-sao-miguel-arcanjo-reducao-406&docid=Ma7dN-ksrAaosM&tbnid=TT9Nqta0WE6PbM&vet=12ahUKEwjMhuafv8yXAxUJJrkGHSICFoYQnPAOegQIKhAA..i&w=480&h=251&hcb=2&ved=2ahUKEwjMhuafv8yXAxUJJrkGHSICFoYQnPAOegQIKhAA",
    imagemAlt: "Fileiras de videiras em uma propriedade rural",
    icone: "🍇",
    destaque: "Sabores da Serra",
  },
  {
    id: "missoes",
    nome: "Sítio Arqueológico de São Miguel Arcanjo",
    cidade: "São Miguel das Missões",
    categoria: "Cultura",
    resumo: "Ruínas que preservam a memória das Missões Jesuíticas Guarani.",
    descricao:
      "As ruínas de São Miguel Arcanjo são um importante testemunho da história das Missões Jesuíticas Guarani. O conjunto integra o Patrimônio Mundial da UNESCO. Consulte o museu e a programação local para planejar a visita.",
    imagem:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
",
    imagemAlt: "Edificação histórica de pedra sob o céu aberto",
    icone: "🏛",
    destaque: "Patrimônio histórico",
  },
  {
    id: "praia-da-guarita",
    nome: "Parque Estadual da Guarita",
    cidade: "Torres",
    categoria: "Litoral",
    resumo: "Falésias, mar e formações rochosas no litoral gaúcho.",
    descricao:
      "O parque reúne praias e formações rochosas marcantes junto ao mar em Torres. As paisagens mudam com a luz e as condições do oceano; respeite as áreas sinalizadas e as orientações de segurança.",
    imagem:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    imagemAlt: "Ondas do mar chegando à costa",
    icone: "🌊",
    destaque: "Litoral e falésias",
  },
  {
    id: "orla-guaiba",
    nome: "Orla do Guaíba",
    cidade: "Porto Alegre",
    categoria: "Cultura",
    resumo: "Um convite para caminhar e contemplar o pôr do sol na capital.",
    descricao:
      "A Orla do Guaíba é um espaço público de lazer junto ao lago, com áreas para caminhar, pedalar e encontrar amigos. O pôr do sol é um dos momentos mais apreciados por moradores e visitantes.",
    imagem:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85",
    imagemAlt: "Céu colorido ao entardecer sobre uma paisagem urbana",
    icone: "🌅",
    destaque: "Pôr do sol na capital",
  },
  {
    id: "centro-historico-pelotas",
    nome: "Centro Histórico de Pelotas",
    cidade: "Pelotas",
    categoria: "Cultura",
    resumo: "Casarões, praças e a tradição doceira da região sul.",
    descricao:
      "O centro de Pelotas guarda edifícios históricos e espaços culturais que contam parte da trajetória da cidade. A região também é conhecida por sua tradição doceira, celebrada em receitas e eventos locais.",
    imagem:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
    imagemAlt: "Fachada de um edifício histórico com detalhes arquitetônicos",
    icone: "🍬",
    destaque: "História e doçaria",
  },
];
