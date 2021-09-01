class View {
  constructor(game, el) {
    this.el = el
    this.game = game
    this.setupBoard()
    this.bindEvents()
  }

  setupBoard() {
    let ul = document.createElement('ul')
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let li = document.createElement('li')
        li.dataset.pos = `${i},${j}`
        ul.appendChild(li)
      }
    }
    this.el.appendChild(ul)
    console.log(ul)

  }
  
  bindEvents() {
    // this.handleClick
    this.el.addEventListener('click', this.handleClick.bind(this))
  }

  handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    let clicked = e.target
    if (clicked.tagName === 'LI') {
      this.makeMove(clicked)
    }
  }

  makeMove(square) {
    let pos = square.dataset.pos.split(",").map(x=>+x)
    let currentPlayer= this.game.currentPlayer;
    this.game.playMove(pos)
    square.innerText= currentPlayer;
    square.style.backgroundColor = "white";

    if (square.innerText === 'X'){
      // square.style.color= 'red';
      square.innerHTML = "<img src='assets/tick.png' alt='tick' width='80' height='80'>";
    } else {
      square.innerHTML = "<img src='assets/tack.png' alt='tack' width='80' height='80'>";
    }

    function tickToe() {
      window.document.write("<head><link rel='stylesheet' type='text/css' href='../dist/ttt.css'></head> <body> <img src='assets/toe.png'> <h3 style='color:green;'>Yay Tick wins a toe!</h3><br><h2>Play Again in...</h2><h2 id='timer'></h2><script>var countDownDate = new Date().getTime()+5000;var x = setInterval(function() { var now = new Date().getTime(); var distance = countDownDate - now; var seconds = Math.floor((distance/1000)); document.getElementById('timer').innerHTML = seconds + ' sec '; if (distance < 0) {clearInterval(x); document.getElementById('timer').innerHTML = 'READY!';}}, 1000);</script></body>");
    }

    function tackToe() {
      window.document.write("<head><link rel='stylesheet' type='text/css' href='../dist/ttt.css'></head> <body> <img src='assets/toe.png'> <h3 style='color:red;'>Yay Tack wins a toe!</h3><br><h2>Play Again in...</h2><h2 id='timer'></h2><script>var countDownDate = new Date().getTime()+5000;var x = setInterval(function() { var now = new Date().getTime(); var distance = countDownDate - now; var seconds = Math.floor((distance/1000)); document.getElementById('timer').innerHTML = seconds + ' sec '; if (distance < 0) {clearInterval(x); document.getElementById('timer').innerHTML = 'READY!';}}, 1000);</script></body>");
    }

    let winner= this.game.winner();
    if (winner=== 'X') {
      tickToe();
      setTimeout(()=> {location.reload();},5000);
      // setTimeout(() => { showToe(); location.reload();},2000)
    } else if (winner=== 'O') {
      tackToe();
      setTimeout(() => { location.reload(); }, 5000);
      // setTimeout(() => { alert("Tack is the winner"); location.reload();},0)
    } else if (this.game.board.isOver()) {
      setTimeout(() => { alert("It's a draw! Nobody gets the toe!"); location.reload(); }, 0)
    }
  }

}

module.exports = View;
