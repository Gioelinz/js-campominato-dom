/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene 
un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - 
la cella si colora di rosso e la partita termina, 
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che
 l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle */

function getRandomNumber(min, max) {
    const rndNum = Math.floor(Math.random() * (max - min + 1)) + min

    return rndNum;
}
//! big function
const playGame = () => {

    buttonElement.innerText = "Ricomincia"
    gridElement.innerHTML = '';
    const gridElement = document.getElementById("grid");
    //! preparazione bombe e attemps


    let attemps = 0;
    const TOTAL_BOMBS = 16;

    function generateBombs(totalBombs, totalNumbers) {
        const bombs = []
        while (bombs.length < totalBombs) {
            const rndNum = getRandomNumber(1, totalNumbers);
            if (!bombs.includes(rndNum)) bombs.push(rndNum);
        }
        return bombs;
    }

    /* console.log(generateBombs(TOTAL_BOMBS, difficulty(10, 10))) */


    // ! funzione per difficoltà

    function difficulty(cells, columns) {
        const cell = cells;
        const column = columns;
        const totalCells = cell * column;

        return totalCells;
    }


    // ! creazione celle

    function createCells() {
        const cell = document.createElement("div");
        cell.className = 'cell';

        return cell
    }

    //! al click della cella

    function onCellClick(clickedCell, bombs, number) {
        clickedCell.removeEventListener('click', onCellClick);

        if (bombs.includes(number)) {
            //!gameover
        } else {
            clickedCell.classList.add('clicked');
            attemps++;
        }

        if (attemps === MAX_ATTEMPS) {
            //!gameover win
        }
    }

    // ! funzioni per la selezione della difficolta di gioco

    function easy() {
        const bombs = generateBombs(TOTAL_BOMBS, difficulty(10, 10));
        for (let i = 0; i < difficulty(10, 10); i++) {
            const cell = createCells();
            gridElement.appendChild(cell);
            cell.classList.add('easy');
            cell.innerHTML = `<p>${i + 1}</p>`;
            cell.addEventListener("click", (e) => {
                cell.removeEventListener('click', (e.target))
                if (bombs.includes(i)) {
                    cell.classList.add('bomb')
                } else {
                    cell.classList.add('clicked')
                    attemps++;
                }
            })
        }
        console.table(bombs)
    }

    function medium() {
        for (let i = 0; i < difficulty(9, 9); i++) {
            const cell = createCells();
            gridElement.appendChild(cell);
            cell.classList.add('medium');
            cell.innerHTML = `<p>${i + 1}</p>`;
            cell.addEventListener("click", () => {
                cell.classList.toggle('clicked')
            })
        }
    }

    function hard() {
        for (let i = 0; i < difficulty(7, 7); i++) {
            const cell = createCells();
            gridElement.appendChild(cell);
            cell.classList.add('hard');
            cell.innerHTML = `<p>${i + 1}</p>`;
            cell.addEventListener("click", () => {
                cell.classList.toggle('clicked')
            })
        }
    }


}

// ! inizializzo variabili che mi servono per il DOM

const difficultyElement = document.getElementById("difficulty");
const buttonElement = document.getElementById("button");




buttonElement.addEventListener('click', () => {
    buttonElement.innerText = "Ricomincia"
    gridElement.innerHTML = '';
    const selectDifficulty = difficultyElement.value;

    gridElement.style.display = 'flex';
    if (selectDifficulty == "easy") {
        easy()
    } else if (selectDifficulty == "medium") {
        medium()
    } else {
        hard()
    }

})

