const Gameboard=(()=>{
    let gameBoard=["","","","","","","","","",]

    const render=()=>{
        let boardHTML=""
        gameBoard.forEach((square,index)=>{
            boardHTML +=`<div class="square" id=square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML=boardHTML
        const squares=document.querySelectorAll(".square")
        squares.forEach((square)=>{
            square.addEventListener("click",Game.handleClick)
        })
       
    }
    const update=(index,value)=>{
        gameBoard[index]=value
        render()
    }
    const getGameboard=()=>gameBoard
    return{
        render,
        update,
        getGameboard
    }
    
})()

const createPlayer=(name,mark)=>{
    return{
        name,mark
    }
}
const Game =(()=>{
    let players=[]
    let currentPlayer
    let gameStatus

    const start =()=>{
        players=[
            createPlayer(document.querySelector("#player1").value,"x"),
            createPlayer(document.querySelector("#player2").value,"O")
        ]
        currentPlayer=0
        gameStatus=false
        Gameboard.render()
        const squares=document.querySelectorAll(".square")
        squares.forEach((square)=>{
            square.addEventListener("click",Game.handleClick)
        })

    }
    const handleClick=(event)=>{
        if (gameStatus){
            return
        }
        let index=(parseInt(event.target.id.split("-")[1]))
     

        if (Gameboard.getGameboard()[index]!=="")
            return
        
        Gameboard.update(index,players[currentPlayer].mark)
        if (checkForWin(Gameboard.getGameboard(),players[currentPlayer].mark)){
            gameStatus=true
            alert(`${players[currentPlayer].name}won!`)
        }else if(checkForTie(Gameboard.getGameboard())){
            gameStatus=true;
            alert("tie")
        }

        currentPlayer=currentPlayer===0?1:0
    }
    const restart=()=>{
        for(let i=0;i<9;i++){
            Gameboard.update(i,"")
        }
        Gameboard.render
    }
    return{
        start,
        handleClick,
        restart
    }
})()
const checkForWin = (board, mark) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
      [0, 4, 8], [2, 4, 6] // diagonal
    ];
    return winningCombinations.some(combination => combination.every(index => board[index] === mark));
};

const checkForTie = (board) => {
    return board.every(square => square !== '')
};
const restartButton=document.querySelector(".restart")
restartButton.addEventListener("click",()=>{
    Game.restart()
})
const startButton=document.querySelector(".start")
startButton.addEventListener("click",()=>{
    Game.start()
})
