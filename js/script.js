let cardBack;
let pattern = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I'];
let memoryValues = [];
let memoryTileIds = [];
let tilesFlipped = 0;
let sizeOfBoard;
let sizeOfArray = 0;
function newBoard(){
  if(cardBack === undefined){
    cardBack = 'heart';
  }
  if(sizeOfBoard === undefined){
    sizeOfBoard = 8;
  }
  sizeOfArray = 0;
  let memoryArray = pattern.slice(0,sizeOfBoard);
  //check for presence of the info sections on the page
  let gameInfoCheker = document.getElementById('gameInfo');
  gameInfoCheker.classList.add("display_none");
  document.getElementById('memoryBoard').innerHTML = "";
  tilesFlipped = 0;
  memoryValues.length = 0;
  memoryTileIds.length = 0;
  let output = '';
  memoryArray = memoryTileShuffle(memoryArray);
  //======check for a value of cardBack variable START===========
  if(cardBack === 'snowflake'){
    output = fillWithSnowflakes(memoryArray);
  } else if(cardBack === 'heart'){
      output = fillWithHearts(memoryArray);
    } else{
      output = fillWithDiamonds(memoryArray);
    }
  //======check for a value of cardBack variable END===========
  document.getElementById('memoryBoard').innerHTML = output;
  document.getElementById('timerSection').classList.remove('display_none');
  watch.start();
}
//================card back settings start=============================
function setCardBack(iconValue){
   let board = document.getElementById('memoryBoard').childNodes;
  if(board.length === 0){
    cardBack = iconValue;
  }else  if(cardBack !== iconValue){
   let temp = confirm('would you like to start a new game with different card back?');
    if(temp){
        cardBack = iconValue;
        newBoard();
    }    
  }
}
//================card back settings end=============================
//==============difficulty settings===========
function setDifficulty(difficultyValue){
  let board = document.getElementById('memoryBoard');
  if(board.childNodes.length === 0){
    sizeOfBoard = difficultyValue;
  } else if(sizeOfBoard !== difficultyValue){
     let temp = confirm('would you like to change a difficulty and start a new game?');
    if(temp){
      sizeOfBoard = difficultyValue;
      
      newBoard();
    } 
  }
}

//=====================flip function --start =============
function flip(tile,val){
  let child = tile.parentElement.childNodes;
  if(memoryValues.length < 2){
    child[1].style.transform = 'perspective( 600px ) rotateY( -180deg )';
    child[0].style.transform = 'perspective( 600px ) rotateY( 0deg )';
    if(memoryValues.length == 0){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
		} else if(memoryValues.length == 1){
      memoryValues.push(val);
      memoryTileIds.push(tile.id);
      if(memoryValues[0] == memoryValues[1] && memoryTileIds[0] !== tile.id){
        tilesFlipped += 2;
        let tile1 = document.getElementById(memoryTileIds[0]).parentElement;
				let tile2 = document.getElementById(memoryTileIds[1]).parentElement;
         tile1.style.transition = "opacity 1.5s linear 0s";
         tile1.style.opacity = '0';
         tile2.style.transition = "opacity 1.5s linear 0s";
        tile2.style.opacity = '0';
       
        memoryValues = [];
        memoryTileIds = [];
        	if(tilesFlipped == sizeOfBoard){
          child[1].style.transform = 'perspective( 600px ) rotateY( -180deg )';
          child[0].style.transform = 'perspective( 600px ) rotateY( 0deg )';
            watch.stop();
            setTimeout("alert('Congratulations, you won!')",1000);
            //watch.reset();
            setTimeout('newBoard()',1000);
				}
      } else{
        function flipBack(){
          let tile1 = document.getElementById(memoryTileIds[0]).parentElement.childNodes;
				  let tile2 = document.getElementById(memoryTileIds[1]).parentElement.childNodes;
          tile1[0].style.transform = 'perspective( 600px ) rotateY( 180deg )';
          tile1[1].style.transform = ' perspective( 600px ) rotateY( 0deg )';
          tile2[0].style.transform = 'perspective( 600px ) rotateY( 180deg )';
          tile2[1].style.transform = ' perspective( 600px ) rotateY( 0deg )';
          memoryValues = [];
          memoryTileIds = [];
        }
      setTimeout(flipBack, 700);  
      }
    }
  }
 
}
//============flip function -- end====================================
//========ARRAY.PROTOTYPE FUNCTIONS  START==========
//========='fill the output variable' functions -- start===========
function fillWithSnowflakes(array){
  let output = '';
    for(let i = 0;i < array.length;i++){
    output+='<div  class="flip3D" ><div class="back">' + array[i] + '</div><div class="front" onclick="flip(this,\''+array[i]+'\')" id="tile_' + i + '"><i class="fa fa-snowflake-o fa-4x" aria-hidden="true"></i></div></div>';
  }
  return output;
}
function fillWithDiamonds(array){
  let output = '';
   for(let i = 0;i < array.length;i++){
    output+='<div  class="flip3D" ><div class="back">' + array[i] + '</div><div class="front" onclick="flip(this,\''+array[i]+'\')" id="tile_' + i + '"><i class="fa fa-diamond fa-4x" aria-hidden="true"></i></div></div>';
  }
  return output;  
}
function fillWithHearts(array){
  let output = '';
   for(let i = 0;i < array.length;i++){
    output+='<div  class="flip3D" ><div class="back">' + array[i] + '</div><div class="front" onclick="flip(this,\''+array[i]+'\')" id="tile_' + i + '"><i class="fa fa-heart fa-4x" aria-hidden="true"></i></div></div>';
  }
  return output;  
}
//========='fill the output variable' functions -- end===========
//======'Shuffle the values of the memory array' function -- start=======
function memoryTileShuffle(array){
    let i = array.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
  return array;
}
//======'Shuffle the values of the memory array' function -- end=======
//========ARRAY.PROTOTYPE FUNCTIONS  END==========
//=====================STOPWATCH START============================================

function Stopwatch(elem) {
  var time = 0;
  var offset;
  var interval;

  function update() {
    if (this.isOn) {
      time += delta();
    }
    
    elem.innerHTML = timeFormatter(time);
  }

  function delta() {//calculates,how much time is passed
    var now = Date.now();//returns current time in milliseconds
    var timePassed = now - offset;

    offset = now;

    return timePassed;
  }

  function timeFormatter(time) {
    time = new Date(time);

    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
    return minutes + ' : ' + seconds;
  }
  this.stop = function(){
   clearInterval(interval);
    interval = null;
    this.isOn = false;
}
  this.start = function() {
    time = 0;
    update();
    interval = setInterval(update.bind(this), 10);//changes time on clocks with update function every 10 ms
    offset = Date.now();
    this.isOn = true;
  };
}
//=====================STOPWATCH -- END============================================
//---------WORKING WITH  STOPWATCH-------------------------------------------------
var timer = document.getElementById('timer');
var watch = new Stopwatch(timer);

//---------WORKING WITH  STOPWATCH -- END-------------------------------------------------