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

    // reset
    const gridElement = document.getElementById("grid");
    gridElement.innerHTML = '';

    gridElement.style.display = 'flex';

    //! preparazione bombe e attemps


    let attemps = 0;
    const TOTAL_BOMBS = 16;



    // ! difficoltà

    const difficultyElement = document.getElementById("difficulty").value;

    let totalCells;
    let cellsRow;

    switch (difficultyElement) {
        case 'normal':
            totalCells = 81;
            break;
        case 'hard':
            totalCells = 49;
            break;
        default:
            //Easy
            totalCells = 100;
    }

    cellsRow = Math.sqrt(totalCells);
    const MAX_ATTEMPS = totalCells - TOTAL_BOMBS;

    // ! tutte le funzioni qui

    function generateBombs(totalBombs, totalNumbers) {
        const bombs = []
        while (bombs.length < totalBombs) {
            const rndNum = getRandomNumber(1, totalNumbers);
            if (!bombs.includes(rndNum)) bombs.push(rndNum);
        }
        return bombs;
    }

    // generazione cella
    function generateCell(number, cellsRow) {
        const cell = document.createElement("div");
        cell.className = 'cell';
        cell.innerText = number;
        const cellSize = `calc(100% / ${cellsRow})`;
        cell.style.width = cellSize;
        cell.style.height = cellsize;

        return cell;
    }


    //GRIGLIA

    function generateGrid(cellsNumber, cellsRow, bombs) {
        for (let i = 1; 1 < cellsNumber; i++) {
            const cell = generateCell(i, cellsRow);
            cell.addEventListener('click', (e) => onCellClick(e.target, bombs, i));

            gridElement.appendChild(cell);
        }
    }











    // ! creazione celle

    function createCells() {


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


const buttonElement = document.getElementById("button");


buttonElement.addEventListener('click', playGame)

// buttonElement.addEventListener('click', () => {
//     buttonElement.innerText = "Ricomincia"
//     gridElement.innerHTML = '';
//     const selectDifficulty = difficultyElement.value;


//     if (selectDifficulty == "easy") {
//         easy()
//     } else if (selectDifficulty == "medium") {
//         medium()
//     } else {
//         hard()
//     }

// })

