var pawnsCount= 123;
var pawnsID=[];
var pawnsArray = [];
var pACount = 0;
var ifFree1 = true;
var ifFree2 = true;
var ifEliminate1 = true;
var ifEliminate2 = true;
var ifSelected = false;
var whoseTurn = "white";

class Pawn {
  constructor(id, posX, posY)
  {
    this.id = id;
    this.posX = posX;
    this.posY = posY;
  }
}

function changeTurns() // TO BE FIXED
{
  if(whoseTurn=="white")
  {
  whoseTurn="black";
  $('.blackPawn').css('pointer-events','auto');
  $('.whitePawn').css('pointer-events','none');
  }
  else if(whoseTurn=="black")
  {
    whoseTurn="white";
    $('.blackPawn').css('pointer-events','none');
    $('.whitePawn').css('pointer-events','auto');
  }

}

function getCords(x) // value of coordinates in pixels
{
  return 8+(x*100);
}

var cordsX = [];
var cordsY = [];

function loadCords() // building arrays of cords to use them later
{
  for(var i=1;i<=8;i++)
  {
    var c = getCords(i);
    cordsY.push(c);
    cordsX.push(c);
  }
}

function changePlaces(fromX,fromY,toX,toY)
{
  var id;
  for(var i=0; i<pawnsArray.length;i++)
  {
    if(fromX==pawnsArray[i].posX && fromY==pawnsArray[i].posY)
    {
      var match = pawnsArray[i];
      id = pawnsArray[i].id;
    }
  }

  $("#"+id).css('left',toX);
  $("#"+id).css('top',toY);
  $(".whitePawn").css("background","#663500");
  $(".blackPawn").css("background","#663500");
  $("#"+id).off();

  match.posX = toX;
  match.posY = toY;
  document.getElementById('hover').innerHTML="";
  changeTurns();
}

function hoverMove(x1,y1,x2,y2)
{
  var board = document.getElementById('hover');
  if(ifFree1==true)
  {
  board.innerHTML+="<div class='hoverMove' id='200'></div>";
  $("#200").css("left",x1-108);
  $("#200").css("top",y1-108);
  }

  if(ifFree2==true)
  {
  board.innerHTML+="<div class='hoverMove' id='201'></div>";
  $("#201").css("left",x2-108);
  $("#201").css("top",y2-108);
  }
}

function hoverElimination(x1,y1,x2,y2)
{
  var board = document.getElementById('eliminate');
  if(ifEliminate1==true)
  {
    board.innerHTML+="<div class='hoverMove' id='202'></div>";
    $("#202").css("left",x1);
    $("#202").css("top",y1);
  }

  if(ifEliminate2==true)
  {
    board.innerHTML+="<div class='hoverMove' id='203'></div>";
    $("#203").css("left",x1);
    $("#203").css("top",y1);
  }
}

function playerMove(x,y)
{
  ifFree1=true;
  ifFree2=true;
  if(whoseTurn=="white")
  {
  var potentialX1 = x-100;
  var potentialY1 = y-100;
  var potentialX2 = x+100;
  var potentialY2 = y-100;

  var eliminateX1 = potentialX1 + 100;
  var eliminateY1 = potentialY1 - 200;
  var eliminateX2 = potentialX2 - 100;
  var eliminateY2 = potentialY2 - 200;
  }

  if(whoseTurn=="black")
  {
  var potentialX1 = x-100;
  var potentialY1 = y+100;
  var potentialX2 = x+100;
  var potentialY2 = y+100;

  var eliminateX1 = potentialX1 + 100;
  var eliminateY1 = potentialY1 + 200;
  var eliminateX2 = potentialX2 - 100;
  var eliminateY2 = potentialY2 + 200;
  }

  for(var i=0;i<pawnsArray.length;i++)
  {
    if(potentialX1 <= 808 && potentialX1 >= 108 && potentialY1 > 0 && potentialY1 <= 808)
    {
      if(potentialX1 == pawnsArray[i].posX && potentialY1 == pawnsArray[i].posY)
      {
      ifFree1 = false;
      console.log(potentialX1+" "+potentialY1);
      }
    }
    else ifFree1= false;

    if(potentialX2 <= 808 && potentialX2 > 0 && potentialY2 > 0 && potentialY2 <= 808)
    {
      if(potentialX2 == pawnsArray[i].posX && potentialY2 == pawnsArray[i].posY)
      {
      ifFree2 = false;
        console.log(potentialX2+" "+potentialY2);
      }
    }
    else ifFree2= false;
  }
  //----------------------------------------ELIMINATION---------------------
  for(var i=0;i<pawnsArray.length;i++)
  {
    if(eliminateX1 <= 808 && eliminateX1 >= 108 && eliminateY1 > 0 && eliminateY1 <= 808)
    {
      if(eliminateX1 == pawnsArray[i].posX && eliminateY1 == pawnsArray.posY)
      {
        ifEliminate1 = false;
        console.log(eliminateX1+" "+eliminateY1);
      }
    }

    if(eliminateX2 <= 808 && eliminateX2 >= 0 && eliminateY2 > 0 && eliminateY2 <= 808)
    {
      if(eliminateX2 == pawnsArray[i].posX && eliminateY2 == pawnsArray.posY)
      {
        ifEliminate2 = false;
        console.log(eliminateX2+" "+eliminateY2);
      }
    }

  }

  //---------------------------------------------------------------------
 hoverMove(potentialX1,potentialY1,potentialX2,potentialY2);
 hoverElimination(eliminateX1,eliminateY1,eliminateX2,eliminateY2);
if(ifFree1==true)
{
 var hover1 = document.getElementById("200");
 hover1.addEventListener("click",function chPl(){ changePlaces(x,y,potentialX1,potentialY1) });
}
if(ifFree2==true)
{
 var hover2 = document.getElementById("201");
 hover2.addEventListener("click",function chPl(){ changePlaces(x,y,potentialX2,potentialY2) });
}
if(ifFree1==false && ifFree2==false)
  {
    $(".whitePawn").css("background","#663500");
    $(".blackPawn").css("background","#663500");
    document.getElementById("hover").innerHTML="";
    return;
  }
}


function select(id) // choosing a pawn
{
  document.getElementById('hover').innerHTML="";
  $(".whitePawn").css("background","#663500");
  $(".blackPawn").css("background","#663500");
  $("#"+id).css("background","yellow");
  var idx = id-100;

  var currentPosX= pawnsArray[idx].posX;
  var currentPosY= pawnsArray[idx].posY;

  playerMove(currentPosX,currentPosY,whoseTurn);
}

function addSelect(id) // adding event listener
{
  var h1 = document.getElementById(id);
  h1.addEventListener("click", function(){select(id)});
}

function addSelectAll(x,y) // adding event listeners to a range of pawns *might be useful*
{
  for(var i=x;i<=y;i++)
    addSelect(i);
}


function addPawn(x,y,colour) // spawning a pawn
{
  pawnsCount++;
  var board = document.getElementById("board");
  board.innerHTML+="<img src='"+colour+"pawn.png' class='"+colour+"pawn' id='"+pawnsCount+"'>";
  $("#"+pawnsCount).css('left',x);
  $("#"+pawnsCount).css('top',y);
  var obj = new Pawn(pawnsCount,x,y)
  pawnsArray.push(obj);
}

function loadSquares() // loading the board
{
  var id;
  var block = document.getElementById("board");
  for(var i=0;i<=3;i++)
  {
    for(var j=1;j<=16;j++)
    {
      id=(16*i)+j;
      if(j==1 || j==3 || j==5 || j==7 || j==10 || j==12 || j==14 || j==16)
      block.innerHTML+= "<div class='blackSquare'id='"+id+"'></div>";

      else
      block.innerHTML+= "<div class='whiteSquare'id='"+id+"'></div>";
    }
  }
}

function bindCords() // Binding the initial position of every pawn to its' object
{
  for(var i=0;i<24;i++)
  {
  var help = i+100;
  var help2 =  document.getElementById(help).id;
  pawnsID[i] = parseInt(help2);

  }

for(var j=1;j<=8;j++)
{
  for(var i=1; i<=8;i++)
  {
    if(document.getElementById(i).className == "blackSquare" && j!=4 && j!=5 && j!=2 && j!=6 && j!=8)
    {
      var cX = getCords(i);
      var cY = getCords(j);
      pawnsArray[pACount] = new Pawn (pawnsID[pACount],cX,cY);
      pACount++;
    }

    if(document.getElementById(i).className == "blackSquare")
    {
      if(j==2 || j==6 || j==8)
      {
        var cX = getCords(i+1);
        var cY = getCords(j);
        pawnsArray[pACount] = new Pawn (pawnsID[pACount],cX,cY);
        pACount++;
      }
    }
  }
}

}

function locatePawns() // moving all the pawns to the initial locations
{
  for(var i=100;i<=123;i++)
  {
    var help = i-100;
    $('#'+i).css('left', pawnsArray[help].posX);
    $('#'+i).css('top', pawnsArray[help].posY);
  }
}



function loadPawns() // adding the visual pawns to the board
{
  loadCords();
  var pawnCount= 100;
for(var i=1;i<=24;i++)
{
    var block = document.getElementById("board");
    if(i<=12)
    block.innerHTML+= "<img src='blackpawn.png' id='"+pawnCount+"' class='blackPawn'>";
    else
    block.innerHTML+= "<img src='whitepawn.png' id='"+pawnCount+"' class='whitePawn'>";
    pawnCount++;
}
  bindCords();
  locatePawns();
}


function startup() // general function
{
  loadSquares();
  loadPawns();
  addSelectAll(100,123);
}

window.onload = startup();
