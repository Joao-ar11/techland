/*       
<li>
        <img src="https://via.placeholder.com/150x150" alt="algumaimagem1">
        <div class="item-details">
          <h3>Produto 1</h3>
          <p>Preço: R$10,00</p>
          <button class="remove-item"><img src="../img/marca-x.png" alt=""> Remover</button>
        </div>
      </li>
*/

adicionarProdutos(".cart-items", 2);
function adicionarProdutos(local, quantidade, atributo = "") {
    fetch("../javascript/produtos.json")
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
    const novoProduto = document.createElement("li");

    adicionarImagem(novoProduto, produto["imagem"]);
    const itemsDetails = document.createElement("div");
    itemsDetails.classList.add("items-details");
    adicionarNome(itemsDetails, produto["nome"]);

    adicionarPrecos(itemsDetails, produto["desconto"], produto["preco"]);

    adicionarBotao(itemsDetails);

    novoProduto.appendChild(itemsDetails);

    elemento.appendChild(novoProduto);
}

function adicionarImagem(local, nomeDaImagem) {
    const imagem = document.createElement("img");
    imagem.src = `../img/${nomeDaImagem}`
    local.appendChild(imagem);
}

function adicionarNome(local, nomeDoProduto) {
    const nome = document.createElement("h3");
    nome.textContent = nomeDoProduto;
    local.appendChild(nome);
}


function adicionarPrecos(local, desconto, precoSemDesconto) {
    
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
    buttonImage.src = "../img/marca-x.png";
    button.classList.add("remove-item");
    const span=document.createElement("span");
    span.textContent=" Remover";
    button.appendChild(buttonImage);
    button.appendChild(span)
    local.appendChild(button);
}