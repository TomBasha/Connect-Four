// "Connect Four" 
// Author - Thomas El-Basha (14/08/2020)
// Many Thanks to Ania Kubow (kubowania) for the basis of game

document.addEventListener('DOMContentLoaded', () => {

    const gridSquares = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result')
    const playerh3 = document.getElementById('current-player');
    const playButton = document.getElementById('play-button');
    const resetButton = document.getElementById('reset-button')
  
    // Player 1 Always Begins
    let currentPlayer = 1; 
    
    // Selecting Individual Columns
    const col1 = document.getElementById('col-1')
    const col2 = document.getElementById('col-2')
    const col3 = document.getElementById('col-3')
    const col4 = document.getElementById('col-4')
    const col5 = document.getElementById('col-5')
    const col6 = document.getElementById('col-6')
    const col7 = document.getElementById('col-7')
 
    // Arrays Representing Colomn Ids 
    let col1Array = [0,7,14,21,28,35];
    let col2Array = [1,8,15,22,29,36];
    let col3Array = [2,9,16,23,30,37];
    let col4Array = [3,10,17,24,31,38];
    let col5Array = [4,11,18,25,32,39];
    let col6Array = [5,12,19,26,33,40];
    let col7Array = [6,13,20,27,34,41];

    // Reset Array to Original (Triggered after either player wins a round) 
    function resetColArrays(){
      col1Array = [0,7,14,21,28,35];
      col2Array = [1,8,15,22,29,36];
      col3Array = [2,9,16,23,30,37];
      col4Array = [3,10,17,24,31,38];
      col5Array = [4,11,18,25,32,39];
      col6Array = [5,12,19,26,33,40];
      col7Array = [6,13,20,27,34,41];
    }
  
    // Add Index To Empty Slots 
    let squareIndex = 0;
    gridSquares.forEach(function(square){
      square.id = squareIndex;
      squareIndex += 1;
    })

    // Event Listeners for Columns 1 to 7 (Play Button Triggers Function)
    function colListeners(){
      col1.addEventListener("click", function(){dropChip(col1Array)});
      col2.addEventListener("click", function(){dropChip(col2Array)});
      col3.addEventListener("click", function(){dropChip(col3Array)});
      col4.addEventListener("click", function(){dropChip(col4Array)});
      col5.addEventListener("click", function(){dropChip(col5Array)});
      col6.addEventListener("click", function(){dropChip(col6Array)});
      col7.addEventListener("click", function(){dropChip(col7Array)});
    }

    // Play Button (Triggers Event Listeners)
    playButton.addEventListener("click", function(){
      return colListeners();
    });
    
    // Reset Button Event Listener
    resetButton.addEventListener("click", resetBoard);

    // Resets Board to Original State
    function resetBoard(){
      gridSquares.forEach(function(square){
        if(square.classList.contains("player-one")){
          square.classList.remove("player-one");
          resetColArrays();
          result.innerHTML = ""
        } else if(square.classList.contains("player-two")) {
          square.classList.remove("player-two");
          resetColArrays();
          result.innerHTML = ""
        }
      })
    } 

    // Remove Event Listeners from Columns 1 to 7 - (Had Trouble Making This Work)
    // function remColListener(){
    //   col1.removeEventListener("click", function(){dropChip(col1Array)});
    //   col2.removeEventListener("click", function(){dropChip(col2Array)});
    //   col3.removeEventListener("click", function(){dropChip(col3Array)});
    //   col4.removeEventListener("click", function(){dropChip(col4Array)});
    //   col5.removeEventListener("click", function(){dropChip(col5Array)});
    //   col6.removeEventListener("click", function(){dropChip(col6Array)});
    //   col7.removeEventListener("click", function(){dropChip(col7Array)});
    //   }
   
    // Drops Discs to the Bottom Row 
    function dropChip(array){
      if(currentPlayer === 1){
        colSorted = array.sort((a,b) => b-a)
        let tempSlot = document.getElementById(`${colSorted[0]}`);
        tempSlot.classList += " player-one"
        checkBoard()
        colSorted.shift();
        currentPlayer = 2;
        playerh3.innerHTML = currentPlayer;
      } else if(currentPlayer === 2){
        colSorted = array.sort((a,b) => b-a)
        let tempSlot = document.getElementById(`${colSorted[0]}`);
        tempSlot.classList += " player-two"
        checkBoard()
        colSorted.shift();
        currentPlayer = 1;
        playerh3.innerHTML = currentPlayer;
      }
    }
  
      // Checks Board for Winning Hand
      function checkBoard() {
        // All Possible Winning Combinations 
        const winningArrays = [
        [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
        [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
        [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
        [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
        [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
        [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
        [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
        [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
        [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
        [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
        ];
        // Takes 4 Values in each Winning Array & Plugs them into Squares Values 
        for(let y = 0; y < winningArrays.length; y++) {
            const square1 = gridSquares[winningArrays[y][0]];
            const square2 = gridSquares[winningArrays[y][1]];
            const square3 = gridSquares[winningArrays[y][2]];
            const square4 = gridSquares[winningArrays[y][3]];
    
            // Checks Created Arrays for Class of "player-one"
            if(square1.classList.contains('player-one') &&
                square2.classList.contains('player-one') &&
                square3.classList.contains('player-one') &&
                square4.classList.contains('player-one')) {
                    // If they do, Player One is passed as the Winner!
                    result.innerHTML = 'Player one wins!'
                    setTimeout(resetBoard, 3000);
            } 
            // Checks Created Arrays for Class of "player-two"
            else if (square1.classList.contains('player-two') &&
                square2.classList.contains('player-two') &&
                square3.classList.contains('player-two') &&
                square4.classList.contains('player-two')) {
                    // If they do, Player Two is passed as the Winner!
                    result.innerHTML = 'Player two wins!'
                    setTimeout(resetBoard, 3000);
            }
        }
    }
});
