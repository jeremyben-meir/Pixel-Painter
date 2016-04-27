/*Pseudoshop
By:Jeremy Ben-Meir, Anmol Surpur, and Paris Ball
Computer Science
April 25, 2016
A project showcasing user interaction combined with individual shapes and colors to provide a unique picture.
*/

//Declares essential variables
var initSelX = 0;
var initSelY = 0;
var finSelX = 0;
var finSelY = 0;
var gridYes = -1;
var initEllX = 0;
var initRectX = 0;
var initEllY = 0;
var initRectY = 0;
var startStamp=0;
var newStamp;
var initLX = 0;
var initLY = 0;
var colorSet;
var colorImg;
var colorEyer;
var primColor;
var secColor;
var firsec=1;
var jpegpng;
var tristate = 0;
var tri1x = 0;
var tri1y = 0;
var tri2x = 0;
var tri2y = 0;
var tri3x = 0;
var tri3y = 0;
var bezstate = 0;
var bez1x = 0;
var bez1y = 0;
var bez2x = 0;
var bez2y = 0;
var bez3x = 0;
var bez3y = 0;
var bez4x = 0;
var bez4y = 0;
var saturate=0;//darkens and lightens color1 and color2
var advColors=[];
var advSat=[];
var clear1=0;
var clear2=0;
var clickCount=0;
var moveSat=1;
var selReset=1;
var pasteable=0;
var imgar;
var textual = "";
var stampy=[];
var dropOnce=1;
var showHelp=-1;
var thickSlider;
var satSlider;
var newSet=[];
var cycle=0;
var effect;
var effAct=0;
function preload() {  // preload() runs once
  colorImg = loadImage('data/color-picker.png');//The color wheel
  stampy[1] = loadImage('emoji/1.png');//Array of different stamps (emojis)
  stampy[2] = loadImage('emoji/2.png');
  stampy[3] = loadImage('emoji/3.png');
  stampy[4] = loadImage('emoji/4.png');
  INSTRUCTIONS= loadImage("data/instructions.png");
}


function setup() { // setup() waits until preload() is done
  pixelDensity(1);
  advColors[0]=color(0);
  advColors[1]=color(255);
  advColors[2]=color(255,0,255);
  advColors[3]=color(0,255,255);
  advColors[4]=color(255,255,0);
  colorSet = color(255, 0, 0, 255);
  primColor= color(0, 0, 0, 255);//Color 1
  secColor = color(255, 255, 255, 255);//Color 2

  thickSlider = createSlider(0, 100, 20);
  thickSlider.position(1130, 371);
  thickSlider.style('width', '150px');

  satSlider = createSlider(0, 255, 255);
  satSlider.position(1129, 600);
  satSlider.style('width', '150px');

  var myCanvas = createCanvas(1320, 600);
  myGraphic = createGraphics(1100, 600);//Main graphic buffer
  colors = createGraphics(1100, 600);

  background(255);
  noStroke();

  frameRate(500);
  myGraphic.noStroke();
  myGraphic.fill(255);
  myGraphic.rect(200,0,900,600);
  //Chooses an action based on id recieved
  select('#instruct_button').mouseClicked(function() {
    currentState = states.INSTRUCT;
    showHelp*=(-1);
  });
  select('#brush1_button').mouseClicked(function(){
    currentState = states.BRUSH1;
  });
  select('#brush2_button').mouseClicked(function(){
    currentState = states.BRUSH2;
  });
  select('#brush3_button').mouseClicked(function(){
    currentState = states.BRUSH3;
  });
  select('#brush4_button').mouseClicked(function(){
    currentState = states.BRUSH4;
  });
  select('#pencil_button').mouseClicked(function() {
    currentState = states.PENCIL;
  });
  select('#stamp1_button').mouseClicked(function() {
    currentState = states.STAMP;
    startStamp=1;
  });
  select('#stamp2_button').mouseClicked(function() {
    currentState = states.STAMP;
    startStamp=2;
  });
  select('#stamp3_button').mouseClicked(function() {
    currentState = states.STAMP;
    startStamp=3;
  });
  select('#stamp4_button').mouseClicked(function() {
    currentState = states.STAMP;
    startStamp=4;
  });
  select('#text_button').mouseClicked(function() {
    textual="";
    currentState = states.TEXT;
  });
  select('#drop_button').mouseClicked(function() {
    currentState = states.DROPPLET;
    dropOnce=1;
  });
  select('#crop_button').mouseClicked(function() {
    if (finSelX!=0) cropThing();
  });
  select('#eraser_button').mouseClicked(function() {
    currentState = states.ERASER;
  });
  select('#clear_button').mouseClicked(function() {
    myGraphic.noStroke();
    myGraphic.fill(255);
    myGraphic.rect(200,0,900,600);
  });
  select('#spray_button').mouseClicked(function() {
    currentState = states.SPRAY;
  });
  select('#grid_button').mouseClicked(function() {
    gridYes *= (-1);
  });
  select('#rect_button').mouseClicked(function() {
    currentState = states.RECTANGLE;
  });
  select('#ellipse_button').mouseClicked(function() {
    currentState = states.ELLIPSE;
  });
  select('#savep_button').mouseClicked(function() {
    save(myGraphic.get(200, 0, 900, 600), "data/imageSave.png");
  });
  select('#copy_button').mouseClicked(function() {
    if(finSelX!=0){

      imgar=myGraphic.get(initSelX,initSelY,(finSelX-initSelX),(finSelY-initSelY));
      pasteable=1;
    }
  });
  select('#paste_button').mouseClicked(function() {
    if(pasteable==1) currentState = states.PASTE;
  });
  select('#savej_button').mouseClicked(function() {
    save(myGraphic.get(200, 0, 900, 600), "data/imageSave.jpeg");
  });
  select('#line_button').mouseClicked(function() {
    currentState = states.LINE;
  });
  select('#select_button').mouseClicked(function() {
    currentState = states.SELECT;
  });
  select('#bezier_button').mouseClicked(function() {
    currentState = states.BEZIER;
    bezstate=1;
  });
  select('#triangle_button').mouseClicked(function() {
    currentState = states.TRIANGLE;
    tristate=1;
  });
  select('#filter1_button').mouseClicked(function() {
    flipVertical();
  });
  select('#filter2_button').mouseClicked(function() {
    posterize();
  });
  select('#filter3_button').mouseClicked(function() {
    vintage();
  });
  select('#filter4_button').mouseClicked(function() {
    bandw();
  });
  select('#filter5_button').mouseClicked(function() {
    straightBlur();
  });
  select('#filter6_button').mouseClicked(function() {
    pixelate();
  });
  select('#filter7_button').mouseClicked(function() {
    perlinNoise();
  });
}
function draw() {
  //myGraphic.image(instructionSheet,200,0, 900, 600);
  strokeJoin(ROUND);
  myGraphic.strokeJoin(ROUND);
  if(effAct==1){myGraphic.image(effect, 200, 0,900, 600);effAct=0}

  if (currentState != states.TRIANGLE) tristate=0;
  if (currentState != states.BEZIER) bezstate=0;
  if (currentState != states.SELECT&&currentState != states.PASTE){
    initSelX=0;
    initSelY=0;
    finSelX=0;
    finSelY=0;
  }

  var satsat = satSlider.value();
  background(255);
  noStroke();
  image(myGraphic, 0, 0, 1100, 600);
  colorMode(RGB);

  var mX = mouseX ; //Mouse Coordinates
  var mY = mouseY ;
  var pmX = pmouseX ;
  var pmY = pmouseY ;
  var thickness = thickSlider.value();

  myGraphic.fill(0);

  if (mouseIsPressed) {
    if (currentState==states.SELECT) {//Select Tool/////////////////////////////////////////////////////////////////////////////////////////////
      if(mouseX>200&&mouseX<1100&&mouseY<600){
        if(selReset==1){
          initSelX = 0;
          initSelY = 0;
        }
        rectMode(CORNERS);
        fill(0,0,0,0);
        stroke(0);
        strokeWeight(1);

        if (initSelX == 0 && mouseX > 200) {
          initSelX = mouseX;
          initSelY = mouseY;
          finSelX=0;
          finSelY=0;
        }
        if (mouseX >= initSelX) rect(initSelX, initSelY, mouseX, mouseY);
        else rect(mouseX, mouseY, initSelX, initSelY);
        rectMode(CORNER);
        selReset=0;
      }
      if(finSelX!=0){
        rectMode(CORNERS);
        fill(0,0,0,0);
        stroke(0);
        strokeWeight(1);
        if (finSelX >= initSelX) rect(initSelX, initSelY, finSelX, finSelY);
        else rect(finSelX, finSelY, initSelX, initSelY);
        rectMode(CORNER);}
      }  else if (currentState==states.BRUSH1) {//Brush Styles (1)/////////////////////////////////////////////////////////////////////////////////////////////
        myGraphic.strokeCap(PROJECT);
        if (mX>200) {
          if (mouseButton == LEFT)
          myGraphic.stroke(primColor);
          else myGraphic.stroke(secColor);
          if (mouseButton == LEFT)
          myGraphic.fill(primColor);
          else myGraphic.fill(secColor);
          for (var i = 0; i<=thickness; i++) {
            myGraphic.strokeWeight(i);
            myGraphic.line(pmX, pmY, mX, mY);
          }
        }
        myGraphic.strokeCap(ROUND);
      } else if (currentState==states.BRUSH2) {//Brush Styles (2)/////////////////////////////////////////////////////////////////////////////////////////////
        myGraphic.strokeCap(SQUARE);
        if (mX>200) {
          if (mouseButton == LEFT) myGraphic.stroke(primColor);
          else myGraphic.stroke(secColor);
          if (mouseButton == LEFT) myGraphic.fill(primColor);
          else myGraphic.fill(secColor);
          for (var i = 0; i<=thickness; i++) {
            myGraphic.strokeWeight(i);
            myGraphic.line(pmX, pmY, mX, mY);
          }
        }
        myGraphic.strokeCap(ROUND);
      } else if (currentState==states.BRUSH3) {//Brush Styles (3)/////////////////////////////////////////////////////////////////////////////////////////////
        myGraphic.strokeCap(PROJECT);
        if (mX>200) {
          if (mouseButton == LEFT) myGraphic.stroke(primColor);
          else myGraphic.stroke(secColor);
          if (mouseButton == LEFT) myGraphic.fill(primColor);
          else myGraphic.fill(secColor);
          for (var i = 0; i<=thickness; i++) {
            myGraphic.strokeWeight(i);
            myGraphic.triangle(pmX+i, pmY+i, mX, mY, pmX+i, pmY+i);
          }
        }
        myGraphic.strokeCap(ROUND);
      } else if (currentState==states.BRUSH4) {//Brush Styles (4)/////////////////////////////////////////////////////////////////////////////////////////////
        myGraphic.strokeCap(PROJECT);
        if (mX>200) {
          if (mouseButton == LEFT) {
            myGraphic.stroke(primColor);
            myGraphic.fill(primColor);
          } else {
            myGraphic.fill(secColor);
            myGraphic.stroke(secColor);
          }
          for (var i = 0; i<=thickness; i++) {
            myGraphic.strokeWeight(i/8);
            myGraphic.ellipse(pmX, pmY, mX/8, mY/8);
            myGraphic.rotate(PI/5);
          }
        }
        myGraphic.strokeCap(ROUND);
      } else if (currentState == states.BRUSH) {///////////////////////////////////////////////////////////////////////////////////////////////
        if (mX > 200) {
          if (mouseButton == LEFT) myGraphic.stroke(primColor);
          else myGraphic.stroke(secColor);
          if (mouseButton == LEFT) myGraphic.fill(primColor);
          else myGraphic.fill(secColor);
          for (var i = 0; i <= thickness; i++) {
            myGraphic.stroke(0, 50 - (i));
            myGraphic.strokeWeight(i);
            myGraphic.line(pmX, pmY, mX, mY);
          }
        }
      } else if (currentState == states.PENCIL) {//pencil tool/////////////////////////////////////////////////////////////////////////////////////////////
        if (mX > 200) {
          myGraphic.fill(0);
          if (mouseButton == LEFT) myGraphic.stroke(primColor);
          else myGraphic.stroke(secColor);
          myGraphic.strokeWeight(thickness);
          myGraphic.line(pmX, pmY, mX, mY);
        }
      } else if (currentState == states.ERASER) {//Eraser tool/////////////////////////////////////////////////////////////////////////////////////////////
        if (mX > 200) {
          myGraphic.fill(255);
          myGraphic.stroke(secColor);
          myGraphic.strokeWeight(thickness);
          myGraphic.line(pmX, pmY, mX, mY);
        }
      } else if (currentState == states.SPRAY) {//Spray tool/////////////////////////////////////////////////////////////////////////////////////////////
        if (mX > 200) {
          for (var f = 0; f < (4*thickness); f++) {
            myGraphic.noStroke();
            if (mouseButton == LEFT) myGraphic.fill(primColor);
            else myGraphic.fill(secColor);
            var xloc = randomGaussian();
            var yloc = randomGaussian();
            var sd = thickness/6;
            xloc = (xloc * sd) + mX;
            yloc = (yloc * sd) + mY;
            myGraphic.ellipse(xloc, yloc, 1, 1); //Draws spraypaint based on random, averaging in the middle
          }
        }
      } else if (currentState == states.TEXT) {//Text tool/////////////////////////////////////////////////////////////////////////////////////////////
        if (mX > 200) {
          textAlign(CENTER);
          strokeWeight(.5);
          fill(primColor);
          stroke(primColor);
          textSize(thickSlider.value());
          text(textual,mouseX,mouseY);
        }
      } else if (currentState == states.ELLIPSE) {//Ellipse tool/////////////////////////////////////////////////////////////////////////////////////////////
        ellipseMode(CORNERS);
        fill(secColor);
        stroke(primColor);
        strokeWeight(thickness);
        if (initEllX == 0 && mouseX > 200&&mouseX<1100) {
          initEllX = mouseX;
          initEllY = mouseY;
        }
        if(initEllX!=0){
          ellipse(mouseX, mouseY, initEllX, initEllY);
        }
        ellipseMode(CORNERS);
      } else if (currentState == states.RECTANGLE) {//Rectangle tool/////////////////////////////////////////////////////////////////////////////////////////////
        strokeJoin(ROUND);
        myGraphic.strokeJoin(ROUND);
        rectMode(CORNERS);
        fill(secColor);
        stroke(primColor);
        strokeWeight(thickness);
        if (initRectX == 0 && mouseX > 200&&mouseX<1100) {
          initRectX = mouseX;
          initRectY = mouseY;
        }
        if(initRectX!=0){
          if (mouseX >= initRectX) rect(initRectX, initRectY, mouseX, mouseY);
          else rect(mouseX, mouseY, initRectX, initRectY);
        }
        rectMode(CORNER);
        strokeJoin(ROUND);
        myGraphic.strokeJoin(ROUND);
      } else if (currentState == states.LINE) {//Line tool/////////////////////////////////////////////////////////////////////////////////////////////
        stroke(primColor);
        strokeWeight(thickness);
        if (initLX==0&&mouseX>200&&mouseX<1100) {
          initLX=mouseX;
          initLY=mouseY;
        }
        if(initLX!=0){
          if (mouseX>=initLX) {
            line(initLX, initLY, mouseX, mouseY);
          } else {
            line(mouseX, mouseY, initLX, initLY);
          }
        }
      } else if (currentState == states.PASTE) {//Paste tool/////////////////////////////////////////////////////////////////////////////////////////////
        if(mouseX>=200 &&mouseX<=1100){
          imageMode(CENTER);
          image(imgar,mouseX,mouseY,(finSelX-initSelX),(finSelY-initSelY));
          imageMode(CORNER);
        }
      }
    } else if (!mouseIsPressed) {//When mouse is not pressed////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (currentState == states.ELLIPSE) {//Ellipse Graphic/////////////////////////////////////////////////////////////////////////////////////////////
        if (initEllX != 0) {
          ellipseMode(CORNERS);
          fill(secColor);
          stroke(primColor);
          strokeWeight(thickness);
          if (initEllX == 0 && mouseX > 200) {
            initEllX = mouseX;
            initEllY = mouseY;
          }
          ellipse(mouseX, mouseY, initEllX, initEllY);
          ellipseMode(CORNERS);

          myGraphic.ellipseMode(CORNERS);
          myGraphic.fill(secColor);
          myGraphic.stroke(primColor);
          myGraphic.strokeWeight(thickness );
          myGraphic.ellipse(mX,mY,initEllX , initEllY );
          initEllY = 0;
          initEllX = 0;
          myGraphic.ellipseMode(CENTER);
        }
      } else if (currentState == states.PASTE) {//Paste on graphic/////////////////////////////////////////////////////////////////////////////////////////////
        if(mouseX>=200&&mouseX<=1100){
          imageMode(CENTER);
          image(imgar,mouseX,mouseY,(finSelX-initSelX),(finSelY-initSelY));
          imageMode(CORNER);
        }
      } else if (currentState == states.RECTANGLE) {//Rectangle on Graphic/////////////////////////////////////////////////////////////////////////////////////////////
        if (initRectX != 0) {
          strokeJoin(ROUND);
          myGraphic.strokeJoin(ROUND);
          rectMode(CORNERS);
          fill(secColor);
          stroke(primColor);
          strokeWeight(thickness);
          if (mouseX >= initRectX) rect(initRectX, initRectY, mouseX, mouseY);
          else rect(mouseX, mouseY, initRectX, initRectY);

          rectMode(CORNER);
          strokeJoin(ROUND);
          myGraphic.strokeJoin(ROUND);

          strokeJoin(ROUND);
          myGraphic.strokeJoin(ROUND);
          myGraphic.rectMode(CORNERS);
          myGraphic.fill(secColor);
          myGraphic.stroke(primColor);
          myGraphic.strokeWeight(thickness );
          myGraphic.rect(initRectX , initRectY , mX, mY);

          initRectX = 0;
          initRectY = 0;
          myGraphic.rectMode(CORNER);
          strokeJoin(ROUND);
          myGraphic.strokeJoin(ROUND);
        }
      } else if (currentState == states.LINE) {//Line on graphic/////////////////////////////////////////////////////////////////////////////////////////////
        if (initLX !=0) {
          stroke(primColor);
          strokeWeight(thickness);
          if (initLX==0&&mouseX>200) {
            initLX=mouseX;
            initLY=mouseY;
          }
          if (mouseX>=initLX) {
            line(initLX, initLY, mouseX, mouseY);
          } else {
            line(mouseX, mouseY, initLX, initLY);
          }

          myGraphic.stroke(primColor);
          myGraphic.strokeWeight(thickness);
          myGraphic.line(initLX, initLY, mouseX, mouseY);

          initLY = 0;
          initLX = 0;
        }
      } else if (currentState==states.SELECT) {//Select large area/////////////////////////////////////////////////////////////////////////////////////////////
        rectMode(CORNERS);
        fill(0,0,0,0);
        stroke(0);
        strokeWeight(1);
        if(finSelX==0){
          finSelX = mouseX;
          finSelY = mouseY;
        }
        if (mouseX >= initSelX) rect(initSelX, initSelY, finSelX, finSelY);
        else rect(finSelX, finSelY, initSelX, initSelY);
        rectMode(CORNER);
        selReset=1;
      }
    }/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (currentState == states.TRIANGLE) {//triangle in buffer/////////////////////////////////////////////////////////////////////////////////////////////
      fill(secColor);
      stroke(primColor);
      strokeWeight(thickness);
      if (tristate ==2) {
        line(tri1x, tri1y, mouseX, mouseY);
      } else if (tristate ==3) {
        triangle(tri1x, tri1y, tri2x, tri2y, mouseX, mouseY)
      }
    } else if (currentState == states.BEZIER) {//Bezier in buffer/////////////////////////////////////////////////////////////////////////////////////////////
      stroke(primColor);
      strokeWeight(thickness);
      fill(0,0);
      if (bezstate ==2) {
        line(bez1x, bez1y, mouseX, mouseY);
      } else if (bezstate ==3) {
        fill(0, 0);
        bezier(bez1x, bez1y, bez2x, bez2y, mouseX, mouseY, mouseX, mouseY);
      } else if (bezstate ==4) {
        fill(0, 0);
        bezier(bez1x, bez1y, bez2x, bez2y, bez3x, bez3y, mouseX, mouseY);

      } else if (bezstate ==5) {
        fill(0, 0);
        bezier(bez1x, bez1y, bez2x, bez2y, bez3x, bez3y, bez4x, bez4y);
        myGraphic.image(get(200,0,1100,600),200,0,1100,600);
        myGraphic.fill(0, 0);
        myGraphic.stroke(primColor);
        myGraphic.strokeWeight((thickSlider.value()) );
        myGraphic.fill(0, 0);
        stroke(0);
        bez1x=0;
        bez1y=0;
        bez2x=0;
        bez2y=0;
        bez3x=0;
        bez3y=0;
        bez4x=0;
        bez4y=0;
        bezstate=1;
      }
    } else if (currentState == states.TEXT) {//Text in buffer/////////////////////////////////////////////////////////////////////////////////////////////
      textAlign(CENTER);
      fill(primColor);
      stroke(primColor);
      strokeWeight(.5);
      textSize(thickSlider.value());
      text(textual,mouseX,mouseY);
    } else if (currentState == states.STAMP) {//Stamp in buffer/////////////////////////////////////////////////////////////////////////////////////////////
      if(startStamp!=0){
        newStamp=stampy[startStamp];
      }
      if(mouseX<=1100 && mouseX>=200)image(newStamp,mouseX-(((30/2.0)*thickness)/2),mouseY-(((30/2.0)*thickness)/2),(30/2.0)*thickness,(30/2.0)*thickness);
    } else if (currentState==states.INSTRUCT && showHelp==1) {//Instructions in buffer/////////////////////////////////////////////////////////////////////////////////////////////
      image(INSTRUCTIONS,200,0, 900, 600);
    }/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(mouseX>200 && mouseX<1100 &&mouseY<=600&& (currentState== states.STAMP||currentState== states.TEXT||currentState== states.BRUSH1||currentState== states.BRUSH2||currentState== states.BRUSH3||currentState== states.BRUSH4||currentState== states.ELLIPSE||currentState== states.SELECT)){ //Cursor settings
      noCursor();
      stroke(255);
      strokeWeight(3);
      line(mouseX-5,mouseY,mouseX+5,mouseY);
      line(mouseX,mouseY-5,mouseX,mouseY+5);
      stroke(0);
      strokeWeight(1);
      line(mouseX-5,mouseY,mouseX+5,mouseY);
      line(mouseX,mouseY-5,mouseX,mouseY+5);
    }
    else if(mouseX>200 && mouseX<1100 &&mouseY<=600&& currentState!= states.DROPPLET){
      noCursor();
      noFill();
      stroke(0);
      strokeWeight(1);
      ellipseMode(CENTER);
      ellipse(mouseX,mouseY,thickness,thickness);
      ellipseMode(CORNER);

    }else if(mouseX>200 && mouseX<1100 &&mouseY<=600&& currentState== states.DROPPLET){
      noCursor();
      if(dropOnce==1){
        colorEyer = myGraphic.get(0,0,1100,600);
      }
      var mostRecent=color(red(colorEyer.get(mouseX,mouseY)),green(colorEyer.get(mouseX,mouseY)),blue(colorEyer.get(mouseX,mouseY)),255);
      fill(mostRecent);
      stroke(255,100,100);
      strokeWeight(.5);
      ellipse(mouseX,mouseY,8,11)
      dropOnce=0;
    }
    else cursor(); //There is a cursor
    myGraphic.noStroke();
    myGraphic.fill(189, 195, 199); //Fills for background color
    noStroke();
    fill(189, 195, 199);
    rect(0, 0, 200, 1000);

    myGraphic.colorMode(RGB);
    myGraphic.stroke(0);
    myGraphic.strokeWeight(2);
    var info = select('#infoContainer');

    //Shows rounded X and Y coordinates
    info.html("<DIV align=\"right\" style=\"position: absolute; top:629px; left:876px; width:200px; height:25px\"class=\"noselect\">" + round(mouseX - 200) + ", " + round(mouseY) + "</DIV>");




    noStroke();
    fill(189, 195, 199);
    rect(1100, 0, 1300, 1000);
    rectMode(CORNER);
    image(colorImg, 1120, 480, 150, 100); //Draws color picker
    colorMode(RGB);
    noStroke();

    for(var beta = 0; beta<=255;beta++){ //Accomodating for p5 glitch, sets saturate to inverse of satsat
      if(satsat==beta){
        saturate=255-beta;
        break;
      }
    }

    strokeWeight(3);
    if(firsec==1) stroke(255, 204, 0);
    else noStroke();
    fill(primColor); //Shows Primary and secondary color buffers
    rect(1278, 489, 30, 30);
    if(firsec==2) stroke(255, 204, 0);
    else noStroke();
    fill(secColor);
    rect(1278, 537, 30, 30);
    noStroke();
    fill(0,saturate);
    rect(1120,480,150,100);

    fill(0,0,0,0);
    if(firsec==1) stroke(255, 204, 0);
    else noStroke();
    rect(1278, 489, 30, 30);
    if(firsec==2) stroke(255, 204, 0);
    else noStroke();
    rect(1278, 537, 30, 30);
    noStroke();


    colorMode(HSB);



    colorMode(HSB);
    stroke(0);
    strokeWeight(1);
    if(gridYes==1&&showHelp==-1){//Shows grid lines while gridYes is 1
      for (var i = 200; i < 1100; i += 20) {
        line(i, 0, i, 600);
      }
      for (var i = 0; i < 1100; i += 20) {
        line(200, i, 1100, i);
      }
      noFill();
      rect(200,0,900,599);
    }


    for(var v=0;v<5;v++){ //Backgrounds for color pallettes
      for(var c=0;c<2;c++){
        colorMode(RGB);
        fill(150);
        noStroke();
        rect(1120+(v*40),390+(c*40),30,30);
      }
    }

    fill(255,0,0);//Colors in default color pallette
    rect(1124,394,22,22);
    fill(0,255,0);
    rect(1164,394,22,22);
    fill(0,0,255);
    rect(1204,394,22,22);
    fill(255,255,0);
    rect(1244,394,22,22);
    fill(255,255,255);
    rect(1284,394,22,22);
    stroke(255,0,0);
    line(1284,394,1284+22,394+22)
    noStroke();

    fill(advColors[0]);//Colors in color pallette
    rect(1124,434,22,22);
    fill(advColors[1]);
    rect(1164,434,22,22);
    fill(advColors[2]);
    rect(1204,434,22,22);
    fill(advColors[3]);
    rect(1244,434,22,22);
    fill(advColors[4]);
    rect(1284,434,22,22);




    noStroke();
    strokeWeight(1);
    if(clear1==1){ //Show rectangle with red dash
      fill(255,255,255);
      rect(1283,490,29,29);
      stroke(255,0,0);
      line(1283,490,1278+29,489+29)
      noStroke();
    }
    if(clear2==1){
      fill(255,255,255);
      rect(1283,538,29,29);
      stroke(255,0,0);
      line(1283,538,1278+29,537+29)
      noStroke();
    }


  }//End of Draw

  function mouseClicked() { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mouse clicked()
    if (currentState == states.STAMP) {
      if(mouseX<=1100 && mouseX>=200&&mouseY<=600){
        myGraphic.image(stampy[startStamp],(mouseX-(((30/2.0)*(thickSlider.value()))/2)),(mouseY-(((30/2.0)*(thickSlider.value()))/2)),((30/2.0)*(thickSlider.value())),((30/2.0)*(thickSlider.value())));
      }
    } else if (currentState == states.DROPPLET) {
      if (mouseX > 200&&mouseX<1100&&mouseY<600) {
        var colorDropper = myGraphic.get(0,0,1100,600);


        if(alpha(primColor)==0)primColor=color(255);

        if(alpha(secColor)==0)secColor=color(255);

        var newColor=colorDropper.get(mouseX,mouseY);

        if(alpha(newColor)==0)newColor=color(255);
        else newColor=color(red(newColor),green(newColor),blue(newColor),255);
        if(!(red(newColor)==red(advColors[0])&&green(newColor)==green(advColors[0])&&blue(newColor)==blue(advColors[0])&&alpha(newColor)==alpha(advColors[0]))){
          advColors[4]=advColors[3];
          advColors[3]=advColors[2];
          advColors[2]=advColors[1];
          advColors[1]=advColors[0];
          advColors[0]=newColor;
        }

        if(mouseButton==LEFT){
          primColor=newColor;
          clear1=0;
        }
        else{
          secColor=newColor;
          clear2=0;
        }

      }
    }

    for(var v=0;v<5;v++){

      if (mouseY >= 390 && mouseY <= 420 && mouseX >= 1120+(v*40) && mouseX <= (1120+(v*40))+30){ //Sets color from default color pallette
        moveSat=1;
        if(clickCount==0){
          if (firsec==1){ primColor= color(255,0,0);
            clear1=0;}
            else{ secColor= color(255,0,0);clear2=0;}
          }
          if(clickCount==1){
            if (firsec==1){clear1=0; primColor= color(0,255,0);}
            else {secColor= color(0,255,0);
              clear2=0;}
            }
            if(clickCount==2){
              if (firsec==1){ primColor= color(0,0,255); clear1=0;}
              else {secColor= color(0,0,255);
                clear2=0}
              }
              if(clickCount==3){
                if (firsec==1) {primColor= color(255,255,0); clear1=0}
                else {secColor= color(255,255,0);
                  clear2=0;}
                }
                if(clickCount==4){
                  if (firsec==1) {
                    primColor=color(0,0,0,0);
                    clear1=1;
                  }
                  else {
                    secColor= color(0,0,0,0);
                    clear2=1;
                  }
                }
              }
              clickCount++;
            }
            clickCount=0;

            if (mouseY >= 480 && mouseY <= 580 && mouseX >= 1120 && mouseX <= 1270) { //If mouse is over color pallette
              var ncolorImg=get(1120,480,150,100);
              if(!(red(color(ncolorImg.get((mouseX-1120), (mouseY-480))))==red(advColors[0])&&green(color(ncolorImg.get((mouseX-1120), (mouseY-480))))==green(advColors[0])&&blue(color(ncolorImg.get((mouseX-1120), (mouseY-480))))==blue(advColors[0])&&alpha(color(ncolorImg.get((mouseX-1120), (mouseY-480))))==alpha(advColors[0]))){
                advColors[4]=advColors[3];
                advColors[3]=advColors[2];
                advColors[2]=advColors[1];
                advColors[1]=advColors[0];
                advColors[0]=color(ncolorImg.get((mouseX-1120), (mouseY-480)));
              }
              if (firsec==1){ clear1=0;primColor= color(ncolorImg.get((mouseX-1120), (mouseY-480)));} //Sets color1 or 2
              else {clear2=0;secColor= color(ncolorImg.get((mouseX-1120), (mouseY-480)));}

              moveSat=1;
            } else if (mouseX<=1312 && mouseX>=1278 &&mouseY <=519 &&mouseY>=489){ //Click on color1 section
              firsec=1;
              moveSat=1;
            } else if (mouseX<=1312 && mouseX>=1278 &&mouseY <=567 &&mouseY>=537) { //Click on color2 section
              firsec=2;
              moveSat=1;
            }

            if (currentState == states.PASTE) { //Paste image in imgar variable
              if (mouseX > 200&&mouseX < 1100) {
                myGraphic.imageMode(CENTER);
                myGraphic.image(imgar,mouseX,mouseY,(finSelX-initSelX),(finSelY-initSelY));
                myGraphic.imageMode(CORNER);
              }
            } else if (currentState == states.TEXT) { //Places written text upon click
              if (mouseX > 200&&mouseX < 1100) {
                myGraphic.strokeWeight(.5);
                myGraphic.textSize((thickSlider.value()));
                myGraphic.fill(primColor);
                myGraphic.stroke(primColor);
                myGraphic.textAlign(CENTER);
                myGraphic.text(textual,mouseX,mouseY);
              }
            } else if (currentState == states.TRIANGLE) { //Forms triangle
              if (tristate ==1 && ((mouseX) > (200)) && ((mouseX) < (1100)) ) {
                tri1x=mouseX;
                tri1y=mouseY;
                tristate=2;
              } else if (tristate ==2) {
                tri2x=mouseX;
                tri2y=mouseY;
                tristate=3;
              } else if (tristate ==3) {
                tri3x=mouseX;
                tri3y=mouseY;
                myGraphic.fill(secColor);
                myGraphic.stroke(primColor);
                myGraphic.strokeWeight((thickSlider.value()) );
                myGraphic.triangle(tri1x, tri1y, tri2x, tri2y, tri3x, tri3y);
                tristate=1;
                tri1x=0;
                tri1y=0;
                tri2x=0;
                tri2y=0;
                tri3x=0;
                tri3y=0;
              }
            } else if (currentState == states.BEZIER) { //Forms bezier curve
              if (bezstate ==1 && ((mouseX) > (200)) && ((mouseX) < (1100)) ) {
                bez1x=mouseX;
                bez1y=mouseY;
                bezstate=2;
              } else if (bezstate ==2) {
                bez2x=mouseX;
                bez2y=mouseY;
                bezstate=3;
              } else if (bezstate ==3) {
                bez3x=mouseX;
                bez3y=mouseY;
                bezstate=4;
              } else if (bezstate ==4) {
                bez4x=mouseX;
                bez4y=mouseY;
                bezstate=5;
              }
            }

            for(var v=0;v<5;v++){ //Fills up colors from advanced color pallette
              if (mouseY >= 430 && mouseY <= 460 && mouseX >= 1120+(v*40) && mouseX <= (1120+(v*40))+30){
                if (firsec==1) primColor= advColors[clickCount];
                else secColor= advColors[clickCount];
                moveSat=0;
              }
              clickCount++;
            }
            clickCount=0;
          }
          function cropThing() {
            var regPic=myGraphic.get(0,0,1100,600);
            myGraphic.fill(255);
            myGraphic.rect(0,0,1100,600);
            myGraphic.image(regPic,0,0,1100,600);
            if(finSelX<initSelX&& finSelY<initSelY){
              var newPic= myGraphic.get(finSelX,finSelY,(initSelX-finSelX),(initSelY-finSelY));
            }
            else if(finSelX<initSelX){
              var newPic= myGraphic.get(finSelX,initSelY,(initSelX-finSelX),(finSelY-initSelY));
            }else if(finSelY<initSelY){
              var newPic= myGraphic.get(initSelX,finSelY,(finSelX-initSelX),(initSelY-finSelY));
            } else {
              var newPic= myGraphic.get(initSelX,initSelY,(finSelX-initSelX),(finSelY-initSelY));
            }
            myGraphic.fill(255);
            myGraphic.noStroke();
            myGraphic.rect(0,0,1100,600);
            myGraphic.imageMode(CENTER);
            if((finSelX-initSelX)/900.0 > (finSelY-initSelY)/600.0){
              myGraphic.image(newPic,650,300,900,(900.0/(finSelX-initSelX))*(finSelY-initSelY));
            } else{
              myGraphic.image(newPic,650,300,(600.0/(finSelY-initSelY))*(finSelX-initSelX),600);
            }
            myGraphic.imageMode(CORNER);
          }
          function flipVertical() {
            myGraphic.loadPixels();
            var h = myGraphic.height, w = myGraphic.width+200;
            for (var y = 0; y < h; y++) {
              for (var x = 0; x < w/2; x++) {
                copyPix(x,y,w-x-1,y);
              } //swap color information for each pixel
            }

            updatePixels();
            effect=get(200,0,900,600);
            effAct=1;

          }
          function posterize() {
            myGraphic.loadPixels();
            var colorNum=3;
            var avgSet = [];
            var setNum = [];
            var newAvg=[];
            var basicAvg=[];
            var rowLength = 4 * (myGraphic.width);//How many total spots in the pixels array
            //indicates a new row in the image?
            //go through half of the pixels
            for (var y = 0; y <= myGraphic.height; y++) {
              var bottomRow = rowLength * (myGraphic.height-y); //last row, 2nd to last,... up to middle row
              for (var x = 800; x < rowLength; x +=4) { //x is the column
                var grey = (pixels[bottomRow + x]+pixels[bottomRow + x+1]+pixels[bottomRow + x+2])/3.0;
                for(var colorPal=0; colorPal<=colorNum; colorPal++){
                  if(grey>=colorPal*(255/colorNum) &&grey<=(colorPal+1)*(255/colorNum)){
                    grey=(colorPal+.5)*(255/colorNum);
                  }
                }
                pixels[bottomRow + x]=grey;
                pixels[bottomRow + x+1]=grey;
                pixels[bottomRow + x+2]=grey;
              }
            }
            updatePixels();
            effect=get(200,0,900,600);
            effAct=1;
          }
          function bandw() {
            myGraphic.loadPixels();
            var colorNum=10;
            var avgSet = [];
            var setNum = [];
            var newAvg=[];
            var basicAvg=[];
            var rowLength = 4 * (myGraphic.width);//How many total spots in the pixels array
            //indicates a new row in the image?
            //go through half of the pixels
            for (var y = 0; y <= myGraphic.height; y++) {
              var bottomRow = rowLength * (myGraphic.height-y); //last row, 2nd to last,... up to middle row
              for (var x = 800; x < rowLength; x +=4) { //x is the column
                var grey = (pixels[bottomRow + x]+pixels[bottomRow + x+1]+pixels[bottomRow + x+2])/3.0;
                pixels[bottomRow + x]=grey;
                pixels[bottomRow + x+1]=grey;
                pixels[bottomRow + x+2]=grey;
              }
            }
            updatePixels();
            effect=get(200,0,900,600);
            effAct=1;
          }
          function pixelate() {

            var size = 50;
            var pixelImg=myGraphic.get(200,0,900,600);
            for (var i = 0; i<pixelImg.width; i+=size){
              for (var j=0; j<pixelImg.height; j+=size){
                myGraphic.fill(red(color(pixelImg.get(i,j))),green(color(pixelImg.get(i,j))),blue(color(pixelImg.get(i,j))),255);
                myGraphic.noStroke();
                //rint(i + ", " +j);
                //console.log(c[0]+" "+c[1]+" "+c[2]+" "+c[3]);
                myGraphic.rect(i+200,j,size,size);
              }
            }
          }

          function perlinNoise() {

            var size = 60;
            var psize = 100*noise(.01);
            var pixelImg=myGraphic.get(200,0,900,600);
            var i=0;
            for (var j=0; j<pixelImg.height; j+=size){
              while (i<=myGraphic.width){


                psize = 150*noise(random(3));
                myGraphic.fill(red(color(pixelImg.get(i+(0*psize),j+(0*size)))),green(color(pixelImg.get(i+(0*psize),j+(0*size)))),blue(color(pixelImg.get(i+(0*psize),j+(0*size)))),255);
                myGraphic.stroke(red(color(pixelImg.get(i+(0*psize),j+(0*size)))),green(color(pixelImg.get(i+(0*psize),j+(0*size)))),blue(color(pixelImg.get(i+(0*psize),j+(0*size)))),255);
                //rint(i + ", " +j);
                //console.log(c[0]+" "+c[1]+" "+c[2]+" "+c[3]);
                myGraphic.rect(i+200,j,psize,size);
                i+=psize;
              }
              i=0;
            }

            /*var noiseScale=0.02;
            var noiseChange=200;
            for (var i = 200; i<myGraphic.width; i+=5){
            for (var j=0; j<myGraphic.height; j+=5){
            myGraphic.noStroke();
            var noiseVal = noise((random(700)+i)*noiseScale, random(700)*noiseScale);
            myGraphic.fill(0,0,0,noiseVal*255);
            myGraphic.rect(i,j,5,5);
            noiseChange++;
          }
        }


        var noiseScale=0.02;
        var h = myGraphic.height, w = myGraphic.width;
        for (var y = 0; y < h; y+=1) {
        for (var x = 200; x < w; x+=1) {
        var noiseVal = noise((x)*noiseScale, y*noiseScale);
        stroke(noiseVal*x,noiseVal*y,noiseVal*255,105);
        fill(noiseVal*x,noiseVal*y,noiseVal*255,105);
        ellipse(x+noiseVal, y +noiseVal*80, 3, 3)
      } //swap color information for each pixel
    }



    myGraphic.loadPixels();
    var size = 20thickSlider.value();

    for (var i = 200; i<=myGraphic.width; i+=20){
    for (var j=0; j<=myGraphic.height; j+=20){
    myGraphic.stroke(0);

    myGraphic.colorMode(RGB);
    myGraphic.fill(0);
    myGraphic.rect(i,j,20,20);
  }
}
text("hi",300,300);
updatePixels();
effect=get(200,0,900,600);
effAct=1;



myGraphic.loadPixels();
var increment = 0.002;

var xvalue = 0.0;
var yvalue = 0.0;
for (var x = 0; x < myGraphic.width; x++) {
for (var y = 0; y < myGraphic.height; y++) {
yvalue += increment;
var c = color(myGraphic.get(x, y));
var bright = noise(xvalue, yvalue)*25;
var redValue = red(c);
var greenValue = green(c);
pixels[y*width+x] = color(redValue+bright,greenValue, bright);
}//204,102
}

updatePixels();
effect=get(200,0,900,600);
effAct=1;*/
}
function vintage () {
  colorMode(RGB);
  var increment = 0.002;
  myGraphic.loadPixels();
  var xvalue = 0.0;
  var yvalue = 0.0;
  var newRand=noise(random(1));
  var newImgLen=myGraphic.get(200,0,900,600);
  var rowLength = 4 * (myGraphic.width);//How many total spots in the pixels array
  for (var y = 0; y < myGraphic.height+1; y++) {
    var bottomRow = rowLength * (myGraphic.height - y); //last row, 2nd to last,... up to middle row

    for (var x = 800; x < rowLength; x+=4) {
      if(x%600==0)newRand=noise(random(1))*newImgLen.get(x/4,y);
      //yvalue += increment;
      //pixels[bottomRow+(x)-(2*rowLength)] += noise(random(1))*newImgLen.get(x/4,y);
      pixels[bottomRow+(x)+2-(2*rowLength)] = newRand;
    }

  }
  println("vint");

  updatePixels();
  effect=get(200,0,900,600);
  effAct=1;
}
function straightBlur () {
  myGraphic.loadPixels();
  var rowLength = 4 * (myGraphic.width);//How many total spots in the pixels array
  var radius=10;
  //indicates a new row in the image?
  //go through half of the pixels
  for (var y = 0; y <= myGraphic.height-1; y++) {
    //y controls the corresponding rows to be switched
    var bottomRow = rowLength * (myGraphic.height - y); //last row, 2nd to last,... up to middle row
    for (var x = 800; x < rowLength; x ++) { //x is the column
      /*var numPix=0;
      var rVal=0;
      var gVal=0;
      var bVal=0;
      for (var h = y - radius; h <= y+radius; h ++) {
      var newbottomRow = rowLength * (myGraphic.height - h);
      for (var w = x-radius;w <= x+radius; w ++) {
      if((w>=800)&&(h>=0)&&(h<myGraphic.height)&&(w<myGraphic.width*4)){
      numPix++;
      rVal+= pixels[newbottomRow+w];
      gVal+=pixels[newbottomRow+w+1];
      bVal+=pixels[newbottomRow+w+2];
    }
  }
}
pixels[bottomRow+x]=round(rVal/numPix);
pixels[bottomRow+x+1]=round(gVal/numPix);
pixels[bottomRow+x+2]=round(bVal/numPix);
println(rVal/numPix + " X: " + x);*/
if(x>803 && x<rowLength-4 && y> 1)  pixels[bottomRow + x] = (pixels[bottomRow+x-rowLength-4] + pixels[bottomRow+x-rowLength] + pixels[bottomRow + x-rowLength+4] + pixels[bottomRow+x+4] + pixels[bottomRow+x+rowLength+4] + pixels[bottomRow+x+rowLength] + pixels[bottomRow+x+rowLength-4] + pixels[bottomRow+x-4])/8;
else if(x<804 && y<=1)  pixels[bottomRow + x] = ( pixels[bottomRow+x-rowLength] + pixels[bottomRow + x-rowLength+4] + pixels[bottomRow+x+4]   )/3;
else if(x>=rowLength-4 && y<= 1)  pixels[bottomRow + x] = (pixels[bottomRow+x-rowLength-4] + pixels[bottomRow+x-rowLength] + pixels[bottomRow+x-4])/3;
else if(y<=1)  pixels[bottomRow + x] = (pixels[bottomRow+x-rowLength-4] + pixels[bottomRow+x-rowLength] + pixels[bottomRow + x-rowLength+4] + pixels[bottomRow+x+4] + pixels[bottomRow+x-4])/5;
else if(x<804)  pixels[bottomRow + x] = ( pixels[bottomRow+x-rowLength] + pixels[bottomRow + x-rowLength+4] + pixels[bottomRow+x+4] + pixels[bottomRow+x+rowLength+4] + pixels[bottomRow+x+rowLength]  )/5;
else if(x>=rowLength-4)  pixels[bottomRow + x] = (pixels[bottomRow+x-rowLength-4] + pixels[bottomRow+x-rowLength]    + pixels[bottomRow+x+rowLength] + pixels[bottomRow+x+rowLength-4] + pixels[bottomRow+x-4])/5;
}//swap color information for each pixel

}


updatePixels();
effect=get(200,0,900,600);
effAct=1;

}
function copyPix(originX,originY,destX,destY) {
  var origin = (originY * myGraphic.width + originX) * 4; //convert to 1D pixels index
  var dest = (destY * myGraphic.width + destX) * 4;//convert to 1D pixels index
  pixels[dest] = pixels[origin];
  pixels[dest+1] = pixels[origin+1];
  pixels[dest+2] = pixels[origin+2];
  pixels[dest+3] = pixels[origin+3];
}

function keyPressed() { //Whena  key is pressed

  if (keyCode === ESCAPE) {
    currentState = states.NOTHING;
    tristate=0;
    initEllX = 0;
    initRectX = 0;
    initEllY = 0;
    initRectY = 0;
    initLX = 0;
    initLY = 0;
    tri1x = 0;
    tri1y = 0;
    tri2x = 0;
    tri2y = 0;
    tri3x = 0;
    tri3y = 0;
    bezstate = 0;
    bez1x = 0;
    bez1y = 0;
    bez2x = 0;
    bez2y = 0;
    bez3x = 0;
    bez3y = 0;
    bez4x = 0;
    bez4y = 0;
    startStamp=0;
  } else if (keyCode == DELETE||keyCode == 8){ //For removing areas of pixels
    if(currentState == states.SELECT&&finSelX!=0){
      myGraphic.fill(255);
      myGraphic.noStroke();
      myGraphic.rect(initSelX,initSelY,(finSelX)-(initSelX),(finSelY)-(initSelY));
    }
  } else if (keyCode>=32 && keyCode<=126){ //for TEXT
    textual+=(char(keyCode));
  }
}
