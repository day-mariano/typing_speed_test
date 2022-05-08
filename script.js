const testArea = document.querySelector('#test-area');
const originText = document.querySelector('#origin-text p').innerHTML;
const resetButton = document.querySelector('#reset');
const theTimer = document.querySelector('.timer');

let timer = [0, 0, 0, 0];
let interval;
let timerRunning = false;

// Adiciona zero inicial aos números <= 9 (apenas para estética):
function leadingZero(time) {
  return time <= 9 ? `0${time}` : time;
}

// Executa um timer padrão de minuto / segundo / centésimos:
function runTimer() {
  const currentTime = `${leadingZero(timer[0])}:${leadingZero(timer[1])}:${leadingZero(timer[2])}`;
  theTimer.innerHTML = currentTime;
  timer[3] += 1;

  timer[0] = Math.floor((timer[3] / 100) / 60);
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Verifica se texto digitado com o fornecido na página:
function spellCheck() {
  const textEntered = testArea.value;
  const originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered === originText) {
    clearInterval(interval);
    testArea.style.borderColor = '#429890';
  } else if (textEntered === originTextMatch) {
    testArea.style.borderColor = '#65CCf3';
  } else {
    testArea.style.borderColor = '#E95D0F';
  }
}

// Inicia o cronômetro:
function start() {
  const textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

// Função de recomeçar:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;

  testArea.value = '';
  theTimer.innerHTML = '00:00:00';
  testArea.style.borderColor = 'grey';
}

// Listeners de eventos para entrada de teclado e o botão de recomeçar:
testArea.addEventListener('keypress', start, false);
testArea.addEventListener('keyup', spellCheck, false);
resetButton.addEventListener('click', reset, false);
