const naveJogador = document.querySelector('.player-shooter');
const areaJogavel = document.querySelector('#main-play-area');
const imgInimigos = ['src/img/monster-1.png', 'src/img/monster-2.png', 'src/img/monster-3.png'];
const instrucoesJogo = document.querySelector('.game-instructions');
const btnIniciar = document.querySelector('.start-button');
let intervaloAlien;
let contador = 0
let contadorInimigos = 0

function FazerNaveVoar(e) {
    if (e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        VoarParaCima();
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        e.preventDefault();
        VoarParaBaixo();
    } else if (e.key === " ") {
        e.preventDefault();
        Atirar();
    }
}

function VoarParaCima() {
    let posicaoTopo = getComputedStyle(naveJogador).getPropertyValue('top');
    if (posicaoTopo === "0px") {
        return
    } else {
        let position = parseInt(posicaoTopo);
        position -= 50;
        naveJogador.style.top = `${position}px`;
    }
}

function VoarParaBaixo() {
    let posicaoTopo = getComputedStyle(naveJogador).getPropertyValue('top');
    if (posicaoTopo === "510px") {
        return
    } else {
        let position = parseInt(posicaoTopo);
        position += 50;
        naveJogador.style.top = `${position}px`;
    }
}

function Atirar() {
    let laser = CriarElementoTiroLaser();
    areaJogavel.appendChild(laser);
    moveLaser(laser);
    contador++

    document.getElementById('tiros-dados').innerHTML = contador

}

function CriarElementoTiroLaser() {
    let posicaoX = parseInt(window.getComputedStyle(naveJogador).getPropertyValue('left'));
    let posicaoY = parseInt(window.getComputedStyle(naveJogador).getPropertyValue('top'));
    let novoLaser = document.createElement('img');
    novoLaser.src = 'src/img/shoot.png';
    novoLaser.classList.add('laser');
    novoLaser.style.left = `${posicaoX}px`;
    novoLaser.style.top = `${posicaoY - 10}px`;
    return novoLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let posicaoX = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca o src da imagem
            if (checarColisaoComLaser(laser, alien)) {
                alien.src = 'src/img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
                contadorInimigos++

                document.getElementById('inimigos-mortos').innerHTML = contadorInimigos
            }
        })

        if (posicaoX === 340) {
            laser.remove();
        } else {
            laser.style.left = `${posicaoX + 8}px`;
        }
    }, 10);
}

//fun????o para criar inimigos aleat??rios
function createAliens() {
    let novoAlien = document.createElement('img');
    let alienSprite = imgInimigos[Math.floor(Math.random() * imgInimigos.length)]; //sorteio de imagens
    novoAlien.src = alienSprite;
    novoAlien.classList.add('alien');
    novoAlien.classList.add('alien-transition');
    novoAlien.style.left = '370px';
    novoAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    areaJogavel.appendChild(novoAlien);
    moveAlien(novoAlien);
}

//fun????o para movimentar os inimigos
function moveAlien(alien) {
    moveintervaloAlien = setInterval(() => {
        let posicaoX = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if (posicaoX <= 50) {
            if (Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                FimDoJogo();
            }
        } else {
            alien.style.left = `${posicaoX - 4}px`;
        }
    }, 30);
}

function checarColisaoComLaser(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if (laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

btnIniciar.addEventListener('click', (e) => {
    jogarJogo();
})

function jogarJogo() {
    btnIniciar.style.display = 'none';
    instrucoesJogo.style.display = 'none';
    window.addEventListener('keydown', FazerNaveVoar);
    intervaloAlien = setInterval(() => {
        createAliens();
    }, 2000);
}

function FimDoJogo() {
    window.removeEventListener('keydown', FazerNaveVoar);
    clearInterval(intervaloAlien);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('Voc?? perdeu, tente novamente!!');
        naveJogador.style.top = "250px";
        btnIniciar.style.display = "block";
        instrucoesJogo.style.display = "block";
        window.location.href = 'index.html'
    });
}