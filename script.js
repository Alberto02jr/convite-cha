const ENTRY_NOME = 'entry.1447916246';
const ENTRY_RESPOSTA = 'entry.1369510849';

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
