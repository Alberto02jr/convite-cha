// Controle do slideshow da galeria
const imagens = document.querySelectorAll('.galeria-slider img');
let index = 0;

function mostrarImagem(i) {
  imagens.forEach((img, idx) => {
    img.classList.toggle('ativo', idx === i);
  });
}

// (Opcional) Se quiser slideshow automático, pode usar setInterval ou deixar a animação CSS que você já tem

// Código do formulário de confirmação
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
    nomeInput.focus();
    return;
  }
  resetBotoes();
  btnSim.setAttribute('aria-pressed', 'true');
  btnSim.classList.add('ativo');
  mensagem.textContent = `Obrigado, ${nomeInput.value.trim()}! Sua presença foi confirmada.`;
  enviarResposta(nomeInput.value.trim(), true);

  // Abre o seu Google Forms em nova aba
  const urlGoogleForms = 'https://docs.google.com/forms/d/e/1FAIpQLSdJCLIqUih5Zul9SvPPkhbHPEZJQ0TBuloLIgvmIe1WN_A5ZA/viewform?usp=header';
  window.open(urlGoogleForms, '_blank');
});

btnNao.addEventListener('click', () => {
  if (!nomeInput.value.trim()) {
    mensagem.textContent = 'Por favor, insira seu nome para enviar a resposta.';
    nomeInput.focus();
    return;
  }
  resetBotoes();
  btnNao.setAttribute('aria-pressed', 'true');
  btnNao.classList.add('ativo');
  mensagem.textContent = `Obrigado, ${nomeInput.value.trim()}. Sentiremos sua falta.`;
  enviarResposta(nomeInput.value.trim(), false);
});

function enviarResposta(nome, confirmou) {
  // Aqui você pode substituir pelo envio real para o backend/banco de dados
  console.log('Enviando dados:', { nome, confirmou });

  // Simulação de sucesso após 1.2s
  setTimeout(() => {
    console.log('Resposta registrada com sucesso!');
  }, 1200);
}
