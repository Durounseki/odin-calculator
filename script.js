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

function createKey(){
    const key = document.createElement('div');
    key.classList.add('key');
    return key;
}
function createKeyRow(){
    const row = document.createElement('div');
    row.classList.add('key-row');
    return row;
}

//Populate keypad
for(let i=0; i < 5; i++){
    const keyRow = createKeyRow();
    for(let j=0; j < 5; j++){
        const key = createKey();
        keyRow.appendChild(key);
    }
    keypad.appendChild(keyRow);
}