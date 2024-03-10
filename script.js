//Emulate old lcd display
const numbersDisplay = document.querySelector('#numbers-display');
const numDigits = 8; // Number of digits to display
const maxDisplayDigits = "9".repeat(numDigits); //Maximum number to store in memory.
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
    current: "",
    temp: "",
    binaryOperation: undefined,
    unaryOperation: equals,
    memory: "",
    clear: false,
    position: 0
};

function addDigit(event){
    //Event triggered by a keypress or a click on keypad key
    event.key ? key = event.key : key = event.target.textContent;
    //Only numbers and '.' trigger the event
    if(/[0-9]/.test(key)){//It's a number key
        if((display.current.length === 0) && key=='0'){
            if(!display.binaryOperation){
                display.current += "";
            }else{
                display.current += key;
                display.digits = display.current;
            }
            
            //If no current input do not erase display, this allows the user to input 0.
            //whenever they try to input a float with integer part 0
        }else{
            display.current += key;
            display.digits = display.current;
        }
    }if((/\./.test(key) || key === "\u22C5") && (display.current.indexOf('.') === -1)){ //Only append one point
        display.current.length === 0 ? display.current += '0.' : display.current += '.';
        display.digits=display.current;
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
        resetDisplay();
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
    let integerPart = display.digits.slice(0,display.digits.indexOf('.'));
    if(display.digits.length > numDigits){//Check for long expressions
        if(+display.digits < maxDisplayDigits){
            //Round and truncate to 8 digits
            display.digits=(+display.digits).toFixed(numDigits-integerPart.length-1);
            //Remove trailing 0's after the decimal point
            while(display.digits.charAt(display.digits.length-1)==='0'){
                display.digits = display.digits.slice(0, -1);
            }
            //Remove trailing dot for integers
            if(display.digits.charAt(display.digits.length-1)==='.'){
                display.digits = display.digits.slice(0, -1);
            }
        }else{
            display.digits = 'ERROR';
            resetDisplay();
        }
    } 
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

function resetDisplay(){
    display.current= "";
    display.temp= "";
    display.binaryOperation= undefined;
    display.unaryOperation= equals;
}

//Operations
//Binary
function add(num1,num2){
    if(isNaN(num1) || isNaN(num2)){
        resetDisplay();
        return "ERROR"
    }
    return num1+num2;
}

function subtract(num1,num2){
    if(isNaN(num1) || isNaN(num2)){
        resetDisplay();
        return "ERROR"
    }
    return num1-num2;
}

function multiply(num1,num2){
    if(isNaN(num1) || isNaN(num2)){
        resetDisplay();
        return "ERROR"
    }
    return num1*num2;
}

function divide(num1,num2){
    if(num2 === 0 || (isNaN(num1) || isNaN(num2))){
        resetDisplay();
        return 'ERROR';
    }
    return num1/num2;
}
//Unary
//Postfixing
function square(num){
    if(isNaN(num)){
        resetDisplay();
        return "ERROR"
    }
    return num**2;
}

function percent(num){
    if(isNaN(num)){
        resetDisplay();
        return "ERROR"
    }
    return num/100;
}

//Prefixing
function sqrt(num){
    if(isNaN(num) || num < 0){
        resetDisplay();
        return "ERROR"
    }
    return Math.sqrt(num);
}

function plusMinus(num){
    if(isNaN(num)){
        resetDisplay();
        return "ERROR"
    }
    return -num;
}

//Equals
function equals(num){
    if(isNaN(num)){
        resetDisplay();
        return "ERROR"
    }
    return num;
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

const unaryOperations = [square,sqrt,percent,plusMinus];
const binaryOperations = [add,subtract,multiply,divide];
const prefixingOperations = [sqrt,plusMinus];
const postfixingOperations = [square,percent];

function operate(event){
    event.key ? key = event.key : key = event.target.textContent;
    let operation = operations[key];
    console.log("key: "+key+" operation: "+ operation);
    //Check typeOf operation
    //B: binary
    //U: unary, post or prefixing
    //P: postfixing
    //p: prefixing
    //E: equals
    //T: temp
    //C: current
    //D: display

    if(unaryOperations.includes(operation)){
        //C+U evaluates to U(C) -> D
        if(!display.binaryOperation){//If no binary operator, check for input and evaluate
            //Evaluate if there is an input
            if(display.digits.length > 0){
                // p+C+U -> U(p(C)) -> D
                display.digits = `${operation(display.unaryOperation(+display.digits))}`;//current could be empty
                resetDisplay();
            }else{//p+C otherwise if p is prefixing, then store p an look for the next input
                if(display.unaryOperation === equals){
                    if(prefixingOperations.includes(operation)){
                        display.unaryOperation = operation;   
                    }//Do nothing if the operation is postfixing
                }else{
                    display.digits = 'ERROR';
                    resetDisplay();
                }
            }
            // else{
            //     display.digits = `${operation(+display.digits)}`;
            //     resetDisplay();
            // }
        }else{//If there is a binary operation
            if(postfixingOperations.includes(operation)){
                //T+B+C+P evaluates to T+B+P(C) -> T+B+D
                if(display.current.length > 0 && display.digits !== '0'){
                    display.digits = `${operation(+display.current)}`;
                    display.current = '';
                }else{//T+B+P returns an error
                    display.digits = 'ERROR';
                    resetDisplay();
                }
            }
            if(prefixingOperations.includes(operation)){
                //T+B+C+p returns an error
                if(display.current.length > 0){
                    display.digits = 'ERROR';
                    resetDisplay();
                }else{
                    //T+B+p looks for the next input
                    if(display.unaryOperation === equals){
                        display.unaryOperation = operation;
                    }else{  //T+B+p+p returns an error
                        display.digits = 'ERROR';
                        resetDisplay();
                    }
                }
            }
        }
    }
    if(binaryOperations.includes(operation)){//If it is a binary operation
        //C+B -> T+B and looks for the next input
        //D+B -> T+B
        //p+C+B -> p(C)+B -> T+B
        if(!display.binaryOperation){
            //In this case digits = current, or current is empty.
            //If there is a prefixing unary calculate and display
            display.temp = `${display.unaryOperation(+display.digits)}`;
            display.digits = display.temp;
            display.current = '';
            display.binaryOperation = operation;
        }else{
            //T+B1+C+B2 -> B1(T,C)+B2 -> T+B
            //T+B1+p+C+B2 -> B1(T,p(C))+B2 -> T+B
            if(display.current.length > 0){
                display.temp = `${display.binaryOperation(+display.temp,display.unaryOperation(+display.current))}`;
                display.binaryOperation = operation;
                display.digits = display.temp;
                display.current = '';
            }else{
                //T+B1+B2 -> B1(T,D)+B2 -> T+B
                if(display.unaryOperation===equals){
                    display.temp = `${display.binaryOperation(+display.temp,+display.digits)}`;
                    display.digits = display.temp;
                    display.binaryOperation = operation;
                }else{
                    //T+B1+p+B2 returns error
                    display.digits="ERROR";
                    resetDisplay();
                }
            }
        }
    }
    if(operation === equals){
        //C+= -> D
        //D+= -> D
        //p+C+= -> p(C) -> D
        if(!display.binaryOperation){//If there is no binary operation
            //Show the displayed digits and clear the display at next input
            display.digits=`${operation(display.unaryOperation(+display.digits))}`
            resetDisplay();
        }else{//if there is a binary operation calculate result
            //T+B+C+= -> B(T,C) -> D
            //T+B+p+C+= -> B(T,p(C)) -> D
            if(display.current.length > 0){
                display.digits = `${operation(display.binaryOperation(+display.temp,display.unaryOperation(+display.current)))}`;
            }else{
                //T+B+D+= -> B(T,D) -> D
                //T+B+p+= , T=D -> B(T,p(D)) -> D
                if(display.digits.length > 0){
                    display.digits = `${operation(display.binaryOperation(+display.temp,display.unaryOperation(+display.digits)))}`
                }
                //T+B+= -> T -> D
                //T+B+p+= -> p(T) -> D
                display.digits=`${operation(display.unaryOperation(+display.digits))}`;
            }
        }
        resetDisplay();
    }
    console.log(display);
    showDigits();
}

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