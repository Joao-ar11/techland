const url = new URL(window.location.href);
const id = +url.searchParams.get("id");
buscarProduto(id);
adicionarSimilares(id);

function buscarProduto(id) {
    fetch("../javascript/produtos.json")
        .then((json) => json.json())
        .then((produtos) => {
            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i]["id"] == id) {
                    carregarProduto(produtos[i]);
                }
            };
        });
}

function carregarProduto(produto) {
    carregarNome(produto["nome"]);

    carregarReviews(produto["estrelas"], produto["reviews"]);

    carregarImagem(produto["imagem"]);

    carregarPreco(produto["preco"], produto["desconto"]);

    carregarFichaTecnica(produto["ficha-tecnica"])
}

function carregarNome(nomeDoProduto) {
    const nome = document.querySelector("#nome h2");
    nome.textContent = nomeDoProduto;
}

function carregarReviews(quantidadeDeEstrelas, quantidadeDeReviews) {
    const avaliacao = document.querySelector("#avaliacao h3");
    for (let i = 1; i <= 5; i++) {
        if (i <= quantidadeDeEstrelas) {
            avaliacao.textContent += "★";
        } else {
            avaliacao.textContent += "☆";
        }
    }
    avaliacao.textContent += `(${quantidadeDeReviews})`
}

function carregarImagem(nomeDaImagem) {
    imagem = document.querySelector("#img img");
    imagem.src = `../img/${nomeDaImagem}`
}

function carregarPreco(precoSemDesconto, desconto) {
    if (desconto !== 0) {
        const precoAntigo = document.querySelector("#preco-antigo p");
        precoAntigo.textContent = `R$${precoSemDesconto.toFixed(2)}`;
    }
    const precoAtual = document.querySelector("#preco p");
    precoAtual.textContent = `R$${(precoSemDesconto - (precoSemDesconto * desconto / 100)).toFixed(2)}`;
}

function carregarFichaTecnica(conteudoDaFicha) {
    const ficha = document.querySelector("#fim p");
    ficha.textContent = conteudoDaFicha;
    ficha.style.whiteSpace = "pre-line";
}

function adicionarSimilares(id) {
    fetch("../javascript/produtos.json")
    .then((json) => json.json())
    .then((produtos) => {
        const listaSimilares = [];
        const listaCategorias = produtos[id]["categorias"].split(", ");
        for (let i = 0; i < produtos.length; i++) {
            let contador = 0;
            for (let j = 0; j < listaCategorias.length; j++) {
                if (produtos[i]["categorias"].includes(listaCategorias[j]) 
                    && produtos[i]["id"] !== id) {
                    listaSimilares.push(produtos[i]);
                    contador++;
                    break;
                }
            }
            if (contador === 4) {
                break;
            }
        }
        listaSimilares.forEach(produto => {adicionarElementos("#produtos", produto);});
    });
}

function adicionarElementos(local, produto) {
    const elemento = document.querySelector(local);
    const id = produto["id"];
    const link = document.createElement("a");
    link.href = `../pages/produto.html?id=${id}`;
    link.style["text-decoration"] = "none";
    link.style["color"] = "inherit";
    elemento.appendChild(link);

    const novoProduto = document.createElement("div");
    novoProduto.classList.add("produto");

    adicionarImagem(novoProduto, produto["imagem"]);

    adicionarNome(novoProduto, produto["nome"]);

    adicionarReviews(novoProduto, produto["estrelas"], produto["reviews"]);

    adicionarPrecos(novoProduto, produto["desconto"], produto["preco"]);

    adicionarBotao(novoProduto);

    link.appendChild(novoProduto);
}

function adicionarImagem(local, nomeDaImagem) {
    const imagem = document.createElement("img");
    imagem.src = `../img/${nomeDaImagem}`
    local.appendChild(imagem);
}

function adicionarNome(local, nomeDoProduto) {
    const nome = document.createElement("p");
    nome.classList.add("nome")
    nome.textContent = nomeDoProduto;
    local.appendChild(nome);
}

function adicionarReviews(local, quantidadeDeEstrelas, quantidadeDeReviews) {
    const estrelas = document.createElement("p");
    estrelas.classList.add("estrelas");
    const spanEstrelas = document.createElement("span");
    spanEstrelas.classList.add("estrela")
    for (let i = 1; i <= 5; i++) {
        if (i <= quantidadeDeEstrelas) {
            spanEstrelas.textContent += "★";
        } else {
            spanEstrelas.textContent += "☆";
        }
    }
    estrelas.appendChild(spanEstrelas);
    const spanReviews = document.createElement("span");
    spanReviews.classList.add("quantidade");
    spanReviews.textContent = `(${quantidadeDeReviews})`
    estrelas.appendChild(spanReviews);
    local.appendChild(estrelas);
}

function adicionarPrecos(local, desconto, precoSemDesconto) {
    const precoAntigo = document.createElement("p");
    precoAntigo.classList.add("preco-antigo");
    if (desconto !== 0) {
        precoAntigo.textContent = `R$${precoSemDesconto.toFixed(2)}`.replace(".", ",")
    }
    local.appendChild(precoAntigo);

    const precoAtual = document.createElement("p");
    precoAtual.classList.add("preco")
    if (desconto !== 0) {
        precoAtual.textContent = `R$${(precoSemDesconto - (precoSemDesconto * desconto / 100)).toFixed(2)}`.replace(".", ",");
    } else {
        precoAtual.textContent = `R$${precoSemDesconto.toFixed(2)}`.replace(".", ",");
    }
    local.appendChild(precoAtual);
}

function adicionarBotao(local) {
    const button = document.createElement("button");
    button.type = "button";
    const buttonImage = document.createElement("img");
    buttonImage.src = "../img/nao-favorito.png";
    button.appendChild(buttonImage);
    local.appendChild(button);
}