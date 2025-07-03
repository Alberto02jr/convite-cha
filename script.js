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
  const url = "https://docs.google.com/forms/d/e/1FAIpQLSdJCLIqUih5Zul9SvPPkhbHPEZJQ0TBuloLIgvmIe1WN_A5ZA/formResponse";

  const formData = new FormData();
  formData.append("entry.2107812648", nome); // Campo Nome
  formData.append("entry.237440337", confirmou ? "Confirmado" : "Não Confirmado"); // Campo Confirmação

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    console.log("Resposta enviada com sucesso para o Google Forms!");
  }).catch(() => {
    console.error("Erro ao enviar resposta para o Google Forms.");
  });
}
