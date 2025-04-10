'use scrict'
//skuska spojenia
console.log("fungujemen - nefungujeme? fungujeme! :)")

//vytvorim premennu hraca
let currentPlayer = 'circle';

//vyberiem vsetky policka z gridu
const playingCells = document.querySelectorAll("button");

//skontrolujem ci mam vybratych vsetkych 100 policok :)
console.log(playingCells.length)

//vyberiem ikonu hraca
const player = document.querySelector('.game-board__player-icon img')



//vybrate bunky prechadzam funkciou forEach, kde na kazdy jeden prvkov(cell) pridavam eventListener a zaznamenam  pomocou event.targetu (vlastnosti objedktu udalosti) referenciu bunky na ktoru bolo kliknute  a tej pomocou metody classList menim pridavam triedu- kruh
playingCells.forEach((cell) => {
    cell.addEventListener('click', (evt) => {
        evt.target.disabled = true
        if (currentPlayer === 'circle') {
            //zaroven to vnaram do podmienky- v ktorej zabezpecujem zmenu hraca cez dodobratie a pridanie tried
            evt.target.classList.add("board__field--circle");
            evt.target.classList.remove("board__field--cross");


        } else if (currentPlayer === 'cross') {
            evt.target.classList.add("board__field--cross");
            evt.target.classList.remove("board__field--circle");

        }


        //zmena hraca na hornej ikone - pridam podmienku- ak klikne= zahra hrac s kruhom, tak sa zmeni aktualny hrac na kriz a opacne
        if (currentPlayer === 'circle') {
            currentPlayer = 'cross';
            player.src = "/pictures/cross.svg";

        } else if (currentPlayer === 'cross') {
            currentPlayer = 'circle';
            player.src = "/pictures/circle.svg";
        }
        console.log(currentPlayer);
    })
});


//bezpecnostne opatrenie

const restartBtn = document.querySelector(".game-board__button--restart")
restartBtn.addEventListener("click", (e) => {
    if (window.confirm("Fakt chces restartovat hru?")) {
    } else {
        e.preventDefault()
    }
}); 8

