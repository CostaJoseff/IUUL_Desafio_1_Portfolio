function criarIconEventList(iconLixo, ID) {
  return function deletarMensagem () {
    let divMsgArea = document.getElementById("msg-area");
    let divCard = iconLixo.parentNode.parentNode.parentNode;
    divMsgArea.removeChild(divCard);

    for (let i = 0; i < mensagens.length; i++) {
      if(mensagens[i].msgID == ID) {
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

function prepararElementos(i, mensagens) {
  let divCard = document.createElement("div");
  divCard.classList = "card mrg-td-p sombra bg-claro"

  let nome = document.createElement("h2");
  nome.classList = "d-inline";
  nome.textContent = mensagens[i].nome;

  let iconLixo = document.createElement("i");
  iconLixo.classList = "bi bi-trash scale-anim-icon pointer altura-icon-lixo";
  iconLixo.addEventListener("click", criarIconEventList(iconLixo, mensagens[i].msgID));

  let divNomeIcons = document.createElement("div");
  divNomeIcons.classList = "d-flex justify-content-between";
  divNomeIcons.appendChild(nome);
  divNomeIcons.appendChild(iconLixo);

  let email = document.createElement("p");
  email.classList = "";
  email.textContent = mensagens[i].email;

  let hr = document.createElement("hr");
  
  let mensagem = document.createElement("p");
  mensagem.classList = "";
  mensagem.textContent = mensagens[i].mensagem;

  let divCardBody = document.createElement("div");
  divCardBody.classList = "inside-box-p";

  return {
    "divCard" : divCard,
    "divNomeIcons" : divNomeIcons,
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