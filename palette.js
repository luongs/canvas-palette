"use strict"

function draw() {
let context = document.getElementById('canvasInAPerfectWorld').
               getContext("2d");
let canvas = document.getElementById('canvasInAPerfectWorld');
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;

canvas.onmousedown = function( e ){
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;

  paint = true;

  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);

  redraw();
};

canvas.onmousemove = function( e ){
  if(paint) {

    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
};

canvas.onmouseup = function( e ){
  paint = false;
};

canvas.onmouseleave = function( e ){
  paint = false;
};

function addClick(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

let colorArray = ["#96ceb4", "#ffeead", "ffcc5c", "#ff6f69",
                  "#588c7e", "#f2e394", "#f2ae72", "#d96459"];

function redraw(){
  // clears canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.strokeStyle = getRandomColor(colorArray);
  context.lineJoin = "round";
  context.lineWidth = 5;

  for( let i=0; i< clickX.length; i++){
    context.beginPath();

    if (clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    }
    else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }

    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }
}

function getRandomColor(colorArray){
  let randIndex = Math.floor((Math.random() * colorArray.length));
  return colorArray[randIndex];
}

}


