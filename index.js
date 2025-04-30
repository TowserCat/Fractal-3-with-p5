










let times = 1;
let layers = 30;
let quality = 20;
let boxScale = 1;
let shiftScale = 1;
let constantTimes = times;
let constantLayers = layers;
let constantQuality = quality;
let numOfBoxesInEachString = [];
let P = 0;
let Q = 0;
let Q2 = 0;
let listOfStringsXA = [];
let listOfStringsYA = [];
let listOfStringsZA = [];
let listOfStringsXB = [];
let listOfStringsYB = [];
let listOfStringsZB = [];
let listOfStringsXC = 0;
let listOfStringsYC = 0;
let listOfStringsZC = 0;
let listOfColors = [];
let listOfColorsB = [];
let static = false;
let setColorWanted = false;
let setColor;
let spawningZone = 2800;
let wichWall = 0;
let fullPaused = false;
let O = 0;
let shapeList = [];
let saveSpeed = 100;
let constantSaveSpeed = 1200000;

let canvas;
let intervalId = null;

let deltaX = spawningZone * 2;
let deltaZ = spawningZone / 2 * 2;
let deltaY = -spawningZone / 3 * 2;
let moveSpeed = quality * 2;
let wallPaper;
let yaw = 0.5;
let pitch = -0.3;
let sensitivity = 0.002;

let paused = true;
let started = false;

function preload() {
    wallPaper = loadImage(`wallpaper.jpg`);
}

function setup() {
    alert("CAREFULL!!! YOU CAN KILL YOUR GPU SO QUICKLY THIS WAY!!!!! DO NOT UNDER ANY CIRCUMSTANCE LEAVE THIS ON AND AFK!!")
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    noCursor();
    fill(255,255,255);
    strokeWeight(0.5);
    for (let i = 0; i < 12345; i++) {
        listOfColorsB[i] = colorMixRand();
    }
    listOfColors = listOfColorsB;
    beginGeometry();
    box(quality * 3,quality,quality);
    box(quality,quality * 3,quality);
    box(quality,quality,quality * 3);
    let shape = endGeometry();
    shapeList.push(shape);
    setColor = colorMixRand();
}

function draw() {
    clear(ArrayBuffer);
    clear();
    background(0);

    ambientLight(255,255,255);

    let cosYaw = cos(yaw);
    let sinYaw = sin(yaw);
    let cosPitch = cos(pitch);
    let sinPitch = sin(pitch);

    let camLookX = deltaX - cosYaw * cosPitch;
    let camLookY = deltaY - sinPitch;
    let camLookZ = deltaZ - sinYaw * cosPitch;

    camera(
        deltaX, deltaY, deltaZ,
        camLookX, camLookY, camLookZ,
        0, 1, 0,
        0, 1000000
    );



    for (let i = 0; i < shapeList.length; i++) {
        model(shapeList[i]);
    }

    for (let i = 0; i < listOfStringsXB.length; i++) {
        push();
        if (setColorWanted === true){
            fill(setColor);
        }else{
            if(static === false){
                fill(listOfColors[i % layers + Q]);
            }else{
                fill(listOfColorsB[i%10000]);
            }
        }
        translate(listOfStringsXB[i], listOfStringsYB[i], listOfStringsZB[i]);
        box(quality * boxScale, quality * boxScale, quality * boxScale);
        pop();
        Q2 += 1
        if (Q2 === numOfBoxesInEachString[P]){
            Q2 = 0;
            Q += 1;
        }
    }
    Q = 0
    movement();
}

let isMoving = {
    d: false,
    a: false,
    w: false,
    s: false,
    space: false,
    capsLock: false
};

let isKeyPressed = {
    z: false,
    x: false,
    c: false,
    v: false,
    b: false,
    n: false
};

function keyPressed() {
    if (key === "d" || key === "D") {
        isMoving.d = true;
    }
    if (key === "a" || key === "A") {
        isMoving.a = true;
    }
    if (key === "w" || key === "W") {
        isMoving.w = true;
    }
    if (key === "s" || key === "S") {
        isMoving.s = true;
    }
    if (key === " ") {
        isMoving.space = true;
    }
    if (key === "CapsLock") {
        isMoving.capsLock = true;
    }
    if (key === "`"){
        semiPause();
    }
    if (key === "e" || key === "E"){
        fullPause();
    }
    if (key === "p" || key === "P"){
        semiPause();
        saveAsObj(shape);
    }

    if (["z", "x", "c", "v", "b", "n"].includes(key.toLowerCase()) && !isKeyPressed[key.toLowerCase()]) {
        isKeyPressed[key.toLowerCase()] = true;
        executeFunctionForKey(key.toLowerCase());
    }
}

function semiPause(){
    beginGeometry();

    for (let i = 0; i < listOfStringsXB.length; i++) {
        push();
        if (setColorWanted === true){
            fill(setColor);
        }else{
            if(static === false){
                fill(listOfColors[i % layers + Q]);
            }else{
                fill(listOfColorsB[i%10000]);
            }
        }
        translate(listOfStringsXB[i], listOfStringsYB[i], listOfStringsZB[i]);
        box(quality * boxScale, quality * boxScale, quality * boxScale);
        pop();
        Q2 += 1
        if (Q2 === numOfBoxesInEachString[P]){
            Q2 = 0;
            Q += 1;
        }
    }
    Q = 0

    let shape = endGeometry();
    shapeList.push(shape);

    listOfStringsXB = [];
    listOfStringsYB = [];
    listOfStringsZB = [];

    let occupier = saveSpeed;
    saveSpeed = constantSaveSpeed;
    constantSaveSpeed = occupier;
}

function fullPause(){
    if (fullPaused === true){
        fullPaused = false;
        unpause();
    }else{
        fullPaused = true;
        pause();
    }
}

function pause(){
    times = 0;
}

function unpause(){
    times = constantTimes;
}

function keyReleased() {
    if (key === "d" || key === "D") {
        isMoving.d = false;
    }
    if (key === "a" || key === "A") {
        isMoving.a = false;
    }
    if (key === "w" || key === "W") {
        isMoving.w = false;
    }
    if (key === "s" || key === "S") {
        isMoving.s = false;
    }
    if (key === " ") {
        isMoving.space = false;
    }
    if (key === "CapsLock") {
        isMoving.capsLock = false;
    }

    if (["z", "x", "c", "v", "b", "n"].includes(key.toLowerCase())) {
        isKeyPressed[key.toLowerCase()] = false;
    }
}

function movement() {
    let cosYaw = cos(yaw);
    let sinYaw = sin(yaw);

    if (isMoving.d) {
        deltaX += moveSpeed * sinYaw;
        deltaZ -= moveSpeed * cosYaw;
    }
    if (isMoving.a) {
        deltaX -= moveSpeed * sinYaw;
        deltaZ += moveSpeed * cosYaw;
    }
    if (isMoving.w) {
        deltaX -= moveSpeed * cosYaw;
        deltaZ -= moveSpeed * sinYaw;
    }
    if (isMoving.s) {
        deltaX += moveSpeed * cosYaw;
        deltaZ += moveSpeed * sinYaw;
    }
    if (isMoving.space) {
        deltaY -= moveSpeed;
    }
    if (isMoving.capsLock) {
        deltaY += moveSpeed;
    }
}

function executeFunctionForKey(key) {
    switch (key) {
        case "z":
            run();
            console.log("run");
            break;
        case "x":
            runStatic();
            console.log("runStatic");
            break;
        case "c":
            runCenter();
            console.log("runCenter");
            break;
        case "v":
            runCenterStatic();
            console.log("runCenterStatic");
            break;
        case "b":
            runOutside();
            console.log("runOutside");
            break;
        case "n":
            runOutsideStatic();
            console.log("runOutsideStatic");
            break;
        default:
            console.log(`${key} key pressed!`);
    }
}

document.addEventListener("mousemove", (event) => {
    if (document.hasFocus() && document.pointerLockElement !== document.body) {
        document.body.requestPointerLock();
    }
    
    yaw += event.movementX * sensitivity;
    pitch -= event.movementY * sensitivity;
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function colorMixRand(){
    let thisRandColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return thisRandColor;
}

function run(){
    setInterval(semiPause, saveSpeed);
    for(let i = 0; i < layers; i++){
        listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
    }
    for(let i = 0; i < layers; i++){
        listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
    }
    for(let i = 0; i < layers; i++){
        listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
    }
    for(let i = 0; i < layers; i++){
        listOfColors[i] = colorMixRand();
    }
    if(!intervalId){
        intervalId = setInterval(addStringRun,1);
    }
}

function addStringRun(){
    for(let j = 0; j < times; j++){
        for(let i = 0; i < layers; i++){
            listOfStringsXA[i] = listOfStringsXA[i] + getRandomInt(-1,1) * quality * shiftScale;
            listOfStringsYA[i] = listOfStringsYA[i] + getRandomInt(-1,1) * quality * shiftScale;
            listOfStringsZA[i] = listOfStringsZA[i] + getRandomInt(-1,1) * quality * shiftScale;
            if(listOfStringsXA[i] < -spawningZone||listOfStringsXA[i] > spawningZone){
                listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfColors[i] = colorMixRand();
                P += 1;
                listOfColors.push(colorMixRand());
            }
            if(listOfStringsYA[i] < -spawningZone||listOfStringsYA[i] > spawningZone){
                listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfColors[i] = colorMixRand();
                P += 1;
                listOfColors.push(colorMixRand());
            }
            if(listOfStringsZA[i] < -spawningZone||listOfStringsZA[i] > spawningZone){
                listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfColors[i] = colorMixRand();
                P += 1;
                listOfColors.push(colorMixRand());
            }
            if(!listOfColors[i]){
                listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                listOfColors[i] = colorMixRand();
                P += 1;
                listOfColors.push(colorMixRand());
            }
            listOfStringsXB.push(listOfStringsXA[i]);
            listOfStringsYB.push(listOfStringsYA[i]);
            listOfStringsZB.push(listOfStringsZA[i]);
        }
        listOfColorsB.push(colorMixRand());
    }
}

function runStatic(){
    static = true;
    run();
}

function runCenter(){
    setInterval(semiPause, saveSpeed);
    for(let i = 0; i < layers; i++){
        listOfStringsXA[i] = 0;
    }
    for(let i = 0; i < layers; i++){
        listOfStringsYA[i] = 0;
    }
    for(let i = 0; i < layers; i++){
        listOfStringsZA[i] = 0;
    }
    for(let i = 0; i < layers; i++){
        listOfColors[i] = colorMixRand();
    }
    if(!intervalId){
        intervalId = setInterval(addStringRunCenter,1);
    }
}

function addStringRunCenter(){
    for(let j = 0; j < times; j++){
        for(let i = 0; i < layers; i++){
            listOfStringsXA[i] = listOfStringsXA[i] + getRandomInt(-1,1) * quality * shiftScale;
            listOfStringsYA[i] = listOfStringsYA[i] + getRandomInt(-1,1) * quality * shiftScale;
            listOfStringsZA[i] = listOfStringsZA[i] + getRandomInt(-1,1) * quality * shiftScale;
            if(listOfStringsXA[i] < -spawningZone||listOfStringsXA[i] > spawningZone){
                listOfStringsXA[i] = 0;
                listOfStringsYA[i] = 0;
                listOfStringsZA[i] = 0;
                listOfColors[i] = colorMixRand();
                P += 1;
                listOfColors.push(colorMixRand());
            }
            if(listOfStringsYA[i] < -spawningZone||listOfStringsYA[i] > spawningZone){
                listOfStringsXA[i] = 0;
                listOfStringsYA[i] = 0;
                listOfStringsZA[i] = 0;
                listOfColors[i] = colorMixRand();
                P += 1;
                listOfColors.push(colorMixRand());
            }
            if(listOfStringsZA[i] < -spawningZone||listOfStringsZA[i] > spawningZone){
                listOfStringsXA[i] = 0;
                listOfStringsYA[i] = 0;
                listOfStringsZA[i] = 0;
                listOfColors[i] = colorMixRand();
                P += 1;
                listOfColors.push(colorMixRand());
            }
            if(!listOfColors[i]){
                listOfStringsXA[i] = 0;
                listOfStringsYA[i] = 0;
                listOfStringsZA[i] = 0;
                listOfColors[i] = colorMixRand();
                P += 1;
                listOfColors.push(colorMixRand());
            }
            listOfStringsXB.push(listOfStringsXA[i]);
            listOfStringsYB.push(listOfStringsYA[i]);
            listOfStringsZB.push(listOfStringsZA[i]);
        }
        listOfColorsB.push(colorMixRand());
    }
}

function runCenterStatic(){
    static = true;
    runCenter();
}

function runOutside(){
    setInterval(semiPause, saveSpeed);
    for(let i = 0; i < layers; i++){
        wichWall = getRandomInt(1,6);
        if (wichWall === 1){
            listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
            listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
            listOfStringsZA[i] = -spawningZone;
        }else if(wichWall === 2){
            listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
            listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
            listOfStringsZA[i] = spawningZone;
        }else if(wichWall === 3){
            listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
            listOfStringsYA[i] = -spawningZone;
            listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
        }else if(wichWall === 4){
            listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
            listOfStringsYA[i] = spawningZone;
            listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
        }else if(wichWall === 5){
            listOfStringsXA[i] = -spawningZone;
            listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
            listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
        }else if(wichWall === 6){
            listOfStringsXA[i] = spawningZone;
            listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
            listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
        }
    }
    for(let i = 0; i < layers; i++){
        listOfColors[i] = colorMixRand();
    }
    if(!intervalId){
        intervalId = setInterval(addStringRunOutside,1);
    }
}

function addStringRunOutside(){
    for(let j = 0; j < times; j++){
        for(let i = 0; i < layers; i++){
            wichWall = getRandomInt(1,6);
            listOfStringsXA[i] = listOfStringsXA[i] + getRandomInt(-1,1) * quality * shiftScale;
            listOfStringsYA[i] = listOfStringsYA[i] + getRandomInt(-1,1) * quality * shiftScale;
            listOfStringsZA[i] = listOfStringsZA[i] + getRandomInt(-1,1) * quality * shiftScale;
            if(listOfStringsXA[i] < -spawningZone||listOfStringsXA[i] > spawningZone){
                wichWall = getRandomInt(1,6);
                if (wichWall === 1){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = -spawningZone;
                }else if(wichWall === 2){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = spawningZone;
                }else if(wichWall === 3){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = -spawningZone;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 4){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = spawningZone;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 5){
                    listOfStringsXA[i] = -spawningZone;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 6){
                    listOfStringsXA[i] = spawningZone;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }
                listOfColors[i] = colorMixRand();
                P += 1;
            }
            if(listOfStringsYA[i] < -spawningZone||listOfStringsYA[i] > spawningZone){
                wichWall = getRandomInt(1,6);
                if (wichWall === 1){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = -spawningZone;
                }else if(wichWall === 2){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = spawningZone;
                }else if(wichWall === 3){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = -spawningZone;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 4){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = spawningZone;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 5){
                    listOfStringsXA[i] = -spawningZone;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 6){
                    listOfStringsXA[i] = spawningZone;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }
                listOfColors[i] = colorMixRand();
                P += 1;
            }
            if(listOfStringsZA[i] < -spawningZone||listOfStringsZA[i] > spawningZone){
                wichWall = getRandomInt(1,6);
                if (wichWall === 1){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = -spawningZone;
                }else if(wichWall === 2){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = spawningZone;
                }else if(wichWall === 3){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = -spawningZone;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 4){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = spawningZone;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 5){
                    listOfStringsXA[i] = -spawningZone;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 6){
                    listOfStringsXA[i] = spawningZone;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }
                listOfColors[i] = colorMixRand();
                P += 1;
            }
            if(!listOfColors[i]){
                wichWall = getRandomInt(1,6);
                if (wichWall === 1){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = -spawningZone;
                }else if(wichWall === 2){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = spawningZone;
                }else if(wichWall === 3){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = -spawningZone;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 4){
                    listOfStringsXA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsYA[i] = spawningZone;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 5){
                    listOfStringsXA[i] = -spawningZone;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }else if(wichWall === 6){
                    listOfStringsXA[i] = spawningZone;
                    listOfStringsYA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                    listOfStringsZA[i] = (getRandomInt(-spawningZone/quality/shiftScale,spawningZone/quality/shiftScale)) * quality * shiftScale;
                }
                P += 1;
                listOfColors.push(colorMixRand());
            }
            listOfStringsXB.push(listOfStringsXA[i]);
            listOfStringsYB.push(listOfStringsYA[i]);
            listOfStringsZB.push(listOfStringsZA[i]);
            numOfBoxesInEachString[P + i] += 1;
        }
        listOfColorsB.push(colorMixRand());
    }
}

function runOutsideStatic(){
    static = true;
    runOutside();
}

function saveAsObj(geometry) {
    semiPause();
    let objData = "";
    
    for (let v of geometry.vertices) {
        objData += `v ${v.x} ${v.y} ${v.z}\n`;
    }
    
    for (let f of geometry.faces) {
        objData += `f ${f[0] + 1} ${f[1] + 1} ${f[2] + 1}\n`; // OBJ indexing starts at 1
    }
    
    let blob = new Blob([objData], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "randomWalkCreation.obj";
    a.click();
}







