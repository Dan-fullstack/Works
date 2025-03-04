// variáveis globais
const player1 = document.getElementById('player1') //input jogador 1
const player2 = document.getElementById('player2') //input jogador 2
const startButton = document.getElementById('start') //botão de começar 
const spanTurnPlayer = document.getElementById('turnPlayer')//span onde vai aparecer o nome
const regions = document.querySelectorAll('section > span')//todas as regiões clicáveis do jogo 
const h2 = document.getElementById('h2')
const vez = document.getElementById('vez')
let results = [
    ['','',''],
    ['','',''],
    ['','','']
]
let winRegions = []
let todasRegiões = ['0.0', '0.1', '0.2', '1.0' , '1.1' ,'1.2' , '2.0' , '2.1', '2.2']
// 

const iniciateGame = (ev) => {
    vez.innerText = 'Vez de: '
    spanTurnPlayer.innerText = player1.value;
    results = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    winRegions = []
    startButton.innerText = 'Começado'
    regions.forEach((region) => {
        region.classList.remove('win')
        region.innerText = ''
        region.classList.add('cursor-pointer')
        region.addEventListener('click',handleClickRegion)       
    })   
}
    

// criando o evento de começar
startButton.addEventListener('click',iniciateGame);
// 

function handleWinGame (){
    if(winRegions.length !== 0){
        winRegions.forEach((região) => {
            document.querySelector('span[data-region= "' + região + '"]').classList.add('win')
        })
        let todasRegiõesRestantes = todasRegiões.filter(elemento => {
            return !winRegions.includes(elemento)
        })
        todasRegiõesRestantes.forEach((elemento) => {
            document.querySelector('span[data-region= "' + elemento + '"]').classList.remove('cursor-pointer')
            document.querySelector('span[data-region= "' + elemento + '"]').removeEventListener('click',handleClickRegion)
        })
        if(spanTurnPlayer.innerText === player1.value){
        spanTurnPlayer.innerText = player2.value + ' venceu'
        vez.innerText =''
        startButton.innerText = 'Recomeçar'
        }else if(spanTurnPlayer.innerText === player2.value){
            spanTurnPlayer.innerText = player1.value + ' venceu'
            vez.innerText = ''
            startButton.innerText = 'Recomeçar'
        }
    } else if (winRegions.length === 0 && !results.flat().includes('')) {
        vez.innerText = ''
        spanTurnPlayer.innerText ='Deu velha, ou seja, empate'
        startButton.innerText = 'Recomeçar'
    }
}

const handleClickRegion = (ev) => {
    const região = ev.currentTarget
    const regionData = região.dataset.region // 0.1
    const rowColumnPair = regionData.split('.') // rowColumnPair = ['0','1']
    const row = rowColumnPair[0] // linha 0
    const column = rowColumnPair[1] // coluna 1 
    if(spanTurnPlayer.innerText === player1.value){
        região.innerText = 'X'
        results[row][column] = 'X'
    } else {
        região.innerText = 'O'
        results[row][column] = 'O'
    }
    console.clear()
    console.table(results)
    spanTurnPlayer.innerText = spanTurnPlayer.innerText === player1.value ? player2.value : player1.value
    getWinregions()
    disableRegion(região)
    handleWinGame()
}

function disableRegion(elemento){
    elemento.classList.remove('cursor-pointer')
    elemento.removeEventListener('click',handleClickRegion)
}

function getWinregions() {
    if(results[0][0] && results[0][0] === results[0][1] && results[0][0] === results[0][2]){
        winRegions.push('0.0','0.1','0.2')
    }
    if(results[0][0] && results[0][0] === results[1][1] && results[0][0] === results[2][2]){
        winRegions.push('0.0','1.1','2.2')
    } 
    if(results[0][0] && results[0][0] === results[1][0] && results[0][0] === results[2][0]){
        winRegions.push('0.0','1.0','2.0')
    } 

    if(results[1][0] && results[1][0] === results[1][1] && results[1][0] === results[1][2]){
        winRegions.push('1,0','1.1','1.2')
    } 
    if(results[2][0] && results[2][0] === results[2][1] && results[2][0] === results[2][2]){
        winRegions.push('2.0','2.1','2.2')
    } 
    if(results[2][0] && results[2][0] === results[1][1] && results[2][0] === results[0][2]){
        winRegions.push('2.0','1.1','0.2')
    } 
    if(results[0][1] && results[0][1] === results[1][1] && results[0][1] === results[2][1]){
        winRegions.push('0.1','1.1','2.1')
    } 
    if(results[0][2] && results[0][2] === results[1][2] && results[0][2] === results[2][2]){
        winRegions.push('0.2','1.2','2.2')
    } 
}





