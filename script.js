"use strict";

/* =========================
   ELEMENTOS
========================= */

const corpo = document.body;

const aumentarFonte = document.getElementById("aumentarFonte");
const diminuirFonte = document.getElementById("diminuirFonte");
const contraste = document.getElementById("contraste");
const espacamento = document.getElementById("espacamento");
const resetar = document.getElementById("resetar");

const mensagem = document.getElementById(
    "mensagemAcessibilidade"
);

/* =========================
   TAMANHO DA FONTE
========================= */

const tamanhoMinimo = 14;
const tamanhoMaximo = 32;
const tamanhoPadrao = 18;

let tamanhoFonte =
    Number(localStorage.getItem("tamanhoFonte")) ||
    tamanhoPadrao;

function atualizarFonte() {
    document.documentElement.style.setProperty(
        "--tamanho-base",
        `${tamanhoFonte}px`
    );

    localStorage.setItem(
        "tamanhoFonte",
        tamanhoFonte
    );
}

function anunciar(texto) {
    mensagem.textContent = "";

    setTimeout(() => {
        mensagem.textContent = texto;
    }, 100);
}

aumentarFonte.addEventListener("click", () => {
    if (tamanhoFonte < tamanhoMaximo) {
        tamanhoFonte += 2;
        atualizarFonte();

        anunciar(
            `Tamanho do texto aumentado para ${tamanhoFonte} pixels.`
        );
    } else {
        anunciar(
            "O tamanho máximo do texto já foi atingido."
        );
    }
});

diminuirFonte.addEventListener("click", () => {
    if (tamanhoFonte > tamanhoMinimo) {
        tamanhoFonte -= 2;
        atualizarFonte();

        anunciar(
            `Tamanho do texto diminuído para ${tamanhoFonte} pixels.`
        );
    } else {
        anunciar(
            "O tamanho mínimo do texto já foi atingido."
        );
    }
});

/* =========================
   ALTO CONTRASTE
========================= */

function atualizarContraste() {
    const ativo =
        corpo.classList.contains("alto-contraste");

    contraste.setAttribute(
        "aria-pressed",
        ativo.toString()
    );

    contraste.textContent = ativo
        ? "Desativar alto contraste"
        : "Alto contraste";

    localStorage.setItem(
        "altoContraste",
        ativo
    );
}

contraste.addEventListener("click", () => {
    corpo.classList.toggle("alto-contraste");

    const ativo =
        corpo.classList.contains("alto-contraste");

    atualizarContraste();

    anunciar(
        ativo
            ? "Alto contraste ativado."
            : "Alto contraste desativado."
    );
});

/* =========================
   ESPAÇAMENTO
========================= */

function atualizarEspacamento() {
    const ativo =
        corpo.classList.contains("espacamento");

    espacamento.setAttribute(
        "aria-pressed",
        ativo.toString()
    );

    espacamento.textContent = ativo
        ? "Desativar espaçamento"
        : "Aumentar espaçamento";

    localStorage.setItem(
        "espacamento",
        ativo
    );
}

espacamento.addEventListener("click", () => {
    corpo.classList.toggle("espacamento");

    const ativo =
        corpo.classList.contains("espacamento");

    atualizarEspacamento();

    anunciar(
        ativo
            ? "Espaçamento do texto aumentado."
            : "Espaçamento do texto restaurado."
    );
});

/* =========================
   RESTAURAR CONFIGURAÇÕES
========================= */

resetar.addEventListener("click", () => {
    tamanhoFonte = tamanhoPadrao;

    corpo.classList.remove("alto-contraste");
    corpo.classList.remove("espacamento");

    atualizarFonte();
    atualizarContraste();
    atualizarEspacamento();

    anunciar(
        "Todas as configurações de acessibilidade foram restauradas."
    );
});

/* =========================
   CARREGAR PREFERÊNCIAS
========================= */

function carregarPreferencias() {
    const contrasteSalvo =
        localStorage.getItem("altoContraste");

    const espacamentoSalvo =
        localStorage.getItem("espacamento");

    if (contrasteSalvo === "true") {
        corpo.classList.add("alto-contraste");
    }

    if (espacamentoSalvo === "true") {
        corpo.classList.add("espacamento");
    }

    atualizarFonte();
    atualizarContraste();
    atualizarEspacamento();
}

carregarPreferencias();
