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


digits[0].textContent='.';