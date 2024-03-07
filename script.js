//Emulate old lcd display
const numbersDisplay = document.querySelector('#numbers-display');
const numDigits = 8; // Number of digits to display

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
  lcdDiv.style.color = "rgb(5,25,5)"
}

//Responsive resizing of lcd text
const LCDdigits = document.querySelectorAll(".lcd");

function resizeDigits(){
    LCDdigits.forEach( div =>{
        div.style.fontSize = div.clientHeight*0.9 + 'px';
    });
}

const mode = document.querySelector("#mode");

function resizeMode(){
    mode.style.fontSize = mode.clientHeight*0.9 + 'px';
}

function resizeDisplayText(){
    resizeDigits();
    resizeMode();
}

resizeDisplayText();
window.addEventListener('resize',resizeDisplayText);

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
    return key;
}

function createKeyRow(){
    const row = document.createElement('div');
    row.classList.add('key-row');
    return row;
}

const keyTags = [
    ["\u2190","\u2192","M","AC","\u232B"],      // Left triangle, Right triangle, Backspace symbol 
    ["1","2","3","\u00B1","\u0025"],      // Plus-minus, Percent
    ["4","5","6","x\xB2","\u221A"],         // x squared, Square root
    ["7","8","9","\xD7","\xF7"],           // Multiplication, Division
    ["0","\u22C5","\u003D","\u002B","\u2212"] //Dot, Equals, Plus, Minus
];

const symbolMap = {
    // "\u21E7": "shift",
    "\u2190": "left",
    "\u2192": "right",
    "\u232B": "backspace",
    "\u00B1": "p-m",
    "\u0025": "percent",
    "\xB2": "squared",
    "\xF7": "sqrt",
    "\u22C5": "dot",
    "\u003D": "equals",
    "\u002B": "plus",
    "\u2212": "minus"
};

//Populate keypad
for(let i=0; i < 5; i++){
    const keyRow = createKeyRow();
    for(let j=0; j < 5; j++){
        const key = createKey(keyTags[i][j]);
        keyRow.appendChild(key);
    }
    keypad.appendChild(keyRow);
}


//Display numbers

let display = {
    digits:"",
    position: 0
};

function addDigit(event){
    //Event triggered by a keypress or a click on keypad key
    event.key ? key = event.key : key = event.target.textContent;
    console.log(key);
    //Only numbers and '.' trigger the event
    if((/[0-9]/.test(key))){
        display.digits += key;
    }if((/\./.test(key) || key === "\u22C5") && (display.digits.indexOf('.') === -1)){ //Only append one point
        display.digits += '.'
    }
    console.log(display)
    modifyDisplay();
}

document.addEventListener('keyup',addDigit);

const numKeys = document.querySelectorAll(".num-key");
numKeys.forEach(digit => digit.addEventListener('click',addDigit));

function deleteDigit(event){
    //Event triggered by a keypress or a click on keypad key
    event.key ? key = event.key : key = event.target.textContent;
    if(key === 'Backspace' || key === "\u232B"){
        display.digits = display.digits.slice(0, -1);
    }
    console.log(display);
    modifyDisplay();
}

document.addEventListener('keyup',deleteDigit);
const deleteKey = document.querySelector('#backspace');
deleteKey.addEventListener('click',deleteDigit);

function modifyDisplay(){
    showDigits();
}

function showDigits(){
    for(let i=1; i <= numDigits; i++){
        let digit = display.digits.charAt(display.digits.length-i-display.position);
        console.log(digit);
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