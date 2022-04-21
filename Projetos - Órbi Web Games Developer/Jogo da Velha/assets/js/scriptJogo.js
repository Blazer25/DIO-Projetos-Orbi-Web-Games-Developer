let jogador = null
let vencedor = null
let jogadorSelecionado = document.getElementById('jogadorSelecionado')
let vencedorSelecionado = document.getElementById('vencedorSelecionado')

mudarQuemJoga('X')

function mudarQuemJoga(player) {
    jogador = player
    jogadorSelecionado.innerHTML = jogador
}

function selecionaQuadrado(id) {

    let quadrado = document.getElementById(id)

    if (quadrado.innerHTML !== '-') {
        return
    }

    quadrado.innerHTML = jogador
    quadrado.style.color = 'black'

    if (jogador === 'O') {
        jogador = 'X'
    } else {
        jogador = 'O'
    }

    mudarQuemJoga(jogador)
    checaQuemVence()

    let mostrarJogador = document.getElementById('mostrarJogador')
    mostrarJogador.innerHTML = `Jogador: ${jogador}`
}

function checaSequencia(q1, q2, q3) {
    let resultadoSequencia = false;

    if (q1.innerHTML !== '-' && q1.innerHTML === q2.innerHTML && q2.innerHTML === q3.innerHTML) {
        resultadoSequencia = true;
    }

    return resultadoSequencia
}

function checaQuemVence() {
    let quadrado1 = document.getElementById(1)
    let quadrado2 = document.getElementById(2)
    let quadrado3 = document.getElementById(3)
    let quadrado4 = document.getElementById(4)
    let quadrado5 = document.getElementById(5)
    let quadrado6 = document.getElementById(6)
    let quadrado7 = document.getElementById(7)
    let quadrado8 = document.getElementById(8)
    let quadrado9 = document.getElementById(9)

    if (checaSequencia(quadrado1, quadrado2, quadrado3)) {
        mudaCorQuadrado(quadrado1, quadrado2, quadrado3)
        mudarVencedor(quadrado1)
        return
    }

    if (checaSequencia(quadrado4, quadrado5, quadrado6)) {
        mudaCorQuadrado(quadrado4, quadrado5, quadrado6)
        mudarVencedor(quadrado4)
        return
    }

    if (checaSequencia(quadrado7, quadrado8, quadrado9)) {
        mudaCorQuadrado(quadrado7, quadrado8, quadrado9)
        mudarVencedor(quadrado7)
        return
    }

    if (checaSequencia(quadrado1, quadrado4, quadrado7)) {
        mudaCorQuadrado(quadrado1, quadrado4, quadrado7)
        mudarVencedor(quadrado1)
        return
    }

    if (checaSequencia(quadrado2, quadrado5, quadrado8)) {
        mudaCorQuadrado(quadrado2, quadrado5, quadrado8)
        mudarVencedor(quadrado2)
        return
    }

    if (checaSequencia(quadrado3, quadrado6, quadrado9)) {
        mudaCorQuadrado(quadrado3, quadrado6, quadrado9)
        mudarVencedor(quadrado3)
        return
    }

    if (checaSequencia(quadrado1, quadrado5, quadrado9)) {
        mudaCorQuadrado(quadrado1, quadrado5, quadrado9)
        mudarVencedor(quadrado1)
        return
    }

    if (checaSequencia(quadrado3, quadrado5, quadrado7)) {
        mudaCorQuadrado(quadrado3, quadrado5, quadrado7)
        mudarVencedor(quadrado3)
    }
}

function mudaCorQuadrado(q1, q2, q3) {
    q1.style.background = 'green'
    q2.style.background = 'green'
    q3.style.background = 'green'

    if (q1.style.background == 'green' && q2.style.background == 'green' && q3.style.background == 'green') {

        let oVencedorE = document.getElementById('mostrarVencedor')
        if (jogador === 'X') {
            oVencedorE.innerHTML = `O Vencedor é: O`
        } else {
            oVencedorE.innerHTML = `O Vencedor é: X`
        }

        setTimeout(() => {
            alert('Temos um vencedor, REINICIANDO...')
        }, 100)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }
}

function mudarVencedor(quadrado) {
    vencedor = quadrado.innerHTML;
    vencedorSelecionado.innerHTML = vencedor;
}

function reiniciar() {
    window.location.reload()
}