//Emulate old lcd display
const numbersDisplay = document.querySelector('#numbers-display');
const numDigits = 8; // Number of digits to display
const mode = document.querySelector("#mode");

function createLCD(digit) {
  const lcdDiv = document.createElement('div');
  lcdDiv.classList.add('lcd');
  lcdDiv.textContent = digit;
  lcdDiv.fontSize = lcdDiv.clientHeight + 'px';
  return lcdDiv;
}

// Populate the display
for (let i = 0; i < numDigits; i++) {
  const lcdDiv = createLCD('$');
  numbersDisplay.appendChild(lcdDiv);
}

//Build the keypad

const keypad = document.querySelector('#keypad');

function createKey(tag){
    const key = document.createElement('div');
    key.classList.add('key');
    key.innerHTML=tag;
    key.id = symbolMap[tag] || tag; //Parse unicode to a string
    if(/[0-9]/.test(key.id) || key.id === 'dot'){
        key.classList.add('num-key');
    }
    if(operatorsIds.includes(key.id)){
        key.classList.add('operator-key');
    }
    return key;
}

function createKeyRow(){
    const row = document.createElement('div');
    row.classList.add('key-row');
    return row;
}

const keyTags = [
    ["M\u002B","MR","MC","AC","\u232B"],      // M+, Backspace symbol 
    ["1","2","3","\u00B1","\u0025"],      // Plus-minus, Percent
    ["4","5","6","x\xB2","\u221A"],         // x squared, Square root
    ["7","8","9","\xD7","\xF7"],           // Multiplication, Division
    ["0","\u22C5","\u003D","\u002B","\u2212"] //Dot, Equals, Plus, Minus
];

const symbolMap = {
    "\u21E7": "shift", //For later use ins scientific calculator
    "\u2190": "left",
    "\u2192": "right",
    "M\u002B": "Mplus",
    "\u232B": "backspace",
    "\u00B1": "p-m",
    "\u0025": "percent",
    "x\xB2": "squared",
    "\u221A": "sqrt",
    "\xD7": "multiply",
    "\xF7": "divide",
    "\u22C5": "dot",
    "\u003D": "equals",
    "\u002B": "plus",
    "\u2212": "minus"
};

const operatorsIds = ["p-m","percent","squared","sqrt","multiply","divide","plus","minus"];

//Populate keypad
for(let i=0; i < 5; i++){
    const keyRow = createKeyRow();
    for(let j=0; j < 5; j++){
        const key = createKey(keyTags[i][j]);
        keyRow.appendChild(key);
    }
    keypad.appendChild(keyRow);
}

const memKeys = keypad.children[0].querySelectorAll(":nth-child(-n+4)")

//Responsive resizing of text
const LCDdigits = document.querySelectorAll(".lcd");

function resizeDigits(){
    LCDdigits.forEach( div =>{
        div.style.fontSize = div.clientHeight*0.9 + 'px';
    });
}

function resizeMode(){
    mode.style.fontSize = mode.clientHeight*0.9 + 'px';
}

function resizeKeyTags(){
    memKeys.forEach(key => {
        key.style.fontSize = key.clientHeight*0.35 + 'px';
    });
}

function resizeDisplayText(){
    resizeDigits();
    resizeMode();
    resizeKeyTags();
}

resizeDisplayText();
window.addEventListener('resize',resizeDisplayText);


//Display numbers

let display = {
    digits: "",
    temp: "",
    operation: undefined,
    memory: "",
    clear: false,
    position: 0
};

function addDigit(event){
    //Event triggered by a keypress or a click on keypad key
    event.key ? key = event.key : key = event.target.textContent;
    // console.log(key);
    //Only numbers and '.' trigger the event
    if((/[0-9]/.test(key)) && display.digits.length < numDigits){
        if(display.digits.length === 0 && key === '0'){
            display.digits += "";
        }else{
            if(display.clear){ //The clear property is true when an operation starts
                display.digits = key;
                display.clear = false;
            }else{
                display.digits += key;
            }
        }
    }if((/\./.test(key) || key === "\u22C5") && (display.digits.indexOf('.') === -1)){ //Only append one point
        if(display.digits.length < numDigits){
            if(display.clear){
                display.digits += '0.'
            }else{
                display.digits.length === 0 ? display.digits += '0.' : display.digits += '.';
            }
        }
    }
    showDigits();
}

document.addEventListener('keyup',addDigit);

const numKeys = document.querySelectorAll(".num-key");
numKeys.forEach(digit => digit.addEventListener('click',addDigit));

function deleteDigit(event){
    //Event triggered by a keypress or a click on keypad key
    event.key ? key = event.key : key = event.target.textContent;
    if(key === 'Backspace' || key === "\u232B"){
        display.digits = display.digits.slice(0, -1);
        if(display.digits.length > 8){
        }
    }
    if(key === 'AC'){
        display.digits = "";
        display.temp = "";
        display.operation = undefined;
        display.clear = false;
    }
    console.log(display);
    showDigits();
}

document.addEventListener('keyup',deleteDigit);
const deleteKey = document.querySelector('#backspace');
deleteKey.addEventListener('click',deleteDigit);
const ACKey = document.querySelector('#AC');
ACKey.addEventListener('click',deleteDigit);

function showDigits(){
    for(let i=1; i <= numDigits; i++){
        let digit = display.digits.charAt(display.digits.length-i-display.position);
        let LCDdigit = LCDdigits[numDigits-i];
        if(digit){
            LCDdigit.textContent = digit;
            LCDdigit.style.color = "rgb(51,255,51)"
        }else{
            LCDdigits[numDigits-i].textContent = '$';
            LCDdigit.style.color = "rgb(5,25,5)"
        }
    }
}

//Operations

function add(num1,num2){
    return num1+num2;
}

function subtract(num1,num2){
    return num1-num2;
}

function multiply(num1,num2){
    return num1*num2;
}

function divide(num1,num2){
    if(num2 === 0){
        return 'ERROR';
    }
    return num1/num2;
}

function square(num){
    return power(num,2);
}

function sqrt(num){
    if(num < 0){
        return "ERROR"
    }
    return Math.sqrt(num);
}

function equals(num1,num2,operation){
    return operation(num1,num2);
}

function plusMinus(num){
    return -num;
}

function percent(num1,num2=undefined){
    if(num2){
        return num1*num2/100;
    }else{
        return num1/100;
    }
}

const operations = {
    "x\xB2": square,
    "s": square,
    "\u221A": sqrt,
    "r": sqrt,
    "\u002B": add,
    "+": add,
    "\u2212": subtract,
    "-": subtract,
    "\xD7": multiply,
    "*": multiply,
    "\xF7": divide,
    "/": divide,
    "\u003D": equals,
    "=": equals,
    "\u00B1": plusMinus,
    "±": plusMinus,
    "\u0025": percent,
    "%": percent
}

const instantOperation = [square,sqrt,percent,plusMinus];


function operate(event){
    event.key ? key = event.key : key = event.target.textContent;
    let operation = operations[key];
    console.log("key: "+key+" operation: "+ operation);
    if(operation){
        if(display.operation){
            display.digits = `${display.operation(+display.temp,+display.digits)}`;
            if(operation === equals){
                display.operation = undefined;
                display.temp = "";
            }else{
                display.operation = operation;
                display.temp = display.digits;
            }
        }else{
            display.temp = display.digits;
            display.operation = operation;
        }
        display.clear = true;
    }
    console.log(display);
    showDigits();
}

// function equals(event){
//     event.key ? key = event.key : key = event.target.textContent;
//     if(key )
// }
document.addEventListener('keyup',operate);
const operators = document.querySelectorAll(".operator-key");
operators.forEach(key => key.addEventListener('click',operate));
equalsKey=document.querySelector('#equals');
equalsKey.addEventListener('click',operate);

//For later use in scientific calculator
function movePosition(event){
    event.key ? key = event.key : key = event.target.textContent;
    console.log(key);
    if(key === "ArrowLeft" || key === "\u2190"){
        console.log("here")
        display.position = Math.min(display.position+1, display.digits.length-numDigits);
    }if(key === "ArrowRight" || key === "\u2192"){
        display.position = Math.max(0,display.position - 1);
    }
    console.log("position: "+display.position);
    showDigits();
}