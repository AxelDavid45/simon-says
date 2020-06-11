const btnCeleste = document.querySelector('#celeste');
const btnVioleta = document.querySelector('#violeta');
const btnNaranja = document.querySelector('#naranja');
const btnVerde = document.querySelector('#verde');
const btnEmpezar = document.querySelector('#btnEmpezar');

class Game {
    constructor() {
        this.level = 7;

        this.colors = {
            blueGreen: btnCeleste,
            purple: btnVioleta,
            orange: btnNaranja,
            green: btnVerde 
        };

        this.startGame();
    }

    startGame() {
        this.generateSequence();
        //Hide start button
        btnEmpezar.classList.add('hide');

        this.nextLevel();
    }

    generateSequence() {
        this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.illuminateSequence();
    }

    transformNumberToBtn(number) {
        switch(number) {
            case 0: 
                return 'blueGreen';
            case 1: 
                return 'purple';
            case 2: 
                return 'orange';
            case 3: 
                return 'green';
        }
    }

    ligthBtn(buttonOn) {
        this.colors[buttonOn].classList.add('light');
        setTimeout(() => this.colors[buttonOn].classList.remove('light'), 300);
    }

    illuminateSequence() {
        for(let i = 0; i < this.level; i++) {
            let button = this.transformNumberToBtn(this.sequence[i]);
            setTimeout(() => this.ligthBtn(button), 1000 * i);
        }
    }

    
}

function startGame() {
    window.game = new Game();
}

btnEmpezar.addEventListener('click', startGame);