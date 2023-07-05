let mensagens = [];
mensagens = JSON.parse(localStorage.getItem("mensagens"));
if (mensagens == null) {
  mensagens = [];
}

let msgID = localStorage.getItem("idDisponivel");
if (msgID == null) {
  msgID = 0;
}

let conteudo = {};

const botao = document.getElementById("botao-enviar");
botao.addEventListener("click", function coletarMensagem() {
  conteudo.nome = document.getElementById("user-nome").value;
  conteudo.email = document.getElementById("user-email").value;
  conteudo.mensagem = document.getElementById("user-msg").value;
  conteudo.msgID = msgID;

  mensagens.push(conteudo);

  localStorage.setItem("mensagens", JSON.stringify(mensagens));
  mensagens = localStorage.getItem("mensagens");
  localStorage.setItem("idDisponivel", msgID++);
});