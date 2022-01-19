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
function playGame() {

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
            break;
    }

    cellsRow = Math.sqrt(totalCells);
    const MAX_ATTEMPS = totalCells - TOTAL_BOMBS;

    // ! tutte le funzioni qui

    const generateBombs = (totalBombs, totalNumbers) => {
        const bombs = [];
        while (bombs.length < totalBombs) {
            const rndNum = getRandomNumber(1, totalNumbers);
            if (!bombs.includes(rndNum)) {
                bombs.push(rndNum);
            }
        }
        return bombs;
    }

    // generazione cella

    const generateCell = (number, cellsRow) => {
        const cell = document.createElement("div");
        cell.className = 'cell';
        cell.innerText = number;
        const cellSize = `calc(100% / ${cellsRow})`;
        cell.style.width = cellSize;
        cell.style.height = cellSize;

        return cell;
    }



    // gameover!
    const gameOver = (bombs, points, hasLost) => {
        showBombs(bombs);

        const messageElement = document.createElement('h3');
        messageElement.className = 'message';


        const messageText = hasLost ? `Peccato, hai perso! Punteggio: ${points}` : 'Hai vinto! Gioca ancora..'
        messageElement.innerText = messageText;

        gridElement.appendChild(messageElement)
    }

    //reset event listener a fine game

    const disableCell = (cell) => {
        const cloneCell = cell.cloneNode();
        cloneCell.innerText = cell.innerText;
        cloneCell.classList.add('disabled')
        cell.parentNode.replaceChild(cloneCell, cell)

        return cloneCell;
    }

    // al click della cella

    const onCellClick = (clickedCell, bombs, number) => {
        const disabledCell = disableCell(clickedCell);

        if (bombs.includes(number)) {
            gameOver(bombs, attemps, true);
        } else {
            disabledCell.classList.add('clicked');
            attemps++;
        }

        if (attemps === MAX_ATTEMPS) {
            gameOver(bombs, attemps, false);
        }
    }

    // mostra bombe


    const showBombs = (bombs) => {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const disabledCell = disableCell(cell)
            const cellNumber = parseInt(cell.innerText);
            if (bombs.includes(cellNumber)) disabledCell.classList.add('bomb');
        }
    }

    //GRIGLIA

    const generateGrid = (cellsNumber, cellsRow, bombs) => {
        for (let i = 1; i <= cellsNumber; i++) {
            const cell = generateCell(i, cellsRow);
            cell.addEventListener('click', (e) => onCellClick(e.target, bombs, i));

            gridElement.appendChild(cell);
        }
    }

    //!----------------------------
    //! exe!
    //!_____________________________

    const bombs = generateBombs(TOTAL_BOMBS, totalCells)
    console.table(bombs)

    generateGrid(totalCells, cellsRow, bombs);
}

// ! inizializzo variabili che mi servono per il DOM


const buttonElement = document.getElementById("button");


buttonElement.addEventListener('click', () => playGame());



