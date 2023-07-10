function deletarElemento(icon) {
  return function () {
    let msgArea = document.getElementById("msg-area");
    let divCard = icon.parentNode.parentNode.parentNode;
    removerDivCard(msgArea, divCard);
    let cardMsgID = icon.parentNode.querySelector("p").innerText;
    setTimeout(function() {
      msgArea.removeChild(divCard);
    }, 500);


    /*
    * lembrar que tenho que pesquisar o ID
    * que está armazenado no p e comparar
    * no laço for
    *
    * 
    */

    let mensagens = JSON.parse(localStorage.getItem("mensagens"));
    for (let i = 0; i < mensagens.length; i++) {
      if (mensagens[i].msgID == cardMsgID) {
        if (mensagens.length == 1) {
          mensagens = [];
        } else {
          mensagens.splice(i, 1);
        }
        localStorage.setItem("mensagens", JSON.stringify(mensagens));
        return;
      }
    }
  }
}

function removerDivCard(msgArea, divCard) {
  divCard.classList.add("del-anim-removido");
}

function prepararElementos(i, mensagens) {
  // Parte superior do card de Mensagem
  let divCard = document.createElement("div");
  divCard.classList = "card mrg-td-p sombra bg-claro del-anim"

  let nome = document.createElement("h2");
  nome.classList = "d-inline";
  nome.textContent = mensagens[i].nome;

  let id = document.createElement("p");
  id.id = "msg-id";
  id.textContent = mensagens[i].msgID;

  let iconLixo = document.createElement("i");
  iconLixo.classList = "bi bi-trash scale-anim-icon pointer altura-icon-lixo";
  iconLixo.addEventListener("click", deletarElemento(iconLixo));

  let divNomeIcon = document.createElement("div");
  divNomeIcon.classList = "d-flex justify-content-between";
  divNomeIcon.appendChild(nome);
  divNomeIcon.appendChild(id);
  divNomeIcon.appendChild(iconLixo);

  let email = document.createElement("p");
  email.classList = "";
  email.textContent = mensagens[i].email;

  let hr = document.createElement("hr");

  // Parte inferior do card de Mensagem
  let mensagem = document.createElement("p");
  mensagem.classList = "";
  mensagem.textContent = mensagens[i].mensagem;

  let divCardBody = document.createElement("div");
  divCardBody.classList = "inside-box-p";

  return {
    "divCard" : divCard,
    "divNomeIcons" : divNomeIcon,
    "email" : email,
    "hr": hr,
    "mensagem" : mensagem,
    "divCardBody": divCardBody
  };
}

function appendElements(msgArea, elementos) {
  elementos.divCardBody.appendChild(elementos.divNomeIcons);
  elementos.divCardBody.appendChild(elementos.email);
  elementos.divCardBody.appendChild(elementos.hr);
  elementos.divCardBody.appendChild(elementos.mensagem);
  elementos.divCard.appendChild(elementos.divCardBody);
  msgArea.appendChild(elementos.divCard);
  return msgArea;
}

function deletarTudo() {
  mensagens = [];
  localStorage.setItem("mensagens", JSON.stringify(mensagens));
  localStorage.setItem("idDisponivel", 0);

  let divMsgArea = document.getElementById("msg-area");
  divMsgArea.innerHTML = '';
}

function atualizarMensagens() {
  let mensagens = JSON.parse(localStorage.getItem("mensagens"));
  let msgArea = document.getElementById("msg-area");
  msgArea.innerHTML = '';
  for (let i = mensagens.length-1; i >= 0 ; i--) {
    const elementos = prepararElementos(i, mensagens);  
    msgArea = appendElements(msgArea, elementos);
  }
}

atualizarMensagens();