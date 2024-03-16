function getQ(p) {
  return document.querySelector(p)
}

decrem = "";
containerCenter = getQ(".container .center");
display = getQ('#time');
btn = getQ(".btn");
btnNew = getQ(".btn-new");
body = getQ("body");
msgInicial = getQ(".msg-inicial");
let cardBefore = null;
let durations = 60;

function setime2(t) {
  if (durations < 0 || t == 12) {
    clearInterval(decrem)
    btn.style.display = "block";
    return
  }
  display.innerHTML = `⌛${durations < 10 ? ("0" + durations--) : durations--}`
}

function newGame() {
  
  if(!containerCenter.innerHTML == ""){
    btn.style.display = "none";
    const itemsP = containerCenter.querySelectorAll('.item');

    let tamanho = 11;
    let intervalSumir = setInterval(() =>{

      itemsP[tamanho].style.opacity = '0';
      itemsP[tamanho].style.pointerEvents = "none";
      
      tamanho--;
      
      if(tamanho < 0){
        clearInterval(intervalSumir);
      }
    }, 300);

    setTimeout(()=>{
      for(item of itemsP){
        item.remove();
      } 
    }, 320 * itemsP.length);
  }
  
  if(containerCenter.innerHTML == ""){
    preencherItems();
  } else{
    setTimeout(()=>{
      preencherItems();
    }, 300 * 12);
  }
}

function preencherItems(){
  display.style.display = "flex";
  btn.style.display = "none";
  btnNew.style.display = "none";
  body.style.backgroundColor = "#5441b0";
  msgInicial.style.display = "none";

  emojis =
    ["🤐", "😅", "😡", "🤗", "😡", "🧐", "🤯", "😅", "🧐", "🤐", "🤗", "🤯"].sort(function() { return 0.5 -      Math.random() });

  const items = [];
  emojis.forEach((e) => {
    const div = document.createElement("div");
    div.classList.add('item');

    const span = document.createElement("span");
    span.innerText = e;
    div.appendChild(span);

    items.push(div);
  });

  for(item of items){
    containerCenter.appendChild(item);
  }

  let tamanho = 0;
  let intervalPreencher = setInterval(() =>{

    items[tamanho].style.opacity = '1';
    tamanho++;
    if(tamanho >= items.length){
      clearInterval(intervalPreencher);
    }
  }, 300);

  setTimeout(()=>{
    for(item of items){
      item.style.pointerEvents = "auto";
    }
    durations = 60;
    decrem = setInterval(setime2, 1000);
    addEvent();
  }, 320 * items.length);
}

function addEvent() {
  spans = document.querySelectorAll('.item');
  for (let span of spans) {
    span.addEventListener("click", clickCard);
  }
}

function rmvEvent() {
  spans = document.querySelectorAll('.item');
  for (let span of spans) {
    span.removeEventListener("click", clickCard);
  }
}

btnNew.addEventListener("click", newGame);

async function clickCard() {
  span = this.querySelector("span");
  this.style.transition = "transform 0.6s";
  this.style.transform = "rotateY(180deg)";

  setTimeout(() => {
    span.style.display = "flex";
    span.style.transform = "rotateY(180deg)";
  }, 300)

  if (!cardBefore) {
    cardBefore = this;
    return
  } else if (span.innerHTML == cardBefore.querySelector("span").innerHTML) {
    this.style.border = "solid 2px tomato";
    cardBefore.style.border = "solid 2px tomato";
    cardBefore = null;
    chkWin();
  } else {
    rmvEvent()
    setTimeout(() => {
      addStyle([this, cardBefore])

      span.style.display = "none";
      cardBefore.querySelector("span").style.display = "none";
      cardBefore = "";
      addEvent()
    }, 1000)
  }
}

function addStyle(elems) {
  for (let el of elems) {
    el.style.transition = "transform 0.6s"
    el.style.transform = "rotateY(-180deg)";
    el.style.border = "solid 2px #333";
  }
}

function chkWin() {
  let count = 1
  spans = document.querySelectorAll('.item');
  for (let span of spans) {
    if (span.querySelector("span").style.display == "block") {
      count++
    }
  }
  setime2(count)
}
