function getQ(p) {
  return document.querySelector(p)
}

decrem = "";
container = getQ(".container .center");
display = getQ('#time');
btn = getQ(".btn");
let cardBefore = null;
console.log(container);
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

  emojis =
    ["🤐", "😅", "😡", "🤗", "😡", "🧐", "🤯", "😅", "🧐", "🤐", "🤗", "🤯"].sort(function() { return 0.5 - Math.random() });
  container.innerHTML =
    emojis.map((e) => {
      return `<div class="item"><span>${e}</span></div>`
    }).toString().replaceAll(",", "")
  addEvent();
  durations = 60;
  decrem = setInterval(setime2, 1000);
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

newGame();

async function clickCard() {
  console.log(cardBefore);
  span = this.querySelector("span");
  this.style.transition = "transform 0.6s";
  this.style.transform = "rotateY(180deg)";
  console.log(span)

  setTimeout(() => {
    span.style.display = "flex";
    span.style.transform = "rotateY(180deg)";
  }, 300)

  if (!cardBefore) {
    cardBefore = this;
    return
  } else if (span.innerHTML == cardBefore.querySelector("span").innerHTML) {
    console.log("muda");
    this.style.border = "solid 2px tomato";
    cardBefore.style.border = "solid 2px tomato";
    cardBefore = null;
    chkWin();
  } else {
    console.log(`nao mudou`);
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