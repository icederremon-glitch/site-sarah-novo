// =======================
// ⏳ CONTADOR
// =======================
const inicio = new Date("2023-09-27");

function atualizarContador(){
  const hoje = new Date();
  const dias = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
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
}

window.onload = iniciarMensagens;


// =======================
// 💬 CHAT
// =======================
async function sendMessage(){
  const input = document.getElementById("input");
  const text = input.value.trim();
  if(!text) return;

  addMessage(text, "user");
  input.value = "";

  try{
    const res = await fetch("/chat", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ message:text })
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
// 🐟 PEIXES (CORREÇÃO FINAL)
// =======================
function criarPeixe(){
  const peixe = document.createElement("div");
  peixe.classList.add("peixe");

  peixe.innerText = "🐠";

  const y = Math.random()*80 + "vh";
  peixe.style.top = y;

  const duracao = 15000 + Math.random()*8000;

  if(Math.random() > 0.5){
    // esquerda → direita
    peixe.style.left = "-40px";
    peixe.style.transform = "rotateY(180deg)"; // 🔥 vira pra direita

    peixe.animate([
      { left:"-40px" },
      { left:"110vw" }
    ],{
      duration: duracao,
      easing:"linear"
    });

  }else{
    // direita → esquerda
    peixe.style.left = "110vw";
    peixe.style.transform = "none"; // 🔥 já está virado certo

    peixe.animate([
      { left:"110vw" },
      { left:"-40px" }
    ],{
      duration: duracao,
      easing:"linear"
    });
  }

  document.body.appendChild(peixe);
  setTimeout(()=>peixe.remove(), duracao);
}

setInterval(criarPeixe, 3000);


// =======================
// 🫧 BOLHAS DA BALEIA
// =======================
setInterval(()=>{
  const baleia = document.querySelector(".baleia");
  if(!baleia) return;

  const rect = baleia.getBoundingClientRect();

  const bolha = document.createElement("div");
  bolha.classList.add("bolha");

  bolha.style.left = rect.right + "px";
  bolha.style.top = rect.top + "px";

  document.body.appendChild(bolha);

  setTimeout(()=>bolha.remove(), 4000);
}, 900);


// =======================
// ✨ PARTICULAS
// =======================
function criarParticula(){
  const p = document.createElement("div");
  p.classList.add("particula");

  p.style.left = Math.random()*100 + "vw";

  document.body.appendChild(p);

  setTimeout(()=>p.remove(), 10000);
}

setInterval(criarParticula, 500);


// =======================
// 🐠 PONYO + BOLHAS
// =======================
setInterval(() => {
  const ponyo = document.querySelector(".ponyo");
  if (!ponyo) return;

  const rect = ponyo.getBoundingClientRect();

  const bolha = document.createElement("div");
  bolha.className = "bolha-ponyo";

  bolha.style.left = rect.left + 20 + "px";
  bolha.style.top = rect.top + 20 + "px";

  document.body.appendChild(bolha);

  setTimeout(() => bolha.remove(), 3000);
}, 500);