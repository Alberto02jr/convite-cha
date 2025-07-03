// Controle do slideshow da galeria
const imagens = document.querySelectorAll('.galeria img');
let index = 0;

function mostrarImagem(i) {
  imagens.forEach((img, idx) => {
    img.classList.toggle('ativo', idx === i);
  });
}

// Mostra a primeira imagem assim que a página carrega
mostrarImagem(index);

// Troca a imagem a cada 5 segundos
setInterval(() => {
  index = (index + 1) % imagens.length;
  mostrarImagem(index);
}, 5000);

// Códigos dos campos do Google Forms
const ENTRY_NOME = 'entry.1447916246';
const ENTRY_RESPOSTA = 'entry.1369510849';

// Elementos do formulário
const form = document.getElementById('formConfirmacao');
const nomeInput = document.getElementById('nome');
const btnSim = document.getElementById('btnSim');
const btnNao = document.getElementById('btnNao');
const mensagem = document.getElementById('mensagem');

function resetBotoes() {
  btnSim.setAttribute('aria-pressed', 'false');
  btnNao.setAttribute('aria-pressed', 'false');
  btnSim.classList.remove('ativo');
  btnNao.classList.remove('ativo');
}

btnSim.addEventListener('click', () => {
  if (!nomeInput.value.trim()) {
    mensagem.textContent = 'Por favor, insira seu nome para confirmar presença.';
    mensagem.style.color = 'red';
    nomeInput.focus();
    return;
  }
  resetBotoes();
  btnSim.setAttribute('aria-pressed', 'true');
  btnSim.classList.add('ativo');
  mensagem.textContent = `Obrigado, ${nomeInput.value.trim()}! Sua presença foi confirmada.`;
  mensagem.style.color = 'green';
  enviarResposta(nomeInput.value.trim(), true);
});

btnNao.addEventListener('click', () => {
  if (!nomeInput.value.trim()) {
    mensagem.textContent = 'Por favor, insira seu nome para enviar a resposta.';
    mensagem.style.color = 'red';
    nomeInput.focus();
    return;
  }
  resetBotoes();
  btnNao.setAttribute('aria-pressed', 'true');
  btnNao.classList.add('ativo');
  mensagem.textContent = `Obrigado, ${nomeInput.value.trim()}. Sentiremos sua falta.`;
  mensagem.style.color = 'green';
  enviarResposta(nomeInput.value.trim(), false);
});

function enviarResposta(nome, confirmou) {
  const data = new FormData();
  data.append(ENTRY_NOME, nome);
  data.append(ENTRY_RESPOSTA, confirmou ? 'Sim' : 'Não');

  fetch('https://docs.google.com/forms/d/e/1FAIpQLSdLOzWySzzRj8GgM8ZYOKqbApXxGeOZJ2QR51LmwyGmt_1rBg/formResponse', {
    method: 'POST',
    mode: 'no-cors',
    body: data,
  }).then(() => {
    console.log('Resposta registrada com sucesso!');
  }).catch(() => {
    console.error('Erro ao enviar a resposta.');
  });
}
