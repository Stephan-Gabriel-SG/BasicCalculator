const displayExpression = document.getElementById('expression')
const displayResult = document.getElementById('result')
const operatorDisplayed = ['&divide;','&times;','&minus;','&plus;']
const operator = 0
let numberInsertFirst = 0
let numberInsertSecond = 0

// Buttons
const btnAC = document.getElementById('AC')
const btnDel = document.getElementById('Del')
const btnPercent = document.getElementById('percent')
const btnDivide = document.getElementById('divide')
const btnMultiply = document.getElementById('multiply')
const btnMinus = document.getElementById('minus')
const btnPlus = document.getElementById('plus')
const btnEquals = document.getElementById('equals')
const btnDot = document.getElementById('.')
const btnNumberZero = document.getElementById('0')
const btnNumberOne = document.getElementById('1')
const btnNumberTwo = document.getElementById('2')
const btnNumberThree = document.getElementById('3')
const btnNumberFour = document.getElementById('4')
const btnNumberFive = document.getElementById('5')
const btnNumberSix = document.getElementById('6')
const btnNumberSeven = document.getElementById('7')
const btnNumberEight = document.getElementById('8')
const btnNumberNine = document.getElementById('9')



// Functions
function operate(number1, number2, operator){
    let result = NaN
    if(isFinite(number1) && isFinite(number2)){
        switch(operator) {
            case '/':
                result = number1 / number2
            break;
            case '*':
                result = number1 * number2
            break;
            case '-':
                result = number1 - number2
            break;
            case '+':
                result = number1 + number2
            break; 
        }
    }
    return result
}

function updateExpression(newExpression){
    displayExpression.innerText = newExpression   
}

function updateResult(newResult){
    displayResult.innerText = newResult
}