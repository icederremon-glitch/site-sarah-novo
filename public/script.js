// =======================
// ⏳ CONTADOR REAL
// =======================
const inicio = new Date("2023-09-27T00:00:00");

function atualizarContador(){
  const hoje = new Date();

  const diferenca = hoje.getTime() - inicio.getTime();

  const dias = Math.floor(
    diferenca / (1000 * 60 * 60 * 24)
  );

  document.getElementById("contador").innerText =
    `${dias} dias juntos 💖`;
}

setInterval(atualizarContador, 1000);
atualizarContador();


// =======================
// 💬 MENSAGENS INICIAIS
// =======================
const mensagensIniciais = [
  "...ei 💙",
  "eu fiz isso pra você porque eu te amo muito e queria te dar um presente diferente 🎁",
  "agora voce pode perguntar tudo o que quiser que eu te respondo sempre, mesmo estando dormindo ou nao 💖"
];

function iniciarMensagens(){
  mensagensIniciais.forEach((msg, i)=>{
    setTimeout(()=>{
      addMessage(msg, "bot");
    }, i * 1200);
  });

  renderHistorico();
}

window.onload = iniciarMensagens;


// =======================
// 📜 HISTÓRICO
// =======================
function salvarHistorico(pergunta){

  let historico =
    JSON.parse(localStorage.getItem("historico")) || [];

  const agora = new Date();

  const dataHora =
    agora.toLocaleString("pt-BR");

  historico.unshift({
    texto: pergunta,
    data: dataHora
  });

  historico = historico.slice(0, 15);

  localStorage.setItem(
    "historico",
    JSON.stringify(historico)
  );

  renderHistorico();
}


function renderHistorico(){

  const historico =
    JSON.parse(localStorage.getItem("historico")) || [];

  const area =
    document.getElementById("historico");

  if(!area) return;

  area.innerHTML = historico.map(item => `
    <div class="item-historico">

      <div class="historico-data">
        🕒 ${item.data}
      </div>

      <div>
        💙 ${item.texto}
      </div>

    </div>
  `).join("");
}



// =======================
// 💬 CHAT
// =======================
async function sendMessage(){
  const input = document.getElementById("input");
  const text = input.value.trim();

  if(!text) return;

  addMessage(text, "user");
  salvarHistorico(text);

  input.value = "";

  try{
    const res = await fetch("/chat", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message:text
      })
    });

    const data = await res.json();

    addMessage(data.reply, "bot");

  }catch{
    addMessage("Deu erro 😢", "bot");
  }
}

function addMessage(text, type){
  const chat = document.getElementById("chat");

  const msg = document.createElement("div");

  msg.classList.add("msg", type);
  msg.innerText = text;

  chat.appendChild(msg);

  chat.scrollTop = chat.scrollHeight;
}


// =======================
// 🐟 PEIXES
// =======================
function criarPeixe(){
  const peixe = document.createElement("div");

  peixe.classList.add("peixe");

  peixe.innerText = "🐠";

  peixe.style.top =
    Math.random()*80 + "vh";

  const duracao =
    15000 + Math.random()*8000;

  if(Math.random() > 0.5){

    peixe.style.left = "-40px";
    peixe.style.transform = "rotateY(180deg)";

    peixe.animate([
      { left:"-40px" },
      { left:"110vw" }
    ],{
      duration: duracao,
      easing:"linear"
    });

  }else{

    peixe.style.left = "110vw";
    peixe.style.transform = "none";

    peixe.animate([
      { left:"110vw" },
      { left:"-40px" }
    ],{
      duration: duracao,
      easing:"linear"
    });
  }

  document.body.appendChild(peixe);

  setTimeout(()=>{
    peixe.remove();
  }, duracao);
}

setInterval(criarPeixe, 3000);


// =======================
// 🫧 BOLHAS BALEIA
// =======================
setInterval(()=>{
  const baleia =
    document.querySelector(".baleia");

  if(!baleia) return;

  const rect =
    baleia.getBoundingClientRect();

  const bolha =
    document.createElement("div");

  bolha.classList.add("bolha");

  bolha.style.left = rect.right + "px";
  bolha.style.top = rect.top + "px";

  document.body.appendChild(bolha);

  setTimeout(()=>{
    bolha.remove();
  }, 4000);

}, 900);


// =======================
// ✨ PARTICULAS
// =======================
function criarParticula(){

  const p = document.createElement("div");

  p.classList.add("particula");

  p.style.left =
    Math.random()*100 + "vw";

  document.body.appendChild(p);

  setTimeout(()=>{
    p.remove();
  }, 10000);
}

setInterval(criarParticula, 500);


// =======================
// 🐠 PONYO + BOLHAS
// =======================
setInterval(()=>{

  const ponyo =
    document.querySelector(".ponyo");

  if(!ponyo) return;

  const rect =
    ponyo.getBoundingClientRect();

  const bolha =
    document.createElement("div");

  bolha.className = "bolha-ponyo";

  bolha.style.left =
    rect.left + 20 + "px";

  bolha.style.top =
    rect.top + 20 + "px";

  document.body.appendChild(bolha);

  setTimeout(()=>{
    bolha.remove();
  }, 3000);

}, 500);