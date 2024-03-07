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
  const lcdDiv = createLCD(i);
  numbersDisplay.appendChild(lcdDiv);
}

const digits = document.querySelectorAll(".lcd");

function resizeDigits(){
    digits.forEach( div =>{
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
// digits[0].textContent='.';
const keypad = document.querySelector('#keypad');

function createKey(tag){
    const key = document.createElement('div');
    key.classList.add('key');
    key.innerHTML=tag;
    return key;
}
function createKeyRow(){
    const row = document.createElement('div');
    row.classList.add('key-row');
    return row;
}

const keyTags = [
    ["\u21E7","M","AC","C","\u232B"],      // Shift symbol, Backspace symbol 
    ["1","2","3","\u00B1","\u0025"],      // Plus-minus, Percent
    ["4","5","6","\xB2","\u221A"],         // x squared, Square root
    ["7","8","9","\xD7","\xF7"],           // Multiplication, Division
    ["0","\u22C5","\u003D","\u002B","\u2212"] //Dot, Equals, Plus, Minus
];

//Populate keypad
for(let i=0; i < 5; i++){
    const keyRow = createKeyRow();
    for(let j=0; j < 5; j++){
        const key = createKey(keyTags[i][j]);
        keyRow.appendChild(key);
    }
    keypad.appendChild(keyRow);
}