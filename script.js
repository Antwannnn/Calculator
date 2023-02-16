
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');

let result = document.getElementById('result');

let baseColor = getComputedStyle(document.querySelector('.numbers'));

let operating = false;
let left;
let right;
    
// Navigate through the numbers' td each click to get the clicked element.
numbers.forEach(current =>{
    current.addEventListener('click', function (){
        if(operating){
            clearContent(result);
            left = current.textContent;
        }
        else{
            right = current.textContent; 
        }

        addToResult(current, result);
        changeColor(current, 'yellow');
        delayTask(1000, function (){
            changeColor(current, baseColor)
        });
    })
})

operators.forEach(current => {
    current.addEventListener('click', function(){
        if(result.textContent !== ''){
            clearContent(result)
            addToResult(current, result)
            operating = true;
        }

    });
})

function getOperatorString(str){
    switch(str){
        case '*': return Operators.multiply;
        case '÷': return Operators.divide;
        case '-': return Operators.minus;
        case '+': return Operators.plus;
        case '%': return Operators.modulo;
        case 'cl'.toLowerCase : return Operators.clear;
    }
}

var toOperator = {
    '+' : function (x, y) { x + y },
    '-' : function (x, y) { x - y},
    '/' : function (x, y) { x / y},
    '*' : function (x, y) { x * y},
    '%' : function (x, y) { x % y},
    'cl' : function (element) { clearContent(element) }
};

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
    result.textContent += element.textContent;
}

// Clear the content of the result
function clearContent(element){
    element.textContent = '';
}

// Return an integer based on string content in a certain radix
function parseNumber(str, base){
    try{
        return parseInt(str, base);
    } catch(e){
        throw new NumberFormatException("Couldn't parse number to numeric value.")
    }
}


