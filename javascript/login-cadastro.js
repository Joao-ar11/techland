const inputsDeInformacao = document.querySelectorAll(".informacao");
inputsDeInformacao.forEach((input) => {
    input.addEventListener("blur", () => {
        checarValidacao(input);
        input.addEventListener("input", () => {
            checarValidacao(input);
        });
    }, {"once": true});
});

function checarValidacao(elemento) {
    if (elemento.value === "" || !elemento.checkValidity()) {
        elemento.classList.remove("valido");
        elemento.classList.add("invalido");
    } else {
        elemento.classList.remove("invalido");
        elemento.classList.add("valido");
    }
}

