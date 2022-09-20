const startButton = document.querySelector(".startButton")
const start = document.querySelector(".start")
const howToPlay = document.querySelector(".howToPlay")
const startGameButton = document.querySelector(".startGame")
const game = document.querySelector(".game")
const gameContainer = document.querySelector(".game-container");
const goal = document.querySelector(".goal")
const chances = document.querySelector(".chance")
const popUp = document.querySelector(".popUp");
const information = document.querySelector(".information");
const next = document.querySelector(".next");
const final = document.querySelector(".final");
const finalTitle = document.querySelector(".title-final");
const text = document.querySelector(".text");
const more = document.querySelector(".More");
const restart = document.querySelector(".restart");
const home = document.querySelector(".home");
const ready = document.querySelector(".ready");
const readyButton = document.querySelector(".readyButton");
const detail = document.querySelector(".detail");

let scoreCount
let border
let scoreinterval

let startGame = false;
let player = {step: 1, right:9}
let right;
let total;
let chance;

var objects = [ {name: "blue",image: "./img/blue1.png"},
                {name: "brown",image: "./img/brown1.png"},
                {name: "orange",image: "./img/orange1.png"},
                {name: "green",image: "./img/green1.png"},
                {name: "red",image: "./img/red1.png"}]

startButton.addEventListener("click", () => {
    start.classList.add("hide")
    gameDetail()
    //howToPlay.classList.remove("hide")
})

readyButton.addEventListener("click", () => {
    start.classList.add("hide")
    began()
    //howToPlay.classList.remove("hide")
})

/*startGameButton.addEventListener("click", () => {
    howToPlay.classList.add("hide")
    began()
})*/

next.addEventListener("click", () => {
    popUp.classList.add("hide")
    startGame = true
    fallingObject()
})

restart.addEventListener("click", () => {
    final.classList.add("hide")
    for(let i = 0; i < 3; i++){
        objects.pop()
    }
    gameDetail()
  })

  home.addEventListener("click", () => {
    final.classList.add("hide")
    for(let i = 0; i < 3; i++){
        objects.pop()
    }
    start.classList.remove("hide")
  })

  function gameDetail(){
    game.classList.remove("hide")
    ready.classList.remove("hide")
    
    let answerIndex = Math.floor(Math.random() * Math.floor(objects.length))
    answer = objects[answerIndex].name
    newobject =  {name: `${answer}`, image: `${objects[answerIndex].image}`}
    for(let i = 0; i < 3; i++){
        objects.push(newobject)
    }
    chance = 3
    chances.innerHTML = `
    <p>Chance:</p>
    <img class="net" src="./img/net.png">
    <img class="net" src="./img/net.png">
    <img class="net" src="./img/net.png">`
    total = Math.floor(Math.random() * (11 - 5)) + 5
    goal.innerHTML = `<p>Catch</p>
    <p class="scoreCount">${total}</p>
    <img src=${objects[answerIndex].image}>`
    scoreCount = document.querySelector(".scoreCount")
    detail.innerHTML =`
        <h1>Catch</h1>
        <p>${total} ${objects[answerIndex].name} fish</p>
        <img src="${objects[answerIndex].image}">`
}

function began(){
    ready.classList.add("hide")
    startGame = true
    scoreinterval =  setInterval(updateScore, 1)
    chance = 3
    spawnObject()
    fallingObject()
}

function spawnObject(){
    border = gameContainer.getBoundingClientRect();
    let object = document.createElement("div");
    var index = Math.floor(Math.random() * Math.floor(objects.length))
    console.log(index)
    console.log(objects.length)
    console.log(border.width)
    object.classList.add(objects[index].name)
    object.y = 0;
    object.style.top = object.y + 'px';
    object.x = Math.floor(Math.random() * ((border.width - 120) - 150)) + 150
    object.style.left = object.x + 'px';
    gameContainer.appendChild(object);
    object.addEventListener("click", () => {
    object.classList.add("move")
    })
}

function fallingObject(){
    if(startGame){
        moveObject()
        window.requestAnimationFrame(fallingObject);
    }
}
function moveObject(){
    let blue = document.querySelectorAll(".blue");
    let brown = document.querySelectorAll(".brown");
    let orange = document.querySelectorAll(".orange");
    let green = document.querySelectorAll(".green");
    let red = document.querySelectorAll(".red");

    let spwanTime = border.height / 4

    function spawnItem(item){
        if(item.y >= spwanTime && item.y < (spwanTime + 1) && !item.classList.contains("move")){
            spawnObject();
        }
        if(item.classList.contains("move")){
            if(item.y >= spwanTime && item.y < (spwanTime + 9)){
                console.log("S")
                spawnObject();
            }
            if(item.x < 60){
                if(item.y > border.height - 200){
                    item.classList.remove("move")
                }
                item.y = item.y + player.right;
                item.style.top = item.y +"px";
                return
            }
            if(item.y > border.height - 300 && item.x > (border.height/2 - 125)){
                item.classList.remove("move")
                return
            }
            if(item.y > border.height - 200){
                item.classList.remove("move")
                return
            }
            item.x = item.x - player.right;
            item.style.left = item.x +"px";
            item.y = item.y + player.right;
            item.style.top = item.y +"px";
        }
        if(item.y > border.height){
            gameContainer.removeChild(item);
        }
        if(item.y > (border.height - 150) && item.y < border.height && 
        item.x > 0 && item.x < 100){
            if(item.classList.contains(`${answer}`)){
                total -= 1
                gameContainer.removeChild(item);
                return
            }
            else{
                startGame = false
                chance -=1
                if(chance == 0){
                    startGame = false
                    remove()
                    game.classList.add("hide")
                    final.classList.remove("hide")
                    text.innerHTML = `
                    <img src="./img/lose.png">
                    <p>Try Again!</p>`;
                    clearInterval(scoreinterval);
                    return
                }
                let net = document.querySelector(".net")
                net.remove()
                if(item.classList.contains("blue")){
                    information.innerHTML =`
                    <h1>Wrong Fish</h1>
                    <img src="${objects[0].image}">
                    <p>Look closer!</p>`
                }
                if(item.classList.contains("brown")){
                    information.innerHTML =`
                    <h1>Wrong Fish</h1>
                    <img src="${objects[1].image}">
                    <p>Look closer!</p>`
                }
                if(item.classList.contains("orange")){
                    information.innerHTML =`
                    <h1>Wrong Fish</h1>
                    <img src="${objects[2].image}">
                    <p>Look closer!</p>`
                }
                if(item.classList.contains("green")){
                    information.innerHTML =`
                    <h1>Wrong Fish</h1>
                    <img src="${objects[3].image}">
                    <p>Look closer!</p>`
                }
                if(item.classList.contains("red")){
                    information.innerHTML =`
                    <h1>Wrong Fish</h1>
                    <img src="${objects[4].image}">
                    <p>Look closer!</p>`
                }
                popUp.classList.remove("hide")
                gameContainer.removeChild(item);
            }
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    }
    blue.forEach(function(item){
        spawnItem(item);
    })
    brown.forEach(function(item){
        spawnItem(item);
    }) 
    orange.forEach(function(item){
        spawnItem(item);
    })
    green.forEach(function(item){
        spawnItem(item);
    })
    red.forEach(function(item){
        spawnItem(item);
    })
}

function updateScore(){
    if(startGame == true){
        scoreCount.innerHTML = `${total}`;

        if(total == 0){
            console.log("stop")
            let delay = setTimeout(() => {
                startGame = false
                remove()
                game.classList.add("hide")
                final.classList.remove("hide")
                text.innerHTML = `
                <img src="./img/win.png">
                <p>Here's Your Prize!</p>`;
                clearInterval(scoreinterval);
              }, 200);
        }
    }
}

function remove(){
    let blue = document.querySelectorAll(".blue");
    let brown = document.querySelectorAll(".brown");
    let orange = document.querySelectorAll(".orange");
    let green = document.querySelectorAll(".green");
    let red = document.querySelectorAll(".red");
    
    blue.forEach(function(item){
        gameContainer.removeChild(item);
    })
    brown.forEach(function(item){
        gameContainer.removeChild(item);
    })
    orange.forEach(function(item){
        gameContainer.removeChild(item);
    })
    green.forEach(function(item){
        gameContainer.removeChild(item);
    })
    red.forEach(function(item){
        gameContainer.removeChild(item);
    })
}