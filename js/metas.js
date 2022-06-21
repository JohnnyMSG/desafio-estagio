let inputNovaMeta = document.querySelector('#inputNovaMeta');
let btnAddMeta = document.querySelector('#btnAddMetas');
let listaMetas = document.querySelector('#listaMetas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarMeta = document.querySelector('#btnAtualizarMeta');
let idMetaEdicao = document.querySelector('#idMetaEdicao');
let inputMetaNomeEdicao = document.querySelector('#inputMetaNomeEdicao');

inputNovaMeta.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        let meta = {
            nome: inputNovaMeta.value,
            id: gerarId(), 
        }
        adicionarMeta(meta);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e)=> {
    alternarJanelaEdicao();
});

btnAddMetas.addEventListener('click', (e) => {

        let meta = {
            nome: inputNovaMeta.value,
            id: gerarId(), 
        }
        adicionarMeta(meta);
});

btnAtualizarMeta.addEventListener('click', (e) => {
    e.preventDefault();

    let idMeta = idMetaEdicao.innerHTML.replace('#', '');
    console.log(idMeta)
    let meta = {
        nome: inputMetaNomeEdicao.value, 
        id: idMeta
    }

    let metaAtual = document.getElementById(''+idMeta+'');
    console.log(metaAtual)
    if(metaAtual) {
        let li = criarTagLI(meta);
    listaMetas.replaceChild(li, metaAtual);
    alternarJanelaEdicao();
    } else {
        alert('Elemento Html não encontrado!');
    }
});

function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function adicionarMeta(meta) {
    let li = criarTagLI(meta);
    listaMetas.appendChild(li);
    inputNovaMeta.value = ''; 
}

function criarTagLI(meta) {

    let li = document.createElement('li');
    li.id = meta.id;

    let span = document.createElement('span');
    span.classList.add('textoMeta');
    span.innerHTML = meta.nome;

    let div = document.createElement('div');
    
    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+meta.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+meta.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idMeta) {
    let li = document.getElementById(''+ idMeta +'');
    console.log(li)
    if(li) {
        idMetaEdicao.innerHTML = '#' + idMeta;
        inputMetaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento Html não encontrado!');
    }
}

function excluir(idMeta) {
    let confirmacao = window.confirm('Deseja excluir essa meta? ');
    if(confirmacao) {
        let li = document.getElementById(''+ idMeta +'');
        if(li) {
            listaMetas.removeChild(li);
        } else {
            alert('Elemento Html não encontrado!');
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}
