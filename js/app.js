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
    }

    
}

btnEmpezar.addEventListener('click', () => {
    const game = new Game();   
});