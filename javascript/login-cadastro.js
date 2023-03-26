const inputsDeInformacao = document.querySelectorAll(".informacao");
inputsDeInformacao.forEach((input) => {
    input.addEventListener("blur", () => {
        checarValidacaoDeInformacao(input);
        input.addEventListener("input", () => {
            checarValidacaoDeInformacao(input);
        });
    }, {"once": true});
});

const inputsDeSenha = document.querySelectorAll(".senha");
inputsDeSenha.forEach((input) => {
    input.addEventListener("input", () => checarValidacaoDeSenha(inputsDeSenha));
})

function checarValidacaoDeInformacao(elemento) {
    if (elemento.value === "" || !elemento.checkValidity()) {
        elemento.classList.remove("valido");
        elemento.classList.add("invalido");
    } else {
        elemento.classList.remove("invalido");
        elemento.classList.add("valido");
    }
}

function checarValidacaoDeSenha(listaDeInputs) {
    if (listaDeInputs[0].value !== listaDeInputs[1].value 
        || listaDeInputs[0].value === "" && listaDeInputs[1].value === "") {
        listaDeInputs[0].setCustomValidity("As senhas são diferentes");
        listaDeInputs[1].setCustomValidity("As senhas são diferentes");
        listaDeInputs[0].classList.remove("valido");
        listaDeInputs[1].classList.remove("valido");
        listaDeInputs[0].classList.add("invalido");
        listaDeInputs[1].classList.add("invalido");
    } else {
        listaDeInputs[0].setCustomValidity("");
        listaDeInputs[1].setCustomValidity("");
        listaDeInputs[0].classList.remove("invalido");
        listaDeInputs[1].classList.remove("invalido");
        listaDeInputs[0].classList.add("valido");
        listaDeInputs[1].classList.add("valido");
    }
}