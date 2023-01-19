var blocks = [    
    [{text:"France"},
    {text:"Allemagne"},
    {text:"Russie"},
    {text:"Etats-Unis"}],

    [{text:"Democratie"},
    {text:"Monarchie"},
    {text:"Dictature"},
    {text:"République"}]
];

var canvas, ctx, isDragging = false, startPos, endPos;

var drawnedLines = [];

var CANVAS_WIDTH = 1600;
var CANVAS_HEIGHT = 1200;

var colX = [(CANVAS_WIDTH/800)*50, (CANVAS_WIDTH/800)*600];
var colYSpacing = (CANVAS_HEIGHT/600) *150;
var blockSize = [(CANVAS_WIDTH/800)*150, (CANVAS_HEIGHT/600) *50];
var anchorSize = [(CANVAS_WIDTH/800)*20, (CANVAS_HEIGHT/600) *20];

var centresGauche = [];

for(var i = 0; i < blocks[0].length; i++){
    centresGauche.push([colX[0] + blockSize[0] + anchorSize[0]/2, 50 + i * colYSpacing + blockSize[1]/2]);
}

var centresDroite = []
for(var i = 0; i < blocks[1].length; i++){
    centresDroite.push([colX[1] - anchorSize[0]/2, 50 + i * colYSpacing + blockSize[1]/2]);
}


var centres = [centresGauche, centresDroite];




function drawBlocks(ctx){

    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0, 0, 0)";

    for(var i = 0; i < blocks.length; i++){
        for(var j = 0; j < blocks[i].length; j++){
            var gradient = ctx.createLinearGradient(colX[i], 50 + j * colYSpacing, colX[i], (CANVAS_HEIGHT/600) *50 + j * colYSpacing + blockSize[1]);
            gradient.addColorStop(0, "rgb(61, 23, 102)");
            gradient.addColorStop(1, "rgb(111, 26, 182)");
            ctx.fillStyle = gradient;
            ctx.fillRect(colX[i], 50 + j * colYSpacing, blockSize[0], blockSize[1]);
            ctx.strokeRect(colX[i], 50 + j * colYSpacing, blockSize[0], blockSize[1]);
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(blocks[i][j].text, colX[i] + blockSize[0]/2,50 + j * colYSpacing + blockSize[1]/2);
            ctx.save();

            if(i==0){
                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.translate(colX[i] + blockSize[0] + anchorSize[0]/2, 50 + j * colYSpacing + blockSize[1]/2);
                ctx.rotate(Math.PI/4);
                ctx.fillRect(-anchorSize[0]/2, -anchorSize[1]/2, anchorSize[0], anchorSize[1]);
                ctx.restore();
                ctx.save();
            }else{
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.translate(colX[i] - anchorSize[0]/2, 50 + j * colYSpacing + blockSize[1]/2);
                ctx.rotate(-Math.PI/4);
                ctx.fillRect(-anchorSize[0]/2, -anchorSize[1]/2, anchorSize[0], anchorSize[1]);
                ctx.restore();
            }
        }
    }

    for(var i = 0; i < drawnedLines.length; i++){
        drawStraightLine(ctx, drawnedLines[i].start, drawnedLines[i].end);
    }
}
function drawLine(ctx, startPos, endPos){
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
        ctx.setLineDash([15, 15]);
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
function drawStraightLine(ctx, startPos, endPos){
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.beginPath();
    console.log("StartPos : " + startPos + centres[startPos[0]][startPos[1]]);
    console.log("EndPos : " + endPos + centres[endPos[0]][endPos[1]]);
    ctx.moveTo(centres[startPos[0]][startPos[1]][0], centres[startPos[0]][startPos[1]][1]);
    ctx.lineTo(centres[endPos[0]][endPos[1]][0], centres[endPos[0]][endPos[1]][1]);
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.lineWidth = 5;
    ctx.stroke();

}
function getAnchorAtPos(pos){
    var colX = [(CANVAS_WIDTH/800)*50, (CANVAS_WIDTH/800)*600];
    var colYSpacing = (CANVAS_HEIGHT/600) *150;
    var blockSize = [(CANVAS_WIDTH/800)*150, (CANVAS_HEIGHT/600) *50];
    var anchorSize = [(CANVAS_WIDTH/800)*20, (CANVAS_HEIGHT/600) *20];

    for(var i = 0; i < blocks.length; i++){
        for(var j = 0; j < blocks[i].length; j++){
            
            if(pos.x > colX[i] - anchorSize[0] && pos.x < colX[i] && pos.y > 50 + j * colYSpacing + blockSize[1]/2 - anchorSize[1]/2 && pos.y < 50 + j * colYSpacing + blockSize[1]/2 + anchorSize[1]/2){
                return {block: [i, j], side: "left"};
            }
            if(pos.x > colX[i] + blockSize[0] && pos.x < colX[i] + blockSize[0] + anchorSize[0] && pos.y > 50 + j * colYSpacing + blockSize[1]/2 - anchorSize[1]/2 && pos.y < 50 + j * colYSpacing + blockSize[1]/2 + anchorSize[1]/2){
                return {block: [i, j], side: "right"};
            }
        }
    }
    return null;
}
function getBlockAtPos(pos){

    for(var i = 0; i < blocks.length; i++){
        for(var j = 0; j < blocks[i].length; j++){   
            if(pos.x > colX[i] && pos.x < colX[i] + blockSize[0] && pos.y > 50 + j * colYSpacing && pos.y < 50 + j * colYSpacing + blockSize[1]){
                return [i, j];
            }
        }
    }
    return null;
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
        console.log(e);
        return [false, null, null];
    }
    
}
function startGame() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(120, 120, 120)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBlocks(ctx);

    canvas.addEventListener("mousedown", function(event){
        isDragging = true;
        startPos = {x: event.offsetX, y: event.offsetY};

        for(var i = 0; i < drawnedLines.length; i++){
            drawStraightLine(ctx, drawnedLines[i].start, drawnedLines[i].end);
        }
    });

    canvas.addEventListener("mouseup", function(event){
        isDragging = false;
        endPos = {x: event.offsetX, y: event.offsetY};
        ctx.fillStyle = "rgb(120, 120, 120)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawBlocks(ctx);

        var Valid = isValidLine(startPos, endPos);
        
        if(Valid[0]){
            drawnedLines.push({start: Valid[1], end: Valid[2]});
        }

        for(var i = 0; i < drawnedLines.length; i++){
            drawStraightLine(ctx, drawnedLines[i].start, drawnedLines[i].end);
        }
    });

    canvas.addEventListener("mousemove", function(event){
        if(isDragging){
            endPos = {x: event.offsetX, y: event.offsetY};
            ctx.fillStyle = "rgb(120, 120, 120)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawBlocks(ctx);
            drawLine(ctx, startPos, endPos);
        }
    });
}
startGame();