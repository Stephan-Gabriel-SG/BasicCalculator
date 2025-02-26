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
document.addEventListener('keydown',(event)=>{
    // numpad number
    for(let i=0; i<10; i++)
    {
        if(event.code==`Numpad${i}` || event.code==`Digit${i}`){
            handleEventNumberPress(i)
        }
    }
    // numpad dot
    if(event.code=='NumpadDecimal' || event.code=='Period'){
        hanleEventDotPress()
    }
    //numpat operator
    if(event.code=='NumpadDivide'){
        handleEventBasicOperatorPress(0)
    }
    if(event.code=='NumpadMultiply'){
        handleEventBasicOperatorPress(1)
    }
    if(event.code=='NumpadSubtract' || event.code=='Minus'){
        handleEventBasicOperatorPress(2)
    }
    if(event.code=='NumpadAdd'){
        handleEventBasicOperatorPress(3)
    }
    if(event.code=='NumpadEnter' || event.code=='Enter' || event.code=='Equal'){
        handleEventEqualBtnPress()
    }
    if(event.code=='Backslash'){
        handleEventPositiveOrNegativeBtnPress()
    }
    if(event.code=='Backspace'){
        handleEventDeleteBtnPress()
    }
    if(event.code=='Delete'){
        handleEventClearAllBtnPress()
    }
    if(event.code=='KeyP'){
        handleEventPercentBtnPress()
    }
})

btnNumbers.forEach((btnNumber,i)=>{
    btnNumber.addEventListener('click', ()=>handleEventNumberPress(i))
})

btnDot.addEventListener('click', hanleEventDotPress)

btnBasicOperators.forEach((btnOperator, i)=>{
    btnOperator.addEventListener('click', ()=> handleEventBasicOperatorPress(i))
})

btnEquals.addEventListener('click', handleEventEqualBtnPress)

btnPositiveOrNegativeNumber.addEventListener('click', handleEventPositiveOrNegativeBtnPress)

btnAC.addEventListener('click', handleEventClearAllBtnPress)

btnDel.addEventListener('click', handleEventDeleteBtnPress)

btnPercent.addEventListener('click', handleEventPercentBtnPress)

// Functions
function handleEventNumberPress(i){
    insertNumber(i)
    updateExpression(numberBeforeOperator,operator!=''?operatorDisplayed.find(obj=>obj.operator==operator).display:'', numberAfterOperator)
    updateResult(operate(numberBeforeOperator, numberAfterOperator, operator))
}

function hanleEventDotPress(){
    insertDot()
    updateExpression(numberBeforeOperator,operator!=''?operatorDisplayed.find(obj=>obj.operator==operator).display:'', numberAfterOperator)  
}

function handleEventBasicOperatorPress(i){
        if(numberAfterOperator!=''){
            let result = operate(numberBeforeOperator, numberAfterOperator, operator)
            updateResult(result)
            initCalcul()
            numberBeforeOperator = result
        }
        operator=operatorDisplayed[i].operator
        updateExpression(numberBeforeOperator, operatorDisplayed[i].display, numberAfterOperator)
}

function handleEventEqualBtnPress(){
    if(numberBeforeOperator!=='' && numberBeforeOperator!=='' && operator!=='')
        {
            let result = operate(numberBeforeOperator, numberAfterOperator, operator)
            initCalcul()
            numberBeforeOperator = result
            updateResult('')
            updateExpression(result)
        }
}

function handleEventPositiveOrNegativeBtnPress(){
    if(operator=='')
        {
            numberBeforeOperator =(numberBeforeOperator==''?'-':(numberBeforeOperator *-1)).toString()
            updateExpression(numberBeforeOperator)
        }
        else{
            numberAfterOperator =(numberAfterOperator==''?'-':(numberAfterOperator *-1)).toString()
            updateExpression(numberBeforeOperator,operator!=''?operatorDisplayed.find(obj=>obj.operator==operator).display:'', numberAfterOperator)
            updateResult(operate(numberBeforeOperator, numberAfterOperator, operator))
        }
}
function handleEventDeleteBtnPress(){
    if(numberAfterOperator.length > 0){
        numberAfterOperator = numberAfterOperator.slice(0,-1)
    }
    else{
        if(operator!==''){
            operator=''
        }
        else{
            numberBeforeOperator=numberBeforeOperator.length > 0?numberBeforeOperator.slice(0,-1):''
        }
    }
    updateExpression(numberBeforeOperator,operator!=''?operatorDisplayed.find(obj=>obj.operator==operator).display:'', numberAfterOperator)
    updateResult(operator!==''?operate(numberBeforeOperator, numberAfterOperator, operator):includePercent(numberBeforeOperator))
}

function handleEventClearAllBtnPress(){
    initCalcul()
    resetDisplay()
}

function handleEventPercentBtnPress(){
    if(operator==''){
        if(numberBeforeOperator!=''){
            numberBeforeOperator=numberBeforeOperator.includes('%')?numberBeforeOperator:numberBeforeOperator+'%'
            updateExpression(numberBeforeOperator)
        }
    }
    else{
        if(numberAfterOperator!=''){
            numberAfterOperator=numberAfterOperator.includes('%')?numberAfterOperator:numberAfterOperator+'%'
            updateExpression(numberBeforeOperator,operator!=''?operatorDisplayed.find(obj=>obj.operator==operator).display:'', numberAfterOperator)
        }
    }
    updateResult(operate(numberBeforeOperator, numberAfterOperator, operator))
}

function operate(number1, number2, operator){
    number1 = includePercent(number1)
    number2 = includePercent(number2)
    let result = isFinite(number1) && number2=='' ? number1: NaN
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
    return result.toString()
}

function getExpression(){
    return displayExpression.getHTML()
}

function getResult(){
    return displayResult.getHTML()
}

function updateExpression(number1, operator='', number2=''){
    number1 = number2===''?compresVisualisation(number1, 24, 16):compresVisualisation(number1, 12, 6)
    number2 = compresVisualisation(number2, 12, 6)
    displayExpression.innerHTML = `${number1} ${operator} ${number2}`   
}

function updateResult(newResult){
    if(isFinite(newResult)){
        displayResult.innerText = compresVisualisation(newResult, 13)
    }
    else{
        displayResult.innerText = 'Syntax Error'
    }
}

function resetDisplay(){
    updateExpression('')
    updateResult('0')
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

function initCalcul(){
    numberBeforeOperator=''
    numberAfterOperator=''
    operator=''
}

function includePercent(number){
    let result = number
    if(number.toString().includes('%'))
    {
        let numberSplit = number.split('%')
        result = numberSplit[0]/100 * (numberSplit[1]==''?1:numberSplit[1])
    }
    return result.toString()
}

function compresVisualisation(number, maxLength,tmp=10){
    let result = number.toString()
    if(result.length > maxLength){
        result=result.substr(0,tmp)+'...'+result.slice(-2)
    }
    return result
}