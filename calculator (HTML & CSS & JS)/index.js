const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const body = document.getElementsByTagName('body')[0]; // Acessa o primeiro elemento da coleção
const resultInput = document.getElementById("results");
const buttons = document.querySelectorAll('div > button')
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];
const historico = []
const historicoInput = document.getElementById('historico')

// Alternando entre duas cores de fundo
document.getElementById('themeSwitcher').addEventListener('click', (ev) => {
    
    if (body.style.backgroundColor === 'var(--bg-color)') {
        body.style.backgroundColor = 'var(--font-color)' // Volta para a cor padrão
        document.getElementById('h1').style.color = 'var(--bg-color)'
        document.getElementById('themeSwitcher').style.backgroundColor = 'var(--font-color)'
        document.getElementById('themeSwitcher').style.color = 'var(--bg-color)'
        document.getElementById('themeSwitcher').style.borderColor = 'var(--bg-color)'
        input.style.color = 'var(--bg-color)'
        input.style.backgroundColor = 'var(--font-color)'
        input.style.borderColor = 'var(--bg-color)'
        resultInput.style.color = 'var(--bg-color)'
        resultInput.style.backgroundColor = 'var(--font-color)'
        resultInput.style.borderColor = 'var(--bg-color)'
        document.getElementById('copyToClipboard').style.color = 'var(--bg-color)'
        document.getElementById('copyToClipboard').style.backgroundColor = 'var(--font-color)'
        document.getElementById('copyToClipboard').style.borderColor = 'var(--bg-color)'
        buttons.forEach((element) => {
            element.style.backgroundColor = 'var(--bg-color)'
            element.style.color = 'var(--font-color)'
        })
        

    } else {
        body.style.backgroundColor = 'var(--bg-color)'
        document.getElementById('h1').style.color = 'var(--font-color)'
        document.getElementById('themeSwitcher').style.backgroundColor = 'var(--bg-color)'
        document.getElementById('themeSwitcher').style.color = 'var(--font-color)'
        document.getElementById('themeSwitcher').style.borderColor = 'var(--font-color)'
        input.style.color = 'var(--font-color)'
        input.style.backgroundColor = 'var(--bg-color)'
        input.style.borderColor = 'var(--font-color)'
        resultInput.style.color = 'var(--font-color)'
        resultInput.style.backgroundColor = 'var(--bg-color)'
        resultInput.style.borderColor = 'var(--font-color)'
        document.getElementById('copyToClipboard').style.color = 'var(--font-color)'
        document.getElementById('copyToClipboard').style.backgroundColor = 'var(--bg-color)'
        document.getElementById('copyToClipboard').style.borderColor = 'var(--font-color)'
        buttons.forEach((element) => {
            element.style.backgroundColor = 'var(--primary-color)'
            element.style.color = 'var(--bg-color)'
        })
    }
})
// 

// limitações no teclado 
input.addEventListener('keydown',(ev) => {
    ev.preventDefault()

    if(allowedKeys.includes(ev.key)){
        input.value += ev.key
    }
    if(ev.key === 'Backspace'){
        input.value = input.value.slice(0,-1)
    }
    if(ev.key === 'Enter'){
        calculate()
    }
})
//

// aplicando os botões 
const keybuttons = document.querySelectorAll('.charKey')
const clear = document.getElementById('clear')
const equal = document.getElementById('equal')

keybuttons.forEach((elemento) => {
    elemento.addEventListener('click',(ev) =>{
        const dataKey = elemento.dataset.value
        input.value += dataKey
    })
})

clear.addEventListener('click', (ev) => {
    input.value = ''
})

equal.addEventListener('click', (ev) => {
    calculate()
})
// 


// Criando a função 
let indentifier = 0 

function calculate(){
    resultInput.value = "ERROR"
    resultInput.classList.add("error")
    const value = eval(input.value)
    resultInput.value = value
    resultInput.classList.remove("error")
    historico.push(resultInput.value)
    console.log(historico)
    
    if(historico.length === 1){
        historicoInput.value = 'vazio'
    } else if (historico.length > 1){
        historicoInput.value = historico[indentifier - 1]
    }
    indentifier++
}
// 

// criando a copy 
document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
    const button = ev.currentTarget
    if (button.innerText === "Copy") {
        button.innerText = "Copied!"
        button.classList.add("success")
        navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = "Copy"
        button.classList.remove("success")
    }
})





