
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equal = document.getElementById('equals');
const clear = document.getElementById('clear');

let result = document.getElementById('result');
let calc = null;
var value = "";

let baseColor = getComputedStyle(document.querySelector('.numbers'));

let operating = false;
let operands = [];
let operator;

// Navigate through the numbers' td each click to get the clicked element.
numbers.forEach(current =>{
    current.addEventListener('click', function (){
        value += current.textContent;
        addToResult(current.textContent, result);
        changeColor(current, 'yellow');
        console.log(operands);
        delayTask(1000, function (){
            changeColor(current, baseColor)
        });
    })
})

operators.forEach(current => {
    current.addEventListener('click', function(){
        var resultContent = result.textContent;
        if(resultContent !== ''){
            operands.push(value);
            addToResult(current.textContent, result);
            operator = current.textContent;
            console.log(operands);
            operating = true;
            current.setAttribute('style', 'font-size : 55px; opacity : 0.8;');
            value = "";

        }

    });
})

clear.addEventListener('click', function () {
    clearContent(result);
    operands = [];
    value = "";
    operator = undefined;
    operating = false;
    calc = null;
})

equal.addEventListener('click', function() {
    operands.push(value);
    clearContent(result);
    calc = calculate(operator);
    operating = false;
    operands = [];
    operands.push(calc);
    addToResult(calc, result);


})

function toOperation(str, n1, n2){
    switch(str){
        case 'X': return n1 * n2;
        case '÷': return n1 / n2;
        case '-': return n1 - n2;
        case '+': return n1 + n2;
        case '%': return n1 % n2;
        default : return '';
    }
}


function calculate(operator){
    let left = tryParseNumber(operands[0], 10);
    let right = tryParseNumber(operands[1], 10);
    return toOperation(operator, left, right);
}

// Delay task using setTimeout() function
const delayTask = async (delay, task) => {
    for (let i = 1; i <= 5; i++) {
        setTimeout(() => task(), delay);
    }
  }

// Changing the color of a specific element
function changeColor(element, color){
    element.setAttribute('style', 'background-color:' + color + ';');
}

// Adds an element to the result.
function addToResult(element, result){
    result.textContent += element;
}

// Clear the content of the result
function clearContent(element){
    element.textContent = '';
}

// Return an integer based on string content in a certain radix
function tryParseNumber(str, base){
    try{
        return parseInt(str, base);
    } catch(e){
        throw new NumberFormatException("Couldn't parse number to numeric value.")
    }
}

