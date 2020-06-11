const btnCeleste = document.querySelector('#celeste');
const btnVioleta = document.querySelector('#violeta');
const btnNaranja = document.querySelector('#naranja');
const btnVerde = document.querySelector('#verde');
const btnEmpezar = document.querySelector('#btnEmpezar');

class Game {
    constructor() {
        this.startGame();
        this.generateSequence();
    }

    startGame() {
        //Hide start button
        btnEmpezar.classList.add('hide');
        this.level = 1;
        this.colors = {
            blueGreen: btnCeleste,
            purple: btnVioleta,
            orange: btnNaranja,
            green: btnVerde 
        };
    }

    generateSequence() {
        this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    
}

btnEmpezar.addEventListener('click', () => {
    window.game = new Game();   
});