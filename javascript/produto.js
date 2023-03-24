const urlString = window.location.href;
const url = new URL(urlString);
const id = url.searchParams.get("id");
const produto = buscarProduto(id);

function buscarProduto(id) {
    fetch("../javascript/produtos.json")
        .then((json) => json.json())
        .then((produtos) => {
            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i]["id"] == id) {
                    carregarProduto(produtos[i]);
                }
            };
            return produtos[-1];
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
    const precoAntigo = document.querySelector("#preco-antigo p");
    precoAntigo.textContent = `R$${precoSemDesconto.toFixed(2)}`;
    const precoAtual = document.querySelector("#preco p");
    precoAtual.textContent = `R$${(precoSemDesconto - (precoSemDesconto * desconto / 100)).toFixed(2)}`;
}

function carregarFichaTecnica(conteudoDaFicha) {
    const ficha = document.querySelector("#fim p");
    ficha.textContent = conteudoDaFicha;
}