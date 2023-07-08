const nomeEstaVazio = function () {
  const nome = document.getElementById("user-nome").value;
  if (stringVazia(nome)) {
    areaNome.classList.add("erro");
  } else {
    areaNome.classList.remove("erro");
  }
}

const emailEstaVazio = function () {
  const email = document.getElementById("user-email").value;
  if (stringVazia(email)) {
    areaEmail.classList.add("erro");
  } else {
    areaEmail.classList.remove("erro");
  }
}

const mensagemEstaVazia = function () {
  const mensagem = document.getElementById("user-msg").value;
  if (stringVazia(mensagem)) {
    areaMensagem.classList.add("erro");
  } else {
    areaMensagem.classList.remove("erro");
  }
}

const coletarMensagem = function () {
  let armazenamentoLocal = coletarArmazenamentoLocal();
  let msgID = coletarMensagemID();
  let conteudo = {};
  let toastMensagem = document.getElementById("toast-mensagem");
  let divToastArea = document.getElementById("toast-area");

  conteudo.nome = document.getElementById("user-nome").value;
  conteudo.email = document.getElementById("user-email").value;
  conteudo.mensagem = document.getElementById("user-msg").value;
  conteudo.msgID = msgID;

  if(conteudoVazio(conteudo)) {
    console.log("Conteúdo do formuládio não pode estar vazio.");

    
    toastMensagem.innerText = "❌ Preencha os campos em VERMELHO!";
    divToastArea.classList = "d-flex bg-danger-subtle border border-danger-subtle";
    return null;
  }

  armazenamentoLocal.push(conteudo);

  localStorage.setItem("mensagens", JSON.stringify(armazenamentoLocal));
  localStorage.setItem("idDisponivel", msgID++);
  toastMensagem.innerText = "✔️ Mensagem enviada!";
    divToastArea.classList = "d-flex bg-success-subtle border border-success-subtle";

  limparBotao();
}

const botao = document.getElementById("botao-enviar");
botao.addEventListener("click", nomeEstaVazio);
botao.addEventListener("click", emailEstaVazio);
botao.addEventListener("click", mensagemEstaVazia);
botao.addEventListener("click", coletarMensagem);

const areaNome = document.getElementById("user-nome");
areaNome.addEventListener("focusout", nomeEstaVazio);

const areaEmail = document.getElementById("user-email");
areaEmail.addEventListener("focusout", emailEstaVazio);

const areaMensagem = document.getElementById("user-msg");
areaMensagem.addEventListener("focusout", mensagemEstaVazia);

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

function toast() {
  let config = {
    animation: true,
    delay: 5000
  };
  let contatoToast = document.getElementById("contato-toast");
  let toastElement = new bootstrap.Toast(contatoToast, config);
  toastElement.show();
}