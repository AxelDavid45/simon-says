const btnCeleste = document.querySelector('#celeste');
const btnVioleta = document.querySelector('#violeta');
const btnNaranja = document.querySelector('#naranja');
const btnVerde = document.querySelector('#verde');
const btnEmpezar = document.querySelector('#btnEmpezar');
const MAX_LEVEL = 2;

class Game {
    constructor() {
        this.colors = {
            blueGreen: btnCeleste,
            purple: btnVioleta,
            orange: btnNaranja,
            green: btnVerde 
        };

        this.chooseColor = this.chooseColor.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.startGame = this.startGame.bind(this);
        this.toogleBtnStart = this.toogleBtnStart.bind(this);
        this.startGame();

    }

    startGame() {
        this.level = 1;
        this.generateSequence();
        //Hide start button
        this.toogleBtnStart();
        setTimeout(this.nextLevel, 500);
    }

    toogleBtnStart() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
        } else {
            btnEmpezar.classList.add('hide');
        }
    }

    addClickEvents() {
        this.colors.blueGreen.addEventListener('click', this.chooseColor);
        this.colors.purple.addEventListener('click', this.chooseColor);
        this.colors.orange.addEventListener('click', this.chooseColor);
        this.colors.green.addEventListener('click', this.chooseColor);
    }

    deleteClickEvents() {
        this.colors.blueGreen.removeEventListener('click', this.chooseColor);
        this.colors.purple.removeEventListener('click', this.chooseColor);
        this.colors.orange.removeEventListener('click', this.chooseColor);
        this.colors.green.removeEventListener('click', this.chooseColor);
    }

    chooseColor(e) {
        // debugger;
        let buttonClicked = e.target.dataset.color;
        this.ligthBtn(buttonClicked);
        let colorNumber = this.transformColorToNumber(buttonClicked);

        if (colorNumber === this.sequence[this.sublevel]) {
            this.sublevel++;
            if(this.sublevel === this.level) {
                this.level++;
                this.deleteClickEvents();
                if(this.level === (MAX_LEVEL + 1)) {
                    this.wonGame();
                } else {
                    setTimeout(this.nextLevel, 2000);
                }
            }
        } else {
            this.deleteClickEvents();
            this.gameLost();
        }

    }

    nextLevel() {
        this.sublevel = 0;
        this.illuminateSequence();
        this.addClickEvents();
    }

    gameLost() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You lost the game',
          }).then(this.toogleBtnStart);
    }

    wonGame() {
        Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            text: 'You win the game',
          }).then(this.toogleBtnStart);
    }


    generateSequence() {
        this.sequence = new Array(MAX_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
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

    transformColorToNumber(color) {
        switch(color) {
            case 'blueGreen': 
                return 0;
            case 'purple': 
                return 1;
            case 'orange': 
                return 2;
            case 'green': 
                return 3;
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