function getQ(p) {
  return document.querySelector(p)
}

decrem = "";
container = getQ(".container");
containerCenter = getQ(".container .center");
display = getQ('#time');
btnNew = getQ(".btn-new");
body = getQ("body");
msgBox = getQ(".msg-box");
difContainer = getQ(".dif-container");
const btnsDif = difContainer.querySelectorAll(".dif-button");
const gameDif = getQ('.game-dif');
const toqueLevel = getQ('.toque-level');
const changeDif = getQ('.change-dif');
const msgRank = getQ('.msg-rank');
const ranking = getQ('.ranking');
const telaFim = getQ(".tela-fim");
const msgFim = getQ(".msg-fim");
const btnFim = getQ(".btn-fim");
let emojis;
let cardBefore;
let durations;
let numToques = 0;

/* Jogador */
let nomeJogador;
let infoJogador = {
  dificuldade: "",
  toques: 0,
  tempo: 0
}
/***************/

btnNew.addEventListener("click", cadastrarJogador);
changeDif.addEventListener("click", mudarDificuldade);

function cadastrarJogador() {
  msgBox.style.animation = "fadeOut 0.3s forwards";

  setTimeout(() => {
    solicitarNome();
  }, 300);
}

function solicitarNome() {
  return swal({
    title: 'Digite o seu nome',
    content: {
      element: "input",
      attributes: {
        className: "nome-input"
      }
    },
    button: "Enviar",
  }).then(nome => {
    if (!nome) {
      return solicitarNome();
    } else {
      nomeJogador = nome;
      mostrarDificuldades();
    }
  });
}

function mudarDificuldade() {
  changeDif.style.pointerEvents = "none";
  clearInterval(decrem);
  body.style.background = "#44358d";
  container.style.animation = "fadeOut 0.3s forwards";

  setTimeout(() => {
    difContainer.style.animation = "fadeIn 0.3s forwards";
  }, 300);
  container.classList.add('difChange');
}

function mostrarDificuldades() {
  msgBox.style.animation = "fadeOut 0.3s forwards";

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
      infoJogador.dificuldade = dificuldade;
      emojis = definirDificuldade(dificuldade);
      setTimeout(() => {
        difContainer.style.animation = 'fadeOut 0.3s forwards';
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
      ranking.style.border = "2px solid #8ad31d";
    }, 100);
    return ["🤐", "😅", "😡", "🤗", "😡", "🧐", "🤯", "😅", "🧐", "🤐", "🤗", "🤯"].sort(function() { return 0.5 - Math.random() });
  }
  else if (dificuldade == "médio") {
    localStorage.setItem('dificuldade', 'médio');
    setTimeout(() => {
      gameDif.innerText = "Médio";
      gameDif.style.color = "#ffc83d";
      gameDif.style.textShadow = "0px 0px 4px #ffc83d";
      ranking.style.border = "2px solid #ffc83d";
    }, 100);
    return ["😃", "😒", "😐", "😑", "😐", "😄", "😧", "😒", "😄", "😃", "😑", "😧"].sort(function() { return 0.5 - Math.random() });
  }
  else {
    localStorage.setItem('dificuldade', 'difícil');
    setTimeout(() => {
      gameDif.innerText = "Difícil";
      gameDif.style.color = "tomato";
      gameDif.style.textShadow = "0px 0px 4px tomato";
      ranking.style.border = "2px solid tomato";
    }, 100);
    return ["👨‍👨‍👦️", "👨‍👨‍👦‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👧", "👨‍👩‍👦‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👨‍👨‍👦️", "👨‍👨‍👧‍👦", "👨‍👩‍👦‍👦"].sort(function() { return 0.5 - Math.random() });
  }
}

function newGame(emojis) {
  msgRank.style.display = "none";
  changeDif.style.pointerEvents = "none";
  if (container.classList.contains('difChange')) {
    clearInterval(decrem);
    container.style.animation = "fadeIn 0.3s forwards";
  }

  btnFim.style.display = "none";
  toqueLevel.style.display = "flex";
  numToques = 0;
  telaFim.style.animation = "fadeOut 0.3s forwards";
  container.style.display = "block";
  cardBefore = null;
  display.style.color = "#fff";

  if (!containerCenter.innerHTML == "") {
    emojis = definirDificuldade(localStorage.getItem('dificuldade'));
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
  display.style.display = "flex";

  const items = [];
  emojis.forEach((e) => {
    const div = document.createElement("div");
    div.classList.add('item');

    const span = document.createElement("span");
    span.classList.add("emoji");
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

    setTimeout(() => {
      for (item of items) {
        item.querySelector("span").style.display = "none";
      }
    }, 200);

    durations = 60;
    decrem = setInterval(setime2, 1000);
    changeDif.style.pointerEvents = "auto";
    addEvent();
    body.style.background = "linear-gradient(0deg, rgba(133,112,233,1) 0%, rgba(68,53,141,1) 100%)";
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
    if (span.querySelector("span").style.display == "block") {
      count++
    }
  }
  setime2(count)
}

function setime2(t) {
  if (durations < 0 || t == 12) {
    clearInterval(decrem);

    if (t == 12) {
      infoJogador.toques = numToques;
      infoJogador.tempo = durations + 1;
      salvarJogador();
      telaFim.style.display = "flex";
      telaFim.style.backgroundColor = "rgba(138,211,29,0.8)";
      telaFim.style.animation = "fadeIn 0.3s forwards";
      msgFim.innerHTML = "Você ganhou!";

      setTimeout(() => {
        swal({
          title: "Performance",
          content: {
            element: "div",
            attributes: {
              innerHTML: `
                <p><span class="perf-dados">Level:</span> ${infoJogador.dificuldade}</p>
                <p><span class="perf-dados">Toques:</span> ${infoJogador.toques}</p>
                <p><span class="perf-dados">Tempo:</span> ${infoJogador.tempo}s</p>
              `,
              className: "perf-para"
            }
          },
          button: {
            confirm: {
              className: "btn"
            }
          },
          className: "perf-swal"
        }).then(() => {
          newGame();
        })
      }, 500);
    }

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
    telaFim.style.animation = "fadeIn 0.3s forwards";
    msgFim.innerHTML = "Acabou o tempo!";
    btnFim.style.display = "block";
  }
}

btnFim.addEventListener("click", newGame);

function salvarJogador() {
  localStorage.setItem(nomeJogador, JSON.stringify(infoJogador));
}