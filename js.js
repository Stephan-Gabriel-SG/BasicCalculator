const displayExpression = document.getElementById('expression')
const displayResult = document.getElementById('result')
const operatorDisplayed = [
    {
        operator:'/',
        display:'&divide;'
    },
    {
        operator:'*',
        display:'&times;'
    },
    {
        operator:'-',
        display:'&minus;'
    },
    {
        operator:'+',
        display:'&plus;'
    }
]
let operator = ''
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
const btnPositiveOrNegativeNumber = document.getElementById('+/-')
const btnDot = document.getElementById('.')
const btnBasicOperators = [
    document.getElementById('divide'),
    document.getElementById('multiply'),
    document.getElementById('minus'),
    document.getElementById('plus'),
]
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
    if(operator=='')
    {
        updateExpression(numberBeforeOperator)
    }
    else{
        updateExpression(numberBeforeOperator+` ${operator} `+numberAfterOperator)
    }
})

btnBasicOperators.forEach((btnOperator,i)=>{
    btnOperator.addEventListener('click', ()=>{
        if(numberAfterOperator!=''){
            let result = operate(numberBeforeOperator, numberAfterOperator, operator)
            updateResult(result)
            initCalcul()
            numberBeforeOperator = result
        }
        operator=operatorDisplayed[i].operator
        updateExpression(numberBeforeOperator+` ${operatorDisplayed[i].display} `+numberAfterOperator)
    })
})

btnEquals.addEventListener('click', ()=>{
    if(numberBeforeOperator!=='' && numberBeforeOperator!=='' && operator!=='')
    {
        let result = operate(numberBeforeOperator, numberAfterOperator, operator)
        initCalcul()
        numberBeforeOperator = result
        updateResult('')
        updateExpression(result)
    }
})

btnPositiveOrNegativeNumber.addEventListener('click',()=>{
    if(operator=='')
    {
        numberBeforeOperator =(numberBeforeOperator==''?'-':(numberBeforeOperator *-1)).toString()
        updateExpression(numberBeforeOperator)
    }
    else{
        numberAfterOperator =(numberAfterOperator==''?'-':(numberAfterOperator *-1)).toString()
        updateExpression(numberBeforeOperator.toString()+` ${operatorDisplayed.find(obj=>obj.operator==operator).display} `+numberAfterOperator.toString())
        updateResult(operate(numberBeforeOperator, numberAfterOperator, operator))
    }
})

// Functions
function operate(number1, number2, operator){
    let result = NaN
    if(isFinite(number1) && isFinite(number2)){
        number1=parseFloat(number1)
        number2=parseFloat(number2)
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
    // return Number.isInteger(result)?result:result.toFixed(3)
    return result
}

function getExpression(){
    return displayExpression.getHTML()
}

function getResult(){
    return displayResult.getHTML()
}

function updateExpression(newExpression){
    displayExpression.innerHTML = newExpression   
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
        updateResult(operate(numberBeforeOperator, numberAfterOperator, operator))
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

function initCalcul(){
    numberBeforeOperator=''
    numberAfterOperator=''
    operator=''
}
