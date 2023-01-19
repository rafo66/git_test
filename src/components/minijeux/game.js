import React, { useRef, useEffect } from "react";

const blocks = [  
  [{ text: "France" }, { text: "France" }],
  [{ text: "Japon" }, { text: "France" }, { text: "France" }, { text: "France" }, { text: "France" }, { text: "France" }]
];

const CANVAS_WIDTH = 800/0.8;
const CANVAS_HEIGHT = 600/0.8;

const colX = [(CANVAS_WIDTH / 800) * 50, (CANVAS_WIDTH / 800) * 600];


const colYSpacingPrecet = [
  (CANVAS_HEIGHT / 600) * 250,  // 2
  (CANVAS_HEIGHT / 600) * 200, // 3
  (CANVAS_HEIGHT / 600) * 150, // 4
  (CANVAS_HEIGHT / 600) * 120, // 5
  (CANVAS_HEIGHT / 600) * 100 // 6
]

const colYOffsetPrecet = [
  (CANVAS_HEIGHT / (600/1.2)) * 120, // 2
  (CANVAS_HEIGHT / (600/1.2)) * 60, // 3
  (CANVAS_HEIGHT / (600/1.2)) * 40, // 4
  (CANVAS_HEIGHT / (600/1.2)) * 30, // 5
  (CANVAS_HEIGHT / (600/1.2)) * 20 // 6
]

const colYGaucheOffset = colYOffsetPrecet[blocks[0].length-2];
const colYDroitOffset = colYOffsetPrecet[blocks[1].length-2]; 

const colYSpacingGauche = colYSpacingPrecet[blocks[0].length-2];
const colYSpacingDroit = colYSpacingPrecet[blocks[1].length-2];

const colYSpacings = [colYSpacingGauche, colYSpacingDroit];
const colYOffsets = [colYGaucheOffset, colYDroitOffset];



const blockSize = [(CANVAS_WIDTH / 800) * 150, (CANVAS_HEIGHT / 600) * 50];
const anchorSize = [(CANVAS_WIDTH / 800) * 15, (CANVAS_HEIGHT / 600) * 15];

const centresGauche = [];

for (let i = 0; i < blocks[0].length; i++) {
  centresGauche.push([    colX[0] + blockSize[0] + anchorSize[0] / 2,
  colYOffsets[0] + i * colYSpacings[0] + blockSize[1] / 2
  ]);
}

const centresDroite = [];
for (let i = 0; i < blocks[1].length; i++) {
  centresDroite.push([colX[1] - anchorSize[0] / 2, colYOffsets[1] + i * colYSpacings[1] + blockSize[1] / 2]);
}

const centres = [centresGauche, centresDroite];



const blockColorGradiant1 = "rgb(110, 160, 138)"
const blockColorGradiant2 = "rgb(110, 160, 181)"


const contourBlock = "rgb(0, 10, 100)"
const contourThikness = 4;

const leftAnchorColor = "rgb(0, 0, 0)"
const rightAnchorColor = "rgb(255, 255, 255)"

const textFont = "20px Arial"
const textFontColor = "rgb(255, 255, 255)"

const drawnLineThikness = 4;
const dashedLineStyle = [15, 15]; // [longueurDessine, espacePasDessine]

const Game = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  let isDragging = false;
  let startPos;
  let endPos;
  let drawnedLines = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    function drawBlocks() {
      ctx.lineWidth = contourThikness;
      ctx.strokeStyle = contourBlock;

      for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
          const gradient = ctx.createLinearGradient(
            colX[i],
            colYOffsets[i] + j * colYSpacings[i],
            colX[i],
            (CANVAS_HEIGHT / 600) * colYOffsets[i] + j * colYSpacings[i] + blockSize[1]
          );
          gradient.addColorStop(0, blockColorGradiant1);
          gradient.addColorStop(1, blockColorGradiant2);
          ctx.fillStyle = gradient;
          ctx.fillRect(colX[i], colYOffsets[i] + j * colYSpacings[i], blockSize[0], blockSize[1]);
         
          ctx.strokeRect(colX[i], colYOffsets[i] + j * colYSpacings[i], blockSize[0], blockSize[1]);
          ctx.fillStyle = textFontColor;
          ctx.font = textFont;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(blocks[i][j].text, colX[i] + blockSize[0] / 2, colYOffsets[i] + j * colYSpacings[i] + blockSize[1] / 2);
          ctx.save();

          if (i === 0) {
            // left anchors
            ctx.fillStyle = leftAnchorColor;
            ctx.translate(
              colX[i] + blockSize[0] + anchorSize[0] / 2,
              colYOffsets[i] + j * colYSpacings[i] + blockSize[1] / 2
            );
            ctx.rotate(Math.PI / 4);
            ctx.fillRect(-anchorSize[0] / 2, -anchorSize[1] / 2, anchorSize[0], anchorSize[1]);
            ctx.restore();
            ctx.save();
          } else {
            // right anchors
            ctx.fillStyle = rightAnchorColor;
            ctx.translate(colX[i] - anchorSize[0] / 2, colYOffsets[i] + j * colYSpacings[i] + blockSize[1] / 2);
            ctx.rotate(-Math.PI / 4);
            ctx.fillRect(-anchorSize[0] / 2, -anchorSize[1] / 2, anchorSize[0], anchorSize[1]);
            ctx.restore();
            ctx.save();
          }
        }
      }
    }

    function drawLine(startPos, endPos){
        var startAnchor = getAnchorAtPos(startPos);
        var endAnchor = getAnchorAtPos(endPos);
    
        var isStartABlock = getBlockAtPos(startPos);
        var isEndABlock = getBlockAtPos(endPos);
    
    
        if(isStartABlock){
            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.strokeStyle = "rgb(255, 0, 0)";
            ctx.lineWidth = 3;
            ctx.setLineDash(dashedLineStyle);
            ctx.stroke();
            ctx.setLineDash([]);
            return;
        }
    
        try{
            var isRightAnchor = startAnchor.block[0] == 0 && startAnchor.side == "right";
            var isLeftAnchor = startAnchor.block[0] == 1 && startAnchor.side == "left";
    
            if((isLeftAnchor || isRightAnchor)){
                ctx.beginPath();
                ctx.moveTo(startPos.x, startPos.y);
                ctx.lineTo(endPos.x, endPos.y);
                ctx.strokeStyle = "rgb(255, 0, 0)";
                ctx.lineWidth = 3;
                ctx.setLineDash([15, 15]);
                ctx.stroke();
                ctx.setLineDash([]);
            }
    
        }catch(e){
            return;
        }
    }
    function drawStraightLine(startPos, endPos){
        ctx.beginPath();
        ctx.moveTo(centres[startPos[0]][startPos[1]][0], centres[startPos[0]][startPos[1]][1]);
        ctx.lineTo(centres[endPos[0]][endPos[1]][0], centres[endPos[0]][endPos[1]][1]);
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.lineWidth = drawnLineThikness;
        ctx.stroke();
    
    }
    function getAnchorAtPos(pos){    
        for(var i = 0; i < blocks.length; i++){
            for(var j = 0; j < blocks[i].length; j++){
                
                if(pos.x > colX[i] - anchorSize[0] && pos.x < colX[i] && pos.y > colYOffsets[i] + j * colYSpacings[i] + blockSize[1]/2 - anchorSize[1]/2 && pos.y < colYOffsets[i] + j * colYSpacings[i] + blockSize[1]/2 + anchorSize[1]/2){
                    return {block: [i, j], side: "left"};
                }
                if(pos.x > colX[i] + blockSize[0] && pos.x < colX[i] + blockSize[0] + anchorSize[0] && pos.y > colYOffsets[i] + j * colYSpacings[i] + blockSize[1]/2 - anchorSize[1]/2 && pos.y < colYOffsets[i] + j * colYSpacings[i] + blockSize[1]/2 + anchorSize[1]/2){
                    return {block: [i, j], side: "right"};
                }
            }
        }
        return null;
    }
    function getBlockAtPos(pos){
        for(var i = 0; i < blocks.length; i++){
            for(var j = 0; j < blocks[i].length; j++){   
                if(pos.x > colX[i] && pos.x < colX[i] + blockSize[0] && pos.y > colYOffsets[i] + j * colYSpacings[i] && pos.y < colYOffsets[i] + j * colYSpacings[i] + blockSize[1]){
                    return [i, j];
                }
            }
        }
        return null;
    }

    function drawBackground() {
        ctx.fillStyle = "rgb(120, 120, 120)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
      drawBackground();
      drawBlocks();


      for(var i = 0; i < drawnedLines.length; i++){
        drawStraightLine(drawnedLines[i].start, drawnedLines[i].end);
      }
    }

    function isValidLine(startPos, endPos){
        var startAnchor = getAnchorAtPos(startPos);
        var endAnchor = getAnchorAtPos(endPos);
    
        var isStartABlock = getBlockAtPos(startPos);
        var isEndABlock = getBlockAtPos(endPos);
    
        if(isStartABlock && isEndABlock && isStartABlock[0] != isEndABlock[0]){
            return [true, isStartABlock, isEndABlock];
        }
    
        try{
            if(startAnchor != null){
                var isStartRightAnchor = startAnchor.block[0] == 0 && startAnchor.side == "right";
                var isStartLeftAnchor = startAnchor.block[0] == 1 && startAnchor.side == "left";
    
                if(isStartRightAnchor && isEndABlock){
                    return [true, startAnchor.block, isEndABlock];
                }
    
                if(isStartLeftAnchor && isEndABlock){
                    return [true, isEndABlock, startAnchor.block];
                }
            }
    
            if(endAnchor != null){
                var isEndLeftAnchor = endAnchor.block[0] == 1 && endAnchor.side == "left";
                var isEndRightAnchor = endAnchor.block[0] == 0 && endAnchor.side == "right";
    
                if(isEndLeftAnchor && isStartABlock){
                    return [true, isStartABlock, endAnchor.block];
                }
                if(isEndRightAnchor && isStartABlock){
                    return [true, endAnchor.block, isStartABlock];
                }
            }        
    
            if(endAnchor != null && startAnchor != null){
                return [(isStartRightAnchor && isEndLeftAnchor) || (isStartLeftAnchor && isEndRightAnchor), startAnchor.block, endAnchor.block];
            }
    
    
        }catch(e){
            return [false, null, null];
        }
        return [false, null, null];
        
    }



    canvas.addEventListener("mousedown", function(event){
        isDragging = true;
        startPos = {x: event.offsetX, y: event.offsetY};
    });

    canvas.addEventListener("mouseup", function(event){
        isDragging = false;
        endPos = {x: event.offsetX, y: event.offsetY};

        var Valid = isValidLine(startPos, endPos);
        if(Valid[0]){
            drawnedLines.push({start: Valid[1], end: Valid[2]});
        }
        
        draw();
    });

    canvas.addEventListener("mousemove", function(event){
        if(isDragging){
            endPos = {x: event.offsetX, y: event.offsetY};
            draw();
            drawLine(startPos, endPos);
        }
    });
  
      draw();
    }, []);
  
    return (
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: "1px solid black" }}
      />
    );
  };
  
  export default Game;
  