/* L'utente indica TRAMITE DOM un livello di difficoltà in base al quale viene generata
una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. */

// ! funzione per difficoltà
function difficulty(cells, columns) {
    const Cells = cells;
    const Columns = columns;
    const TotalCells = Cells * Columns;

    return TotalCells;
}

// ! creazione celle

function createCells() {
    const cell = document.createElement("div");
    cell.className = 'cell';

    return cell
}

// ! funzioni per la selezione della difficolta di gioco

function easy() {
    for (let i = 0; i < difficulty(7, 7); i++) {
        const cell = createCells();
        gridElement.appendChild(cell);
        cell.classList.add('easy');
        cell.innerHTML = `<p>${i + 1}</p>`;
        cell.addEventListener("click", () => {
            cell.classList.toggle('clicked')
        })
    }
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
    for (let i = 0; i < difficulty(10, 10); i++) {
        const cell = createCells();
        gridElement.appendChild(cell);
        cell.classList.add('hard');
        cell.innerHTML = `<p>${i + 1}</p>`;
        cell.addEventListener("click", () => {
            cell.classList.toggle('clicked')
        })
    }
}


// ! inizializzo variabili che mi servono per il DOM

const difficultyElement = document.getElementById("difficulty");
const buttonElement = document.getElementById("button");
const gridElement = document.getElementById("grid");



buttonElement.addEventListener('click', () => {
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

    /* buttonElement.disabled = true */
})

