adicionarProdutos(".mais-vendidos", 4, "reviews");

adicionarProdutos(".descontos-da-semana", 4, "desconto");

function adicionarProdutos(local, quantidade, atributo = "") {
    fetch("./javascript/produtos.json")
        .then((json) => json.json())
        .then((produtos) => {
            if (atributo !== "") {
                listaOrdenada = produtos.sort((a, b) => {
                if (a[atributo] > b [atributo]) {
                    return -1;
                } else if (a[atributo] < b[atributo]) {
                    return 1;
                } else {
                    return 0;
                }
                });
                for (let i = 0; i < quantidade; i++) {
                    adicionarElementos(local, listaOrdenada[i]);
                }
            } else {
                for (let i = 0; i < quantidade; i++) {
                    adicionarElementos(local, produtos[i]);
                }
            }
        });
}

function adicionarElementos(local, produto) {
    const elemento = document.querySelector(local);
    const id = produto["id"];
    const link = document.createElement("a");
    link.href = `./pages/produto.html?id=${id}`;
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
    imagem.src = `./img/${nomeDaImagem}`
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
    buttonImage.src = "./img/nao-favorito.png";
    button.appendChild(buttonImage);
    local.appendChild(button);
}