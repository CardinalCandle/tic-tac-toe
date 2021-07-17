const Player = (name, mark) => {
    const details = () => console.log(name +" " +mark);
    return {name,mark,details};
};
const displayController = (() => {
    var eventarg = []
    var pl = null
    const addGrid = (player,COM) => {
        displayController.removeGrid()
        let count = 1
        gameBoard.board.forEach(element => {   
            addElement("button","gboard","box-"+count,element,"box",player,COM)
            count += 1
        });
    }
    const removeGrid = () =>{
        removeListeners()
        while (document.getElementsByClassName("box").length != 0) {
                document.getElementsByClassName("box")[0].remove()
            }
        }
    const addElement = (newElement,par,newid,content,newclass,player,COM) => {
        const newDiv = document.createElement(newElement);
        const newContent = document.createTextNode(content);
        newDiv.appendChild(newContent);
        const currentDiv = document.getElementById("div1");
        document.getElementById(par).insertBefore(newDiv, currentDiv);
        newDiv.setAttribute('id', newid);
        newDiv.classList.add(newclass);
        console.log('adding listener on box- '+ parseInt((newid[newid.length-1])))
        document.getElementById(newid).addEventListener('click', () => {playGame.turn(player,parseInt((newid[newid.length-1])),COM)})
        //eventarg.push("document.getElementById('"+newid+"').removeEventListener('click', () => {playGame.turn(player,"+parseInt((newid[newid.length-1]))+",COM)})")
        console.log(player.name)
        //pl = player
        //newDiv.addEventListener("click",alert('REE'), false)
    }
    const removeListeners = () => {
        cln = document.getElementById('gboard').cloneNode(true)
        document.getElementById('contain').appendChild(cln)
    }
    const addStart = () => {
            document.getElementById('startbtn').addEventListener("click", () => {playGame.askName()})
    }
    return {
        removeListeners,
        addGrid,
        addElement,
        addStart,
        removeGrid,
    };     
})();

const gameBoard = (() => {
    var board = ["","","",
                "","","",
                "","",""]
    const add = (mark, b) => {
            if (board[parseInt(b)-1]==""){
            console.log("marking position "+ b + " with mark "+mark)
            board[parseInt(b)-1] = mark;
        }
        else {return alert('Slot already taken, choose another.')}
        }

        return {
            board,
            add,
  };
  })();


const playGame = (() => {
    const askName = () => {
            pname = prompt('Please input your GameTag :');
            pmark = prompt('Please input your mark : (X/O)');

            const player = Player(pname, pmark);
            playGame.comName(player);
    }
    const comName = (p) => {
        if (p.mark == "X") {
                console.log("pmark is "+p.mark + p)
                const COM = Player("COM", "O");
                displayController.removeGrid()
                displayController.addGrid(p,COM);
        }
        else if (p.mark == "O") {
            console.log("pmark is "+p.mark + p);
                const COM = Player("COM", "X");
                displayController.removeGrid()
                displayController.addGrid(p, COM);

        }
        else {
            console.log("pmark is "+p.mark + p);

                alert("Wrong Mark! Please try again");
                askName();
        }
    }
    const turn = (player, move,COM) => {
        if (gameBoard.board[move] == ''){
        console.log(player.name+' has made his move '+player.mark+' on '+move);
        gameBoard.add(player.mark,move)
        gameBoard.add(COM.mark,comPlay())
        displayController.removeGrid(player,COM)
        displayController.addGrid(player,COM)
        }
        else {
        }
        
    }
    const comPlay = () => {
        cmove = Math.floor(Math.random()*gameBoard.board.length)-1
        if (gameBoard.board[cmove] == ""){
            return cmove;
        }
        else {
            comPlay()
        }
    }
    return {
            comPlay,
            askName,
            comName,
            turn,
    }
})()

displayController.addStart()