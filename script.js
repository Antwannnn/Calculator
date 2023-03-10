
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

// Navigate through the numbers' td tag at each click to get the clicked element and
// operate with it.
numbers.forEach(current =>{
    current.addEventListener('click', function (){
        if(calc == null){
            value += current.textContent;
            addToResult(current.textContent, result);
            changeColor(current, 'yellow');
            console.log(operands);
            delayTask(1000, function (){
                changeColor(current, baseColor)
            });
        }
        
    })
})

// Navigate through all the operators' td tag at each click to get the clicked element and
// operate with it.
operators.forEach(current => {
    current.addEventListener('click', function(){
        calc = null;
        var resultContent = result.textContent;
        if(operands.length < 1)
            operands.push(value);
        if(resultContent !== ''){
            addToResult(current.textContent, result);
            operator = current.textContent;
            console.log(operands);
            operating = true;
            current.setAttribute('style', 'font-size : 55px; opacity : 0.8;');
            value = "";
        }

    });
})


// Cl sign click handler
clear.addEventListener('click', function () {
    clearContent(result);
    operands = [];
    value = "";
    operator = undefined;
    operating = false;
    calc = null;
})

// Equal sign click handler
equal.addEventListener('click', function() {
    operands.push(value);
    calc = calculate(operator);
    operands = [];
    operating = false;
    operands.push(calc.toString())
    clearContent(result);
    addToResult(calc, result);


})

// Converts a string into a valid operation between two numbers
function toOperation(str, n1, n2){
    switch(str){
        case 'X': return n1 * n2;
        case '??': return n1 / n2;
        case '-': return n1 - n2;
        case '+': return n1 + n2;
        case '%': return n1 % n2;
        case '???': return Math.sqrt(n1);
        default : return '';
    }
}

// Make the operation between the first and second index of the operands
// based on an operator given by toOperation() function
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
        return parseFloat(str, base);
    } catch(e){
        throw new NumberFormatException("Couldn't parse string to numeric value.")
    }
}

