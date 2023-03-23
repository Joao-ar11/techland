for (let i = 0; i < 4; i++) {
    adicionarProdutos(".mais-vendidos");
}

for (let i = 0; i < 4; i++) {
    adicionarProdutos(".descontos-da-semana");
}

function adicionarProdutos(local) {
    fetch("./javascript/produtos.json")
        .then((json) => json.json())
        .then((produtos) => {
            adicionarElementos(local, produtos[0]);
        });
}

function adicionarElementos(local, produto) {
    const elemento = document.querySelector(local);
    const id = produto["id"]
    const link = document.createElement("a");
    link.href = `./pages/produto.html?=${id}`;
    link.style["text-decoration"] = "none";
    link.style["color"] = "inherit";
    elemento.appendChild(link);

    const novoProduto = document.createElement("div");
    novoProduto.classList.add("produto");

    const nomeDaImagem = produto["imagem"];
    const imagem = document.createElement("img");
    imagem.src = `./img/${nomeDaImagem}`
    novoProduto.appendChild(imagem);

    const nomeDoProduto = produto["nome"] 
    const nome = document.createElement("p");
    nome.classList.add("nome")
    nome.textContent = nomeDoProduto;
    novoProduto.appendChild(nome);

    const quantidadeDeEstrelas = produto["estrelas"];
    const quantidadeDeReviews = produto["reviews"];
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
    novoProduto.appendChild(estrelas);

    const desconto = produto["desconto"];

    let precoSemDesconto = produto["preco"];
    const precoAntigo = document.createElement("p");
    precoAntigo.classList.add("preco-antigo");
    if (desconto !== 0) {
        precoAntigo.textContent = `R$${precoSemDesconto.toFixed(2)}`.replace(".", ",")
    }
    novoProduto.appendChild(precoAntigo);

    const button = document.createElement("button");
    button.type = "button";
    const buttonImage = document.createElement("img");
    buttonImage.src = "./img/nao-favorito.png";
    button.appendChild(buttonImage);
    novoProduto.appendChild(button);

    const precoAtual = document.createElement("p");
    precoAtual.classList.add("preco")
    if (desconto !== 0) {
        precoAtual.textContent = `R$${(precoSemDesconto - (precoSemDesconto * desconto / 100)).toFixed(2)}`.replace(".", ",");
    } else {
        precoAtual.textContent = `R$${precoSemDesconto.toFixed(2)}`.replace(".", ",");
    }
    novoProduto.appendChild(precoAtual);

    link.appendChild(novoProduto);
}