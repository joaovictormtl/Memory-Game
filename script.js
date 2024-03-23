function getQ(p) {
  return document.querySelector(p)
}

decrem = "";
container = getQ(".container");
containerCenter = getQ(".container .center");
display = getQ('#time');
btn = getQ(".btn");
btnNew = getQ(".btn-new");
body = getQ("body");
msgBox = getQ(".msg-box");
difContainer = getQ(".dif-container");
const btnsDif = difContainer.querySelectorAll(".dif-button");
const gameDif = getQ('.game-dif');
const toqueLevel = getQ('.toque-level');
const changeDif = getQ('.change-dif');
const telaFim = getQ(".tela-fim");
const msgFim = getQ(".msg-fim");
const toquesFim = getQ(".toques-fim");
let emojis;
let cardBefore;
let durations;
let numToques = 0;

btnNew.addEventListener("click", mostrarDificuldades);
btn.addEventListener("click", newGame);
changeDif.addEventListener("click", mudarDificuldade);

function mudarDificuldade() {
  clearInterval(decrem);
  container.style.animation = "animacaoFadeOut 0.3s forwards";

  setTimeout(() => {
    difContainer.style.animation = "animacaoFadeIn 0.3s forwards";
  }, 300);
  container.classList.add('difChange');
}

function mostrarDificuldades() {
  msgBox.style.animation = "animacaoFadeOut 0.3s forwards";

  setTimeout(() => {
    msgBox.style.display = "none";
    difContainer.style.display = "flex";

    setTimeout(() => {
      difContainer.style.opacity = '1';
    }, 100);
  }, 300);

  focusBtn();
}

function focusBtn() {
  btnsDif.forEach(button => {
    button.addEventListener('focus', () => {
      const dificuldade = button.querySelector(".dif-text").textContent;
      emojis = definirDificuldade(dificuldade);
      setTimeout(() => {
        difContainer.style.animation = 'animacaoFadeOut 0.3s forwards';
        newGame(emojis);
      }, 300);
    });
  });
}

function definirDificuldade(dificuldade) {
  if (dificuldade == "fácil") {
    localStorage.setItem('dificuldade', 'fácil');
    setTimeout(() => {
      gameDif.innerText = "Fácil";
      gameDif.style.color = "#8ad31d";
      gameDif.style.textShadow = "0px 0px 4px #8ad31d";
    }, 100);
    return ["🤐", "😅", "😡", "🤗", "😡", "🧐", "🤯", "😅", "🧐", "🤐", "🤗", "🤯"].sort(function() { return 0.5 - Math.random() });
  }
  else if (dificuldade == "médio") {
    localStorage.setItem('dificuldade', 'médio');
    setTimeout(() => {
      gameDif.innerText = "Médio";
      gameDif.style.color = "#ffc83d";
      gameDif.style.textShadow = "0px 0px 4px #ffc83d";
    }, 100);
    return ["😃", "😒", "😐", "😑", "😐", "😄", "😧", "😒", "😄", "😃", "😑", "😧"].sort(function() { return 0.5 - Math.random() });
  }
  else {
    localStorage.setItem('dificuldade', 'difícil');
    setTimeout(() => {
      gameDif.innerText = "Difícil";
      gameDif.style.color = "tomato";
      gameDif.style.textShadow = "0px 0px 4px tomato";
    }, 100);
    return ["👨‍👨‍👦️", "👨‍👨‍👦‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👧", "👨‍👩‍👦‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👨‍👨‍👦️", "👨‍👨‍👧‍👦", "👨‍👩‍👦‍👦"].sort(function() { return 0.5 - Math.random() });
  }
}

function newGame(emojis) {
  if (container.classList.contains('difChange')) {
    container.style.animation = "animacaoFadeIn 0.3s forwards";
  }

  toqueLevel.style.display = "flex";
  toquesFim.innerText = "0 toques";
  numToques = 0;
  telaFim.style.animation = "animacaoFadeOut 0.3s forwards";
  container.style.display = "block";
  cardBefore = null;
  display.style.color = "#fff";

  if (!containerCenter.innerHTML == "") {
    emojis = definirDificuldade(localStorage.getItem('dificuldade'));
    btn.style.display = "none";
    const itemsP = containerCenter.querySelectorAll('.item');

    let tamanho = itemsP.length - 1;
    let intervalSumir = setInterval(() => {

      itemsP[tamanho].style.opacity = '0';
      itemsP[tamanho].style.pointerEvents = "none";

      tamanho--;

      if (tamanho < 0) {
        clearInterval(intervalSumir);
      }
    }, 150);

    setTimeout(() => {
      for (item of itemsP) {
        item.remove();
      }
    }, 160 * itemsP.length);
  }

  if (containerCenter.innerHTML == "") {
    preencherItems(emojis);
  } else {
    setTimeout(() => {
      preencherItems(emojis);
    }, 150 * 12);
  }
}

function preencherItems(emojis) {
  body.style.backgroundColor = "#5441b0";
  display.style.display = "flex";
  btn.style.display = "none";

  const items = [];
  emojis.forEach((e) => {
    const div = document.createElement("div");
    div.classList.add('item');

    const span = document.createElement("span");
    span.innerText = e;
    span.style.display = "block";
    div.appendChild(span);

    items.push(div);
  });

  for (item of items) {
    containerCenter.appendChild(item);
  }

  let tamanho = 0;
  let intervalPreencher = setInterval(() => {

    items[tamanho].style.opacity = '1';
    tamanho++;
    if (tamanho >= items.length) {
      clearInterval(intervalPreencher);
    }
  }, 150);

  setTimeout(() => {
    for (item of items) {
      item.style.transition = "transform 0.6s";
      item.style.transform = "rotateY(360deg)";
      item.style.pointerEvents = "auto";
    }

    setTimeout(()=>{
      for (item of items){
        item.querySelector("span").style.display = "none";
      } 
    }, 200);
    
    durations = 60;
    decrem = setInterval(setime2, 1000);
    addEvent();
    
  }, 180 * items.length);
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

async function clickCard() {
  numToques++;
  toquesFim.innerHTML = `${numToques} toques`;
  span = this.querySelector("span");
  this.style.transition = "transform 0.6s";
  this.style.transform = "rotateY(180deg)";

  setTimeout(() => {
    span.style.display = "block";
  }, 50)

  if (!cardBefore) {
    cardBefore = this;
    cardBefore.style.border = "2px solid tomato";
    cardBefore.style.pointerEvents = "none";

    return;
  } else if (span.innerHTML == cardBefore.querySelector("span").innerHTML) {
    this.style.border = "solid 2px #8ad31d";
    this.style.pointerEvents = "none";

    cardBefore.style.border = "solid 2px #8ad31d";
    cardBefore = null;
    chkWin();
  } else {
    this.style.border = "2px solid tomato";
    rmvEvent();
    setTimeout(() => {
      addStyle([this, cardBefore])

      span.style.display = "none";
      cardBefore.querySelector("span").style.display = "none";
      cardBefore = null;
      addEvent();
    }, 1000)
  }
}

function addStyle(elems) {
  for (let el of elems) {
    el.style.transition = "transform 0.6s"
    el.style.transform = "rotateY(-180deg)";
    el.style.border = "0";
    el.style.pointerEvents = "auto";
  }
}

function chkWin() {
  let count = 1
  spans = document.querySelectorAll('.item');
  for (let span of spans) {
    if (span.querySelector("span").style.display == "flex") {
      count++
    }
  }
  setime2(count)
}



function setime2(t) {
  if (durations < 0 || t == 12) {
    clearInterval(decrem);

    if (t == 12) {
      telaFim.style.display = "flex";
      telaFim.style.backgroundColor = "rgba(138,211,29,0.8)";
      telaFim.style.animation = "animacaoFadeIn 0.3s forwards";
      msgFim.innerHTML = "Você ganhou!";
    }

    btn.style.display = "block";
    return
  }

  if (durations < 10) {
    display.style.color = "tomato";
  }
  display.innerHTML = `⌛${durations < 10 ? ("0" + durations--) : durations--}`;

  if (display.innerHTML == "⌛00") {
    const items = containerCenter.querySelectorAll(".item");
    for (item of items) {
      item.style.pointerEvents = "none";
    }
    telaFim.style.display = "flex";
    telaFim.style.backgroundColor = "rgba(255,99,71,0.8)";
    telaFim.style.animation = "animacaoFadeIn 0.3s forwards";
    msgFim.innerHTML = "Acabou o tempo!";
  }
}