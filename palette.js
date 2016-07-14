"use strict"

function draw() {
let context = document.getElementById('canvasInAPerfectWorld').
               getContext("2d");
let canvas = document.getElementById('canvasInAPerfectWorld');
let clearButton = document.getElementById('clearButton');
let colorButton = document.getElementById('colorButton');
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

clearButton.onclick = function( e ){
  clearCanvas();
  clearArrays();
};

colorButton.onclick = function ( e ){
  clearClickColorArray();
};

let clickColorArray = [];
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let clickColor = new Array();
let colorArray = [];

// Initialize different palettes for color array
colorArray.push(["#96ceb4", "#ffeead", "ffcc5c", "#ff6f69",
                  "#588c7e", "#f2e394", "#f2ae72", "#d96459"]);

colorArray.push(["#deeaee", "#b1cbbb", "#eea29a", "#c94c4c"]);

//TODO: Add more color palettes

function addClick(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColorArray = initClickColorArray(clickColorArray);
  clickColor.push(getRandomColor(clickColorArray[0]));
}

function initClickColorArray(clickColorArray){
  if (clickColorArray.length === 0){
    clickColorArray.push(getRandomColor(colorArray));
  }
  return clickColorArray;
};

function clearClickColorArray(){
  clickColorArray = [];
};

function clearCanvas(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function clearArrays(){
  clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
}

function redraw(){
  clearCanvas();

  context.lineJoin = "round";
  context.lineWidth = 8;

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
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}

function getRandomColor(colorArray){
  let randIndex = Math.floor((Math.random() * colorArray.length));
  return colorArray[randIndex];
}

}


