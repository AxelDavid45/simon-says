import game from './Game.js';
const btnEmpezar = document.querySelector('#btnEmpezar');
function startGame() {
    window.game = new game();
}

btnEmpezar.addEventListener('click', startGame);