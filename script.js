console.log("Welcome..")

let backgroundMusic = new Audio("bc.mp3");
let clickEffect = new Audio("click.mp3");
let gameOverSound = new Audio("gameOver.mp3");
let winSound = new Audio("win.mp3");
let turn = "X";
let isgameover = false;
let start = document.getElementById("start");

start.addEventListener('click', () => {
    if (backgroundMusic.paused && backgroundMusic.currentTime <= 0) {
        start.innerText = "End";
        backgroundMusic.play();
    }
    else {
        backgroundMusic.currentTime = 0;
        start.innerText = "Start";
        backgroundMusic.pause();
    }
})

const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}
const checkWin = () => {
    let boxtext = document.getElementsByClassName('ans');
    let wins = [
        [0, 1, 2, 2, 4.5, 0],
        [3, 4, 5, 2, 13.5, 0],
        [6, 7, 8, 2, 22.5, 0],
        [0, 3, 6, -7, 13.5, 90],
        [1, 4, 7, 2, 13.5, 90],
        [2, 5, 8, 12, 13.5, 90],
        [0, 4, 8, 0, 13.5, 45],
        [2, 4, 6, 0, 13.5, 135],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) {
            if (e[5] != 45 && e[5] != 135) {
                document.querySelector('.line').style.width = "23vw";
            }
            else {
                document.querySelector('.line').style.width = "27vw";
            }
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " is Won"
            isgameover = true
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
    })
    if (isgameover) {
        winSound.play();
        backgroundMusic.pause();
    }
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let ans = element.querySelector('.ans');
    element.addEventListener('click', () => {
        if (ans.innerText === '') {
            ans.innerText = turn;
            turn = changeTurn();
            clickEffect.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})


reset.addEventListener('click', (e) => {
    let ans = document.querySelectorAll('.ans');
    Array.from(ans).forEach(element => {
        element.innerText = '';
    })
    turn = 'X';
    isgameover = false;
    gameOverSound.play();
    winSound.currentTime = 0;
    winSound.pause();
    document.querySelector('.line').style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    backgroundMusic.currentTime = 0;
    start.innerText = "Start";
    backgroundMusic.pause();
})




