const displayExpression = document.getElementById('expression')
const displayResult = document.getElementById('result')
const operatorDisplayed = ['&divide;','&times;','&minus;','&plus;']
const operator = ''
let numberBeforeOperator = ''
let numberAfterOperator = ''

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
const btnNumbers = [
    document.getElementById('0'),
    document.getElementById('1'),
    document.getElementById('2'),
    document.getElementById('3'),
    document.getElementById('4'),
    document.getElementById('5'),
    document.getElementById('6'),
    document.getElementById('7'),
    document.getElementById('8'),
    document.getElementById('9'),
]

// Listener
btnNumbers.forEach((btnNumber,i)=>{
    btnNumber.addEventListener('click',()=>{
        updateExpression(getExpression() + insertNumber(i))
    })
})

btnDot.addEventListener('click',()=>{
    insertDot()
    updateExpression(numberBeforeOperator+operator+numberAfterOperator)
})

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

function getExpression(){
    return displayExpression.getHTML()
}

function getResult(){
    return displayResult.getHTML()
}

function updateExpression(newExpression){
    displayExpression.innerText = newExpression   
}

function updateResult(newResult){
    displayResult.innerText = newResult
}

function insertNumber(number){
    if(operator===''){
        numberBeforeOperator+=number
    }
    else{
        numberAfterOperator+=number
    }
    return number
}

function insertDot(){
    if(operator===''){
        numberBeforeOperator = numberBeforeOperator.includes('.')?numberBeforeOperator:numberBeforeOperator+'.'
    }
    else{
        numberAfterOperator = numberAfterOperator.includes('.')?numberAfterOperator:numberAfterOperator+'.'
    }
}