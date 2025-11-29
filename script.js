let pokemon = [];

window.onload = function() {
  const pokemonSalvo = localStorage.getItem('meusPokemon');
  if (pokemonSalvo) {
    pokemon = JSON.parse(pokemonSalvo);
    listarPokemon();
  }
};


let imagemSelecionada = null;


const inputImagem = document.getElementById('inputImagem');

inputImagem.addEventListener('change', (event) => {
  const arquivo = event.target.files[0];
  if (!arquivo) return;

  const leitor = new FileReader();
  leitor.onload = (e) => {
    imagemSelecionada = {
      src: e.target.result,
      nome: arquivo.name
    };
  };
  leitor.readAsDataURL(arquivo);
});

function salvarPokemon() {
  localStorage.setItem('meusPokemon', JSON.stringify(pokemon));
} 

const dadosTipos = {
    "Água": {
        forteContra: ["Fogo", "Terrestre", "Pedra"],
        fracoContra: ["Água", "Grama", "Dragão"],
        resisteA: ["Fogo", "Água", "Gelo", "Metálico"],
        fracoA: ["Grama", "Elétrico"]
    },
    "Dragão": {
        forteContra: ["Dragão"],
        fracoContra: ["Metálico", "Fada"],
        resisteA: ["Fogo", "Água", "Grama", "Elétrico"],
        fracoA: ["Gelo", "Dragão", "Fada"]
    },
    "Elétrico": {
        forteContra: ["Água", "Voador"],
        fracoContra: ["Grama", "Elétrico", "Dragão", "Terrestre"],
        resisteA: ["Elétrico", "Voador", "Metálico"],
        fracoA: ["Terrestre"]
    },
    "Fada": {
        forteContra: ["Lutador", "Dragão", "Sombrio"],
        fracoContra: ["Fogo", "Venenoso", "Metálico"],
        resisteA: ["Lutador", "Inseto", "Sombrio"],
        fracoA: ["Venenoso", "Metálico"]
    },
    "Fantasma": {
        forteContra: ["Psíquico", "Fantasma"],
        fracoContra: ["Sombrio"],
        resisteA: ["Venenoso", "Inseto"],
        fracoA: ["Fantasma", "Sombrio"]
    },
    "Fogo": {
        forteContra: ["Grama", "Gelo", "Inseto", "Metálico"],
        fracoContra: ["Fogo", "Água", "Pedra", "Dragão"],
        resisteA: ["Fogo", "Grama", "Gelo", "Inseto", "Metálico", "Fada"],
        fracoA: ["Água", "Terrestre", "Pedra"]
    },
    "Gelo": {
        forteContra: ["Grama", "Terrestre", "Voador", "Dragão"],
        fracoContra: ["Fogo", "Água", "Gelo", "Metálico"],
        resisteA: ["Gelo"],
        fracoA: ["Fogo", "Lutador", "Pedra", "Metálico"]
    },
    "Grama": {
        forteContra: ["Água", "Terrestre", "Pedra"],
        fracoContra: ["Fogo", "Grama", "Venenoso", "Voador", "Inseto", "Dragão", "Metálico"],
        resisteA: ["Água", "Grama", "Elétrico", "Terrestre"],
        fracoA: ["Fogo", "Gelo", "Venenoso", "Voador", "Inseto"]
    },
    "Inseto": {
        forteContra: ["Grama", "Psíquico", "Sombrio"],
        fracoContra: ["Fogo", "Lutador", "Venenoso", "Voador", "Fantasma", "Metálico", "Fada"],
        resisteA: ["Grama", "Lutador", "Terrestre"],
        fracoA: ["Fogo", "Voador", "Pedra"]
    },
    "Lutador": {
        forteContra: ["Normal", "Gelo", "Pedra", "Sombrio", "Metálico"],
        fracoContra: ["Venenoso", "Voador", "Psíquico", "Inseto", "Fantasma", "Fada"],
        resisteA: ["Inseto", "Pedra", "Sombrio"],
        fracoA: ["Voador", "Psíquico", "Fada"]
    },
    "Metálico": {
        forteContra: ["Gelo", "Pedra", "Fada"],
        fracoContra: ["Fogo", "Água", "Elétrico", "Metálico"],
        resisteA: ["Normal", "Grama", "Gelo", "Voador", "Psíquico", "Inseto", "Pedra", "Dragão", "Metálico", "Fada"],
        fracoA: ["Fogo", "Lutador", "Terrestre"]
    },
    "Normal": {
        forteContra: [],
        fracoContra: ["Pedra", "Metálico", "Fantasma"],
        resisteA: [],
        fracoA: ["Lutador"]
    },
    "Noturno": {
        forteContra: ["Fantasma", "Psíquico"],
        fracoContra: ["Lutador", "Sombrio", "Fada"],
        resisteA: ["Fantasma", "Psíquico", "Sombrio"],
        fracoA: ["Lutador", "Inseto", "Fada"]
    },
    "Pedra": {
        forteContra: ["Fogo", "Gelo", "Voador", "Inseto"],
        fracoContra: ["Lutador", "Terrestre", "Metálico"],
        resisteA: ["Normal", "Fogo", "Venenoso", "Voador"],
        fracoA: ["Água", "Grama", "Lutador", "Terrestre", "Metálico"]
    },
    "Psíquico": {
        forteContra: ["Lutador", "Venenoso"],
        fracoContra: ["Psíquico", "Metálico", "Sombrio"],
        resisteA: ["Lutador", "Psíquico"],
        fracoA: ["Inseto", "Fantasma", "Sombrio"]
    },
    "Sombrio": {
        forteContra: ["Psíquico", "Fantasma"],
        fracoContra: ["Lutador", "Sombrio", "Fada"],
        resisteA: ["Fantasma", "Sombrio"],
        fracoA: ["Lutador", "Inseto", "Fada"]
    },
    "Terrestre": {
        forteContra: ["Fogo", "Elétrico", "Venenoso", "Pedra", "Metálico"],
        fracoContra: ["Grama", "Inseto", "Voador"],
        resisteA: ["Venenoso", "Pedra"],
        fracoA: ["Água", "Grama", "Gelo"]
    },
    "Veneno": {
        forteContra: ["Fada", "Planta"],
        fracoContra: ["Terrestre", "Psíquico"],
        resisteA: ["Lutador", "Planta","Inseto", "Fada"],
        fracoA: ["Terrestre", "Psíquico"]
    },
    "Voador": {
        forteContra: ["Lutador", "Inseto", "Grama"],
        fracoContra: ["Elétrico", "Gelo", "Pedra", "Metálico"],
        resisteA: ["Terrestre", "Pedra"],
        fracoA: ["Elétrico", "Gelo", "Pedra", "Metálico"]
    }
    
  }

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("tipo2").value = "";
  document.getElementById("inputImagem").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("sexo").value = "";
  document.getElementById("geracao").value = "";
  imagemSelecionada = null;

}



function limparTodasListas() {
  for (let g = 1; g <= 9; g++) {
    const lista = document.getElementById(`lista-gen${g}`);
    if (lista) lista.innerHTML = "";
  }
}

function cardPokemon(p, index) {
  return `
    <li id="pokemon">
       <a href="pokemon/indexpokemon.html?id=${index}">
        <img src="${p.imagem}" alt="${p.nome}" height="120px">
      </a>
      <div class="informacoes">
        <p id="numero"> #${String(p.numero).padStart(4, '0')} </p>
        <h3 class="nome-pokemon">${p.nome}</h3>
        <a href="./type/${p.tipo}.html" class="itype ${p.tipo}">${p.tipo}<br/></a> 
        <button onclick="editarPokemon(${index})">Editar</button>
        <button onclick="excluirPokemon(${index})">Excluir</button>
      </div>
    </li>
  `;
}


function cardPokemon2(p, index) {
  return `
    <li id="pokemon">
       <a href="pokemon/indexpokemon.html?id=${index}">
        <img src="${p.imagem}" alt="${p.nome}" height="120px">
      </a>
      <div class="informacoes">
        <p id="numero"> #${String(p.numero).padStart(4, '0')} </p>
        <h3 class="nome-pokemon">${p.nome}</h3>
        <a href="./type/${p.tipo}.html" class="itype ${p.tipo}">${p.tipo}</a> · <a href="./type/${p.tipo2}.html" class="itype ${p.tipo2}">${p.tipo2}<br/></a> 
        <button onclick="editarPokemon(${index})">Editar</button>
        <button onclick="excluirPokemon(${index})">Excluir</button>
      </div>
    </li>
  `;
}



function listarPokemon() {
  limparTodasListas();

  for (let gen = 1; gen <= 9; gen++) {
    const lista = document.getElementById(`lista-gen${gen}`);
    if (!lista) continue;

    const pokemonOrdenado = pokemon
      .filter(p => p.geracao === gen)
      .sort((a, b) => a.numero - b.numero);

    pokemonOrdenado.forEach(p => { 
      const index = pokemon.indexOf(p);
      
      if(p.tipo2 != ""){  
        lista.innerHTML += cardPokemon2(p, index);
      } else {
        lista.innerHTML += cardPokemon(p, index);
      }
    });
  }
}





function addPokemon() {
  const nome = document.getElementById('nome').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const tipo = document.getElementById('tipo').value.trim();
  const tipo2 = document.getElementById('tipo2').value.trim();
  const geracao = document.getElementById('geracao').value.trim();
  const sexo = document.getElementById('sexo').value.trim();

  if (!nome || !tipo || !imagemSelecionada || !numero || !geracao || !sexo) {
    alert("Verifique se inseriu todos os dados e a imagem.");
    return;

  }

  pokemon.push({
    nome,
    tipo,
    tipo2,
    sexo,
    imagem: imagemSelecionada.src,
    numero: Number(numero),
    geracao: Number(geracao)
  });

  limparFormulario();
  listarPokemon();
  salvarPokemon();
}


function editarPokemon(index) {
  const novoNome = prompt("Novo nome:", pokemon[index].nome);
  const novoTipo = prompt("Novo tipo (digite um tipo já existente):", pokemon[index].tipo);

  let novoTipo2 = pokemon[index].tipo2;
  if (pokemon[index].tipo2 && pokemon[index].tipo2 !=="") {
    novoTipo2 = prompt("Novo segundo tipo (digite um tipo já existente):", pokemon[index].tipo2);
  }


  if (novoNome && novoTipo) {
    pokemon[index].nome = novoNome.trim();
    pokemon[index].tipo = novoTipo.trim();
    pokemon[index].tipo2 = novoTipo2 ? novoTipo2.trim() : "";
    listarPokemon();
    salvarPokemon();

  }
}

function excluirPokemon(index) {
  if (confirm("Você quer mesmo excluir este Pokémon?")) {
    pokemon.splice(index, 1);
    listarPokemon();
    salvarPokemon();

    
  }
}