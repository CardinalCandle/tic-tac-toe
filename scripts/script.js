const Player = (name, mark) => {
    const details = () => console.log(name +" " +mark);
    return {name,mark,details};
};
const displayController = (() => {
    const addGrid = (player,COM) => {
        removeGrid()
        let count = 1
        gameBoard.board.forEach(element => {   
            addElement("button","gboard","box-"+count,element,"box",player,COM)
            count += 1
        });
        return;
    }
    const removeGrid = () =>{  
        while (document.getElementsByClassName("box").length != 0) {
                document.getElementsByClassName("box")[0].remove()
            }
        return removeListeners()
        }
    const addElement = (newElement,par,newid,content,newclass,player,COM) => {
        const newDiv = document.createElement(newElement);
        const newContent = document.createTextNode(content);
        newDiv.appendChild(newContent);
        const currentDiv = document.getElementById("div1");
        document.getElementById(par).insertBefore(newDiv, currentDiv);
        newDiv.setAttribute('id', newid);
        newDiv.classList.add(newclass);
        //console.log('adding listener on box- '+ parseInt((newid[newid.length-1])))
        document.getElementById(newid).addEventListener('click', () => {gameFlow.turn(player, COM, parseInt((newid[newid.length-1])))})
        //eventarg.push("document.getElementById('"+newid+"').removeEventListener('click', () => {playGame.turn(player,"+parseInt((newid[newid.length-1]))+",COM)})")
        //console.log(player.name)
        //pl = player
        //newDiv.addEventListener("click",alert('REE'), false)
    }
    const removeListeners = () => {
        cln = document.getElementById('gboard').cloneNode(true)
        document.getElementById('contain').appendChild(cln)
        document.getElementById('gboard').remove()
        return;
    }
    const addStart = (p,c) => {
            document.getElementById('startbtn').addEventListener("click", () => {
                if (gameBoard.board.includes("X") || gameBoard.board.includes("O")) {return}
                else {
                    return gameFlow.start()
                }
            })
            document.getElementById('rstbtn').addEventListener("click", () => {
                if (gameBoard.board.includes('') == false || gameFlow.checkWin('','') == true) {
                    gameBoard.reset()
                }
                else {return}
                })

            }
        const showWinner = (name) => {
            if (name == "Tie") {
                document.getElementById('res').textContent = "It's a Tie"
                return
            }
            else {
            document.getElementById('res').textContent = 'Winner: '+name
            return
        }}
    return {
        showWinner,
        removeListeners,
        addGrid,
        addStart,
    };     
})();

const gameBoard = (() => {
    var board = ["","","",
                "","","",
                "","",""]
    const add = (mark, b, p) => {
            if (board[b]==""){
            console.log("marking position "+ b + " with mark "+mark)
            board[b] = mark;
            return true;
        }
        else { 
            if (p.name == "COM") {
                return false
            }
            else {
            alert('Slot already taken, choose another.')}
            return false;
        }
    }
    const reset = () => {
        for (i = 0; i<9;i++){
            console.log(i)
            gameBoard.board[i] = ""
            displayController.addGrid
            document.getElementById('res').textContent =  ''
        }
        
        
        return gameFlow.start()
    }
        return {
            reset,
            board,
            add,
  };
  })();


const playGame = (() => {
    const askName = () => {
            pname = prompt('Please input your GameTag :');
            pmark = prompt('Please input your mark : (X/O)');
            if (pmark == 'X' | pmark == 'O'){
            const player = Player(pname, pmark);
            player.details()
            return player
        }
        else {
            alert("Wrong Mark! Please try again");
                askName();
        }
    }
            //playGame.comName(player);
    
    const comName = (p) => {
        if (p.mark == "X") {
               // console.log("pmark is "+p.mark + p)
                const COM = Player("COM", "O");
                return COM
                //displayController.removeGrid()
                //displayController.addGrid(p,COM);
        }
        else if (p.mark == "O") {
            //console.log("pmark is "+p.mark + p);
                const COM = Player("COM", "X");
                return COM
                //displayController.removeGrid()
                //displayController.addGrid(p, COM);

        }
        else {
            //console.log("pmark is "+p.mark + p);

                alert("Wrong Mark! Please try again");
                askName();
        }
    }

    const comPlay = (p,c) => {
        let possibleMoves = []
        let count = 0
        gameBoard.board.forEach((element) => {
            if (element ==""){
                possibleMoves.push(count)
            }
            else {}
            count += 1
        })
        if (possibleMoves.length == 0 || gameFlow.checkWin(p,c) != false) { 
            return
        }
        ///console.log('COM has the following positions to choose from: ')
        ///console.table(possibleMoves) 
        else {
        let cmove = Math.floor((Math.random()*(possibleMoves.length-1)))
        if (gameBoard.board[possibleMoves[cmove]] == ""){
            return possibleMoves[cmove];
        }
        else {
            return possibleMoves[cmove];
        }
    }
    }
    return {
            comPlay,
            askName,
            comName,
            
    }
})()
const gameFlow = (() => {
    const start = () => {
    //(gameBoard.reset())
    const p = playGame.askName()
    console.log("Player is named "+p.name+" with mark "+p.mark)
    const c = playGame.comName(p)
    console.log("COM is named "+c.name+" with mark "+c.mark)
    //gameBoard.board = ["","","","","","","","",""]
    displayController.addGrid(p,c)

    }
    const turn = (p,c,move) => {
        
        //console.log(gameBoard.board[move]+" is empty, legal move" )
        //console.log(p.name+' has made his move '+p.mark+' on '+move);

        //console.log(p.name+' has made his move '+p.mark+' on '+move);
        //console.log(c.name+' has made his move '+c.mark+' on '+cmove);
        move -= 1
        if (gameBoard.board[move] == ''){
            console.log(gameBoard.board[move]+" is empty, legal move" )
            ///console.log(p.name+' has made his move '+p.mark+' on '+move);
            gameBoard.add(p.mark,move,c)
            displayController.addGrid(p,c)
            if (checkWin(p,c) == true) {
                return checkWin(p,c);
            }
            else {
            let cmove = playGame.comPlay(p,c)
            gameBoard.add(c.mark,cmove,c)    
            ///console.log(c.name+' has made his move '+c.mark+' on '+cmove);
            displayController.addGrid(p,c)
            if (checkWin(p,c) == true) {
                return checkWin(p,c);
            }
        }
        }
        else {
            displayController.addGrid(p,c)
            return //turn(p,c,move)
            }
    }
    const checkWin = (p,c) => {
        let b = gameBoard.board
        if (b[0]+b[1]+b[2] == "XXX" ||
            b[3]+b[4]+b[5] == "XXX" ||
            b[6]+b[7]+b[8] == "XXX" ||
            b[0]+b[3]+b[6] == "XXX" ||
            b[1]+b[4]+b[7] == "XXX" ||
            b[2]+b[5]+b[8] == "XXX" ||
            b[0]+b[4]+b[8] == "XXX" ||
            b[2]+b[4]+b[6] == "XXX") {
                if (p.mark == "X") {
                    console.log('You Win')
                    displayController.removeListeners();
                    displayController.showWinner(p.name)
                    return true
                }
                
                else if (c.mark == "X") {
                    console.log('You Lose');
                    displayController.removeListeners();
                    displayController.showWinner(c.name)
                    return true
                }
                else {return true}
            }
        else if (        
            b[6]+b[7]+b[8] == "OOO" ||
            b[0]+b[1]+b[2] == "OOO" ||
            b[3]+b[4]+b[5] == "OOO" ||
            b[0]+b[3]+b[6] == "OOO" ||
            b[1]+b[4]+b[7] == "OOO" ||
            b[2]+b[5]+b[8] == "OOO" ||
            b[0]+b[4]+b[8] == "OOO" ||
            b[2]+b[4]+b[6] == "OOO" ) {
                if (p.mark == "O") {
            console.log('You Win');
            displayController.removeListeners()
            displayController.showWinner(p.name)
            return true
                    }
            else if (c.mark == "O") {
            console.log('You Lose');
            displayController.removeListeners()
            displayController.showWinner(c.name)
            return true
            }
            else {return true}
        }
        else if (gameBoard.board.includes('') == false) {
            console.log("It's a tie");
            displayController.removeListeners()
            displayController.showWinner("Tie")
            return true
        }
        else {
            return false
        }
        }
         
    return {start,turn,checkWin}
})()

displayController.addStart()
