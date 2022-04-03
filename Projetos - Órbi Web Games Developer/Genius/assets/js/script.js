/*
NÚMERO QUE REPRESENTA CADA COR:

0 = vermelho
1 = azul
2 = amarelo
3 = verde
*/

let ordem = []
let ordemClicado = []
let = pontuacao = 0

const vermelho = document.querySelector(".vermelho")
const azul = document.querySelector(".azul")
const amarelo = document.querySelector(".amarelo")
const verde = document.querySelector(".verde")

//Cria a ordem aleatório das quatro cores
function embaralhaOrdem() {
    //Arredonda a ordem das cores e sorteia um número de 0 a 3
    let ordemCores = Math.floor(Math.random() * 4)
    ordem[ordem.length] = ordemCores
    ordemClicado = []

    for (let i in ordem) {
        let corElementar = criarCorElementar(ordem[i])
        corClara(corElementar, Number(i) + 1)
    }
}

//Responsável por acender a próxima cor
function corClara(elemento, tempo) {
    tempo = tempo * 500
    setTimeout(() => {
        elemento.classList.add('selecionado')
    }, tempo - 500)
    setTimeout(() => {
        elemento.classList.remove('selecionado')
    }, tempo + 500)
}

//Verifica a ordem dos botões, se os clicks são mesmos que a ordem gerada
let checarOrdem = () => {
    for (let i in ordemClicado) {
        if (ordemClicado[i] != ordem[i]) {
            fimJogo()
            break
        }
    }
    if (ordemClicado.length == ordem.length) {
        alert(`Sua pontuação é: ${pontuacao}\n Acertou.\n Iniciando próximo nivel.`)
        proximoNivel()
    }
}

//clique do usuario
function click(cor) {
    ordemClicado[ordemClicado.length] = cor
    criarCorElementar(cor).classList.add('selecionado')

    setTimeout(() => {
        criarCorElementar(cor).classList.remove('selecionado')
        checarOrdem()
    }, 250)


}

//Retornar a cor
function criarCorElementar(cor) {
    if (cor == 0) {
        return vermelho
    } else if (cor == 1) {
        return azul
    } else if (cor == 2) {
        return amarelo
    } else if (cor == 3) {
        return verde
    }
}

//Próximo nivel
function proximoNivel() {
    pontuacao++
    embaralhaOrdem()
}

//Fim de jogo
function fimJogo() {
    alert(`Pontuação: ${pontuacao}!\nVocê perdeu!\nClique para iniciar um novo jogo`);
    ordem = []
    ordemClicado = []

    iniciarJogo()
}

//Inicia um jogo
function iniciarJogo() {
    alert('Bem-vindo e bom jogo')
    pontuacao = 0

    proximoNivel()
}

//Evento de clique para cada cor
vermelho.onclick = () => click(0)
azul.onclick = () => click(1)
amarelo.onclick = () => click(2)
verde.onclick = () => click(3)

//Jogar o jogo
iniciarJogo()