const btnBlueGreen = document.querySelector('#celeste');
const btnPurple = document.querySelector('#violeta');
const btnOrange = document.querySelector('#naranja');
const btnGreen = document.querySelector('#verde');
const MAX_LEVEL = 3;

export default class Game {
    constructor() {
        this.colors = {
            blueGreen: btnBlueGreen,
            purple: btnPurple,
            orange: btnOrange,
            green: btnGreen 
        };

        //Preserve the context of this functions
        this.chooseColor = this.chooseColor.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.startGame = this.startGame.bind(this);
        this.toogleBtnStart = this.toogleBtnStart.bind(this);
        //Run the game
        this.startGame();

    }

    startGame() {
        this.level = 1;
        this.generateSequence();
        //Verify if the start button is visible
        this.toogleBtnStart();
        //Start a level
        setTimeout(this.nextLevel, 500);
    }

    generateSequence() {
        this.sequence = new Array(MAX_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    toogleBtnStart() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
        } else {
            btnEmpezar.classList.add('hide');
        }
    }

    nextLevel() {
        this.sublevel = 0;
        this.illuminateSequence();
        this.addClickEvents();
    }

    illuminateSequence() {
        for(let i = 0; i < this.level; i++) {
            let button = this.transformNumberToBtn(this.sequence[i]);
            setTimeout(() => this.ligthBtn(button), 1000 * i);
        }
    }

    ligthBtn(buttonOn) {
        this.colors[buttonOn].classList.add('light');
        setTimeout(() => this.colors[buttonOn].classList.remove('light'), 300);
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
        let buttonClicked = e.target.dataset.color;
        let colorNumber = this.transformColorToNumber(buttonClicked);

        this.ligthBtn(buttonClicked);

        //Verify if the number assign to every button matches with the click
        if (colorNumber === this.sequence[this.sublevel]) {
            //Sublevel of every level
            this.sublevel++;

            if(this.sublevel === this.level) {
                this.level++;
                this.deleteClickEvents();

                if(this.level === (MAX_LEVEL + 1)) {
                    this.gameWon();
                } else {
                    setTimeout(this.nextLevel, 2000);
                }

            }
        } else {
            this.deleteClickEvents();
            this.gameOver();
        }

    }
    

    //Throws an alert and restart the game
    gameOver() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You lost the game',
          }).then(this.toogleBtnStart);
    }

    //Throws an alert and restart the game
    gameWon() {
        Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            text: 'You win the game',
          }).then(this.toogleBtnStart);
    }

    //Transform the number to button for changing the color
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

    //Transform the color into a number to verify if matches with the sequence
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
}
