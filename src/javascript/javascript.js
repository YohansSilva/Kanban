const botao = document.getElementById("adicionar-column");
const main = document.querySelector(".kanban");
const buttonCriarColuna = document.getElementById("confirmar");
const editarColumn = document.querySelectorAll(".editar-column");
let getAntigaDescricao,getAntigoTitle,getCorAntigaCard;
let getTextCard,getDescricaoCard,getRadioCard, dadosCard;
let modoModal = "";
let cardEditando = null;
let columnEditando = null;
let tituloAntigo = "";
let tituloAtual = null;
let corSalva = "";
const modal = document.getElementById("modal-1");
const modalEditar = document.getElementById("modal-2");
const closebutton = document.getElementById('closeButton');
const closeModalEditar = document.getElementById("closeModalEditar");
const cards = document.querySelectorAll(".card-tarefas");

buttonCriarColuna.addEventListener("click",()=>{
   
   const adicionarCardBtn = document.createElement("button");
   adicionarCardBtn.type= "button";
   adicionarCardBtn.innerHTML = "Adicionar Card"
   const novocard = document.createElement("div");
   const novoTitle = document.createElement("div");
   const h2 = document.createElement("h2");
   const button = document.createElement("button");
   const i = document.createElement("i");
   const title = document.getElementById("titulo").value;
   const cor = document.querySelector('input[name="cor"]:checked').value;
   const listaCards = document.createElement("div");

   formNoReset();
 
   adicionarCardBtn.classList.add("adicionar-card");
   novoTitle.classList.add("kanban-title");
   novoTitle.style.borderTop = `solid 2px ${cor}`;
   novocard.classList.add("collunn-kanban");
   button.classList.add("editar-column");
  
   i.classList.add("fa-solid","fa-ellipsis-vertical");
   h2.innerHTML = title;
  
  ativarDrop(novocard);
   
   if(title!=""){
      main.appendChild(novocard);
      novocard.appendChild(novoTitle);
      novocard.appendChild(adicionarCardBtn);
      novoTitle.appendChild(h2);
      novoTitle.appendChild(button);
      button.appendChild(i)
      modal.close();
      
   }else{}
   

});

function formNoReset(){
    let meuForm = document.querySelectorAll("form");

    meuForm.forEach(form =>{
       form.addEventListener("submit", e => {
        e.preventDefault();
    });
    })
}


const addCard = document.getElementById("addCard");
const cancelModal = document.getElementById("cancelarModalCardCreate");
const modalCreateCard = document.querySelector(".modalCreateCard");


cancelModal.addEventListener("click", ()=>{
    modalCreateCard.close();
})

const colunas = document.querySelectorAll(".collunn-kanban");
colunas.forEach(ativarDrop);
let buttonAddCard;

function ativarDrop(elemento) {
   
    elemento.addEventListener("dragover", (e) => {
        e.preventDefault();
        elemento.classList.add("card-hover");
    });

    elemento.addEventListener("dragleave", () => {
        elemento.classList.remove("card-hover");
    });

    elemento.addEventListener("drop", () => {
        elemento.classList.remove("card-hover");
            buttonAddCard = elemento.querySelector(".adicionar-card");
        const card = document.querySelector(".card-tarefas.dragging");
        if (card) {
            elemento.insertBefore(card, buttonAddCard);
        }
    });
}

botao.addEventListener("click", () => {
    document.getElementById("titulo").value = "";
    modal.showModal();
});

closebutton.addEventListener("click", () => {
    modal.close();
});

main.addEventListener("click", (event) => {

    const botaoEditar = event.target.closest(".editar-column");
    const criarCardBtn = event.target.closest(".adicionar-card");
    const btnCardNaColumn = event.target.closest(".editCard");

    if (botaoEditar) {

        columnEditando = botaoEditar.closest(".collunn-kanban");

        tituloAntigo = columnEditando.querySelector("h2").textContent;
        tituloAtual = document.getElementById("tituloedita");

        const corAntiga = columnEditando.querySelector(".kanban-title");
        corSalva = corAntiga.style.borderTopColor;

        tituloAtual.value = tituloAntigo;

        const radio = modalEditar.querySelector(`input[name="cor"][value="${corSalva}"]`);

        if (radio) {
            radio.checked = true;
        }

        formNoReset();
        modalEditar.showModal();
        return;
    }
    
    if (criarCardBtn) {
        columnEditando  = criarCardBtn.closest(".collunn-kanban");
        modoModal = "Criar Card";
        ClearModalCard();
        modalCreateCard.showModal();
        return;
    }

    if(btnCardNaColumn){
         columnEditando  = btnCardNaColumn.closest(".collunn-kanban");
         cardEditando = btnCardNaColumn.closest(".card-tarefas");
         modoModal = "Editar";
         preencherModal();
         modalCreateCard.showModal();
      
    }
});

const btnConfirmaCard = document.getElementById("salvarCard");
const btnSalvar = document.getElementById("salvarEdicao");

btnConfirmaCard.addEventListener("click", () => {

    if (modoModal == "Editar") {
        editarCard();
        console.log("Editar")
    } else {
        criarCard();
        console.log("Criar");

    }

    modalCreateCard.close();
});

function preencherModal(){
    getAntigoTitle = cardEditando.querySelector("h3").innerHTML;
    getAntigaDescricao = cardEditando.querySelector("p").innerHTML;
    getCorAntigaCard = cardEditando.querySelector("i.fa-circle").style.color;
  
    document.getElementById("textCard").value = getAntigoTitle;
    document.getElementById("descricaoCard").value =  getAntigaDescricao;
    document.querySelector(`input[name="inputRadio-card"][value="${getCorAntigaCard}"]`).checked = true;
}

function ClearModalCard(){
        document.getElementById("textCard").value = "";
        document.getElementById("descricaoCard").value = "";
        const radioSelecionado = document.querySelector(
           'input[name="inputRadio-card"]:checked'
        );

       if (radioSelecionado) {
          radioSelecionado.checked = false;
       }
}

function pegarDadosCard(){
    return{
            tituloCard: document.getElementById("textCard").value,
            descricaoCard: document.getElementById("descricaoCard").value,
            RadioCard: document.querySelector('input[name="inputRadio-card"]:checked').value,
    };
}

function editarCard(){
  if(!cardEditando){
        console.log("ERRO - nenhuma coluna selecionada");
        return;
    }
    const ti = cardEditando.querySelector("h3");
    const de = cardEditando.querySelector("p");
    const pr = cardEditando.querySelector("i.fa-circle");
    dadosCard = pegarDadosCard();
    ti.textContent = dadosCard.tituloCard;
    de.textContent = dadosCard.descricaoCard;
    pr.style.color = dadosCard.RadioCard;
}

function criarCard(){
    
    if(!columnEditando){
        console.log("ERRO - nenhuma coluna selecionada");
        return;
    }
    
    dadosCard = pegarDadosCard();
    buttonAddCard = columnEditando.querySelector(".adicionar-card");
    
    let divMainCard = document.createElement("div");
    let headerCard = document.createElement("header");
    let h3 = document.createElement("h3");
    let buttonEditarCard = document.createElement("button");
    let iconEdicao = document.createElement("i");
    let descricao = document.createElement("p");
    let footer = document.createElement("footer");
    let span = document.createElement("span");
    let iconPrioridade = document.createElement("i");
    
    buttonEditarCard.classList.add("editCard");
    buttonEditarCard.type = "button";
    divMainCard.classList.add("card-tarefas");
    headerCard.classList.add("title-card");
    iconEdicao.classList.add("fa-solid","fa-ellipsis-vertical");
    iconPrioridade.classList.add("fa-solid","fa-circle");
   
    iconPrioridade.style.color = dadosCard.RadioCard;
    divMainCard.draggable="true";
    h3.innerText = dadosCard.tituloCard;
    descricao.innerText = dadosCard.descricaoCard;

    columnEditando.insertBefore(divMainCard,buttonAddCard);
    divMainCard.appendChild(headerCard);
    divMainCard.appendChild(descricao);
    divMainCard.appendChild(footer);
    footer.appendChild(span);
    span.appendChild(iconPrioridade);
    headerCard.appendChild(h3);
    headerCard.appendChild(buttonEditarCard);
    buttonEditarCard.appendChild(iconEdicao);

   
    divMainCard.addEventListener("dragstart", arrastar =>{
         arrastar.currentTarget.classList.add('dragging');
    })

    divMainCard.addEventListener("dragend", arrastar =>{
         arrastar.currentTarget.classList.remove('dragging')
    })
       modalCreateCard.close();
      
}



btnSalvar.addEventListener("click", () => {

    if (!columnEditando) return;

    const novo = modalEditar.querySelector(
        'input[name="cor"]:checked'
    ).value;

    const radio = modalEditar.querySelector(
        `input[name="cor"][value="${corSalva}"]`
    );

    if (tituloAtual.value !== tituloAntigo) {

        columnEditando.querySelector("h2").textContent = tituloAtual.value;

    }

    if (novo !== corSalva) {

        columnEditando.querySelector(".kanban-title").style.borderTop =
            `solid 2px ${novo}`;

    } else {
        console.log("Nenhuma cor foi alterada");
    }
    modalEditar.close();
});

closeModalEditar.addEventListener("click", () => {
    modalEditar.close();
});

