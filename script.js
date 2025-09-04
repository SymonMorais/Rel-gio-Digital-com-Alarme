// Selecionando os elementos do HTML
const alarmTimeInput = document.getElementById("alarm-time");
const setAlarmBtn = document.getElementById("set-alarm");
const clearAlarmBtn = document.getElementById("clear-alarm");
const alarmStatus = document.getElementById("alarm-status");
const relogio = document.getElementById("relogio");

// Variável para armazenar o horário do alarme
let alarmTime = null;

// ------------------- FUNÇÃO PRINCIPAL DO RELÓGIO -------------------
function atualizarRelogio() {
  const agora = new Date();

  // Pegando horas, minutos e segundos
  let horas = agora.getHours();
  let minutos = agora.getMinutes();
  let segundos = agora.getSeconds();

  // Adicionando zero à esquerda (ex: 07:05:09)
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  // Monta a string da hora atual
  const horaAtual = `${horas}:${minutos}:${segundos}`;

  // Exibe no HTML
  relogio.textContent = horaAtual;

  // Verifica se o alarme deve disparar
  if (alarmTime === `${horas}:${minutos}` && segundos === "00") {
    dispararAlarme();
  }
}

// ------------------- FUNÇÃO QUE DISPARA O ALARME -------------------
function dispararAlarme() {
  alarmStatus.textContent = "⏰ Alarme disparado!";
  alarmStatus.style.color = "yellow";

  // Som do alarme
  let audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  audio.play();

  // Depois de tocar, o alarme é desativado
  alarmTime = null;
}

// ------------------- ATIVAR ALARME -------------------
setAlarmBtn.addEventListener("click", () => {
  if (alarmTimeInput.value) {
    alarmTime = alarmTimeInput.value; // formato HH:MM
    alarmStatus.textContent = `Alarme definido para ${alarmTime}`;
    alarmStatus.style.color = "lightgreen";
  } else {
    alert("Por favor, escolha um horário para o alarme!");
  }
});

// ------------------- CANCELAR ALARME -------------------
clearAlarmBtn.addEventListener("click", () => {
  alarmTime = null;
  alarmStatus.textContent = "Nenhum alarme definido.";
  alarmStatus.style.color = "white";
});

// ------------------- FUNÇÃO DE FUNDO DINÂMICO -------------------
function atualizarFundoPorHora() {
  const agora = new Date();
  const hora = agora.getHours();
  const body = document.body;

  // Remove classes anteriores
  body.classList.remove("manha", "tarde", "noite", "madrugada");

  // Define a classe conforme o horário
  if (hora >= 5 && hora < 12) {
    body.classList.add("manha");
  } else if (hora >= 12 && hora < 18) {
    body.classList.add("tarde");
  } else if (hora >= 18 && hora < 23) {
    body.classList.add("noite");
  } else {
    body.classList.add("madrugada");
  }
}

// ------------------- EXECUÇÃO AUTOMÁTICA -------------------
// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// Atualiza o fundo ao carregar e a cada minuto
window.onload = atualizarFundoPorHora;
setInterval(atualizarFundoPorHora, 60000);
