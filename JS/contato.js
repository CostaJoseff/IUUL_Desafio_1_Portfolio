function coletarArmazenamentoLocal() {
  let armazenamentoLocal = JSON.parse(localStorage.getItem("mensagens"));
  if (armazenamentoLocal === null || armazenamentoLocal === undefined || armazenamentoLocal.length == 0) {
    armazenamentoLocal = [];
  }
  return armazenamentoLocal;
}

function coletarMensagemID() {
  let msgID = localStorage.getItem("idDisponivel");
  if (msgID === null || msgID === undefined) {
    msgID = 0;
  }
  return msgID;
}

function conteudoVazio(conteudo) {
  return stringVazia(conteudo.nome) || stringVazia(conteudo.email) || stringVazia(conteudo.mensagem);
}

function limparBotao() {
  let campoNome = document.getElementById("user-nome");
  let campoEmail = document.getElementById("user-email");
  let campoMensagem = document.getElementById("user-msg");

  campoNome.value = "";
  campoEmail.value = "";
  campoMensagem.value = "";
}

function stringVazia(string) {
  return string.trim().length === 0;
}

const botao = document.getElementById("botao-enviar");
botao.addEventListener("click", function coletarMensagem() {
  let armazenamentoLocal = coletarArmazenamentoLocal();
  let msgID = coletarMensagemID();
  let conteudo = {};

  conteudo.nome = document.getElementById("user-nome").value;
  conteudo.email = document.getElementById("user-email").value;
  conteudo.mensagem = document.getElementById("user-msg").value;
  conteudo.msgID = msgID;

  if(conteudoVazio(conteudo)) {
    console.log("Conteúdo do formuládio não pode estar vazio.");
    return null;
  }

  armazenamentoLocal.push(conteudo);

  localStorage.setItem("mensagens", JSON.stringify(armazenamentoLocal));
  localStorage.setItem("idDisponivel", msgID++);
  limparBotao();
});

const areaNome = document.getElementById("user-nome");
areaNome.addEventListener("focusout", function estaVazio() {
  const nome = document.getElementById("user-nome").value;
  if (stringVazia(nome)) {
    areaNome.classList.add("erro");
  } else {
    areaNome.classList.remove("erro");
  }
});

const areaEmail = document.getElementById("user-email");
areaEmail.addEventListener("focusout", function estaVazio() {
  const email = document.getElementById("user-email").value;
  if (stringVazia(email)) {
    areaEmail.classList.add("erro");
  } else {
    areaEmail.classList.remove("erro");
  }
});

const areaMensagem = document.getElementById("user-msg");
areaMensagem.addEventListener("focusout", function estaVazio() {
  const mensagem = document.getElementById("user-msg").value;
  if (stringVazia(mensagem)) {
    areaMensagem.classList.add("erro");
  } else {
    areaMensagem.classList.remove("erro");
  }
});