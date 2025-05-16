import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

'use strict'
console.log("fungujemen - nefungujeme? fungujeme! :)")

let currentPlayer = 'circle';
let isWaitingForAI = false;

const playingCells = document.querySelectorAll(".game-board__cell");
console.log(playingCells.length);

const player = document.querySelector('.game-board__player-icon img');

const toggleCellsDisabled = (disabled) => {
    playingCells.forEach(cell => {
        if (!cell.classList.contains("board__field--circle") && !cell.classList.contains("board__field--cross")) {
            cell.disabled = disabled;
        }
    });
}

const aiMove = async () => {
    isWaitingForAI = true;
    toggleCellsDisabled(true);

    const board = Array.from(playingCells).map(cell => {
        if (cell.classList.contains("board__field--circle")) {
            return 'o';
        } else if (cell.classList.contains("board__field--cross")) {
            return 'x';
        } else {
            return '_';
        }
    });

    const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            board: board,
            player: 'x',
        }),
    });

    const data = await response.json();
    const { x, y } = data.position;
    const index = x + y * 10;

    // Tu priamo nastavujeme políčko pre AI
    const cell = playingCells[index];
    if (!cell.classList.contains("board__field--circle") && !cell.classList.contains("board__field--cross")) {
        cell.classList.add("board__field--cross");
        cell.disabled = true;
    }

    isWaitingForAI = false;
    toggleCellsDisabled(false);

    // Po AI ťahu meníme hráča späť na circle
    currentPlayer = 'circle';
    player.src = "pictures/circle.svg";

    await checkGameStatus();
}

const checkGameStatus = async () => {
    const valuePlayingCell = Array.from(playingCells).map(cell => {
        if (cell.classList.contains("board__field--circle")) {
            return 'o';
        } else if (cell.classList.contains("board__field--cross")) {
            return 'x';
        } else {
            return '_';
        }
    });

    console.log(valuePlayingCell);
    console.log('Typy hodnôt v poli:', valuePlayingCell.map((v) => typeof v));

    const winner = findWinner(valuePlayingCell);
    if (winner === 'o' || winner === 'x') {
        setTimeout(() => {
            alert(`Vyhrál hráč se symbolem ${winner}.`);
            location.reload();
        }, 200);
    } else if (winner === 'tie') {
        setTimeout(() => {
            alert("Hra skončila remízou!");
            location.reload();
        }, 200);
    } else {
        // Ak je na rade AI, zavoláme jej ťah
        if (currentPlayer === 'cross' && !isWaitingForAI) {
            await aiMove();
        }
    }
};

playingCells.forEach((cell) => {
    cell.addEventListener('click', async (evt) => {
        if (isWaitingForAI) return; // ignoruj kliknutia počas AI ťahu
        if (cell.classList.contains("board__field--circle") || cell.classList.contains("board__field--cross")) return; // obsadené políčko

        evt.target.disabled = true;

        if (currentPlayer === 'circle') {
            evt.target.classList.add("board__field--circle");
            evt.target.classList.remove("board__field--cross");

            // Po tvojom ťahu prepni na AI
            currentPlayer = 'cross';
            player.src = "pictures/cross.svg";

            await checkGameStatus(); // Toto spustí AI ťah

            // Po AI ťahu prepni hráča späť na kružok
            currentPlayer = 'circle';
            player.src = "pictures/circle.svg";

        } else {
            // Ak by si náhodou hral krížikom (čo by nemal), tu môžeš pridať ochranu
            console.log("Nie si na rade.");
        }

        console.log('Aktuálny hráč:', currentPlayer);
    });
});
const restartBtn = document.querySelector(".game-board__button--restart")
restartBtn.addEventListener("click", (e) => {
    if (!window.confirm("Fakt chces restartovat hru?")) {
        e.preventDefault();
    }
});









// // ----------------------------------------------------------------------------------komentarrra
// import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

// 'use strict'
// //skuska spojenia
// console.log("fungujemen - nefungujeme? fungujeme! :)")

// //vytvorim premennu hraca
// let currentPlayer = 'circle';

// //premenna na zablokovanie vstupu počas AI ťahu
// let isWaitingForAI = false;

// //vyberiem vsetky policka z gridu
// const playingCells = document.querySelectorAll(".game-board__cell");

// //skontrolujem ci mam vybratych vsetkych 100 policok :)
// console.log(playingCells.length)

// //vyberiem ikonu hraca
// const player = document.querySelector('.game-board__player-icon img')


// const toggleCellsDisabled = (disabled) => {
//     playingCells.forEach(cell => {
//         if (!cell.classList.contains("board__field--circle") && !cell.classList.contains("board__field--cross")) {
//             cell.disabled = disabled;
//         }
//     });
// }

// // Funkcia, ktorá odošle ťah AI pre krížik
// const aiMove = async () => {
//     const board = Array.from(playingCells).map(cell => {
//         if (cell.classList.contains("board__field--circle")) {
//             return 'o';
//         } else if (cell.classList.contains("board__field--cross")) {
//             return 'x';
//         } else {
//             return '_';
//         }
//     });

//     toggleCellsDisabled(true); // zakáž kliknutia počas čakania

//     const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
//         method: 'POST',
//         headers: { 'Content-type': 'application/json' },
//         body: JSON.stringify({
//             board: board,
//             player: 'x',
//         }),
//     });

//     const data = await response.json();
//     const { x, y } = data.position;
//     const index = x + y * 10;
//     playingCells[index].click(); // Simulujeme klik na políčko

//     toggleCellsDisabled(false); // odblokuj po ťahu AI
// }

// // Ziskavam hodnoty zo vsetkych policok, tak ze si zmenim NodeList, ktory som ziskala z querryselectorall na Array, na ktore potom spustim map, cim ziskam nove pole, ktore obsahu hodnoty kazdej bunky


// const checkGameStatus = async () => {
//     const valuePlayingCell = Array.from(playingCells).map(cell => {
//         if (cell.classList.contains("board__field--circle")) {
//             return 'o';
//         } else if (cell.classList.contains("board__field--cross")) {
//             return 'x';
//         } else {
//             return '_';
//         }

//     })

//     // kontrola vytvoreneho pola
//     console.log(valuePlayingCell)
//     console.log('Typy hodnôt v poli:', valuePlayingCell.map((v) => typeof v));


//     // stanovenie vitaza
//     const winner = findWinner(valuePlayingCell);
//     if (winner === 'o' || winner === 'x') {
//         setTimeout(() => {
//             alert(`Vyhrál hráč se symbolem ${winner}.`);
//             location.reload(); // voliteľné
//         }, 200);
//     } else if (winner === 'tie') {
//         setTimeout(() => {
//             alert("Hra skončila remízou!");
//             location.reload(); // voliteľné, aby sa hra reštartovala po remíze
//         }, 200);
//     } else if (currentPlayer === 'cross') {
//         await aiMove(); // ak je na rade AI, odošleme jej ťah
//     }

//     // Ak hra ešte neskončila
//     else {
//         console.log("Hra pokračuje, ešte nie je víťaz.");
//     }
// };





// //vybrate bunky prechadzam funkciou forEach, kde na kazdy jeden prvkov(cell) pridavam eventListener a zaznamenam  pomocou event.targetu (vlastnosti objedktu udalosti) referenciu bunky na ktoru bolo kliknute  a tej pomocou metody classList menim pridavam triedu- kruh
// playingCells.forEach((cell) => {
//     cell.addEventListener('click', async (evt) => {
//         evt.target.disabled = true
//         if (currentPlayer === 'circle') {
//             //zaroven to vnaram do podmienky- v ktorej zabezpecujem zmenu hraca cez odobratie a pridanie tried
//             evt.target.classList.add("board__field--circle");
//             evt.target.classList.remove("board__field--cross");


//         } else if (currentPlayer === 'cross') {
//             evt.target.classList.add("board__field--cross");
//             evt.target.classList.remove("board__field--circle");

//         }



//         //zmena hraca na hornej ikone - pridam podmienku- ak klikne= zahra hrac s kruhom, tak sa zmeni aktualny hrac na kriz a opacne
//         if (currentPlayer === 'circle') {
//             currentPlayer = 'cross';
//             player.src = "pictures/cross.svg";

//         } else if (currentPlayer === 'cross') {
//             currentPlayer = 'circle';
//             player.src = "pictures/circle.svg";
//         }
//         await checkGameStatus();
//         console.log(currentPlayer);

//         if (currentPlayer === 'cross') {

//         }
//     })
// });





// //bezpecnostne opatrenie

// const restartBtn = document.querySelector(".game-board__button--restart")
// restartBtn.addEventListener("click", (e) => {
//     if (window.confirm("Fakt chces restartovat hru?")) {
//     } else {
//         e.preventDefault()
//     }
// });

