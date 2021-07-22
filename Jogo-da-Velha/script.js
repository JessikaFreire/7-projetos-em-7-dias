// Inicial Data

let square = 
{
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let vez = '';
let warning = '';
let playing = false;

reset();

// Events

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item =>
    {
        item.addEventListener('click', itemClick);
    });

// Functions

function itemClick(event) {
    let item = event.target.getAttribute('data-item');

    if(playing && square[item] === '')
    {
        square[item] = player;
        renderSquare();
        tooglePlayer();
    }
}

function reset()
{
    warning = '';

    let random = Math.floor(Math.random() * 2);
    
    player = (random === 0) ? 'X' : 'O';

    for(let i in square)
    {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare()
{
    for(let i in square)
    {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}

function renderInfo()
{
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function tooglePlayer() 
{
    player = (player == 'X') ? 'O' : 'X';
    renderInfo();
}

function checkGame() 
{
    if(checkWinnerFor('X'))
    {
        warning = 'X';
        playing = false; 
    }

    else if (checkWinnerFor('O')) 
    {
        warning = 'O';
        playing = false;    
    }

    else if (isFull()) 
    {
        warning = 'Empate';
        playing = false;    
    }
}

function checkWinnerFor(player) 
{
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,b2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in pos) {
        let pArray = pos[w].split(','); // a1, a2, a3
        let hasWon = pArray.every(Option => square[Option] === player);

        if (hasWon) 
        {
            return true;
        }       
    }

    return false;

}

function isFull()
{
    for (let i in square) 
    {
        if (square[i] === '') 
        {
            return false;
        }
    }

    return true;
}