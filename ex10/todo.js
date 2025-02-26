
const formRegistrarTodo = document.getElementById("cadastrar-todo");
const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const inputPrioridade = document.getElementById("prioridade");
const tabelaTodos = document.getElementById("tabela-todos");
const pesquisarTodo = document.getElementById("pesquisar-todo");
const API_URL = "http://demo6017341.mockable.io/todo"

function registrarTodo (e) {

    console.log('Enviou');
    
    e.preventDefault();

    const titulo = inputTitulo.value;
    const descricao = inputDescricao.value;
    const prioridade = inputPrioridade.value;

    if(titulo === "" || descricao === "" || prioridade === "") {
        alert("Preencha todos os campos");
        return;
    }

    const novoTodo = {
        titulo,
        descricao,
        prioridade,
        concluida: false
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoTodo)
    })
    .then(response => response.json())
    .then(data => {
        alert("Todo cadastrado com sucesso");
        adicionarLinha(novoTodo)
        formRegistrarTodo.reset();
    })
    .catch(error => console.error(error));

}

function getTodos () {

    fetch(API_URL)
    .then(response => response.json())
    .then(data => criarTodos(data.todos))
    .catch(error => console.error(error));


}

function criarTodos(todos) {


    todos.forEach(todo => adicionarLinha(todo));

    pesquisarTodo.addEventListener("input", (e) => { 
        const busca = e.target.value.toLowerCase();
        tabelaTodos.innerHTML = "";
        todos
          .filter(
            (todo) =>
              todo.titulo.toLowerCase().includes(busca) ||
              todo.descricao.toLowerCase().includes(busca)
          )
          .forEach((todo) => adicionarLinha(todo));
      });

}

function adicionarLinha (todo) {
    const {titulo,prioridade,concluida,descricao} = todo;

    const tr = document.createElement("tr");
        
    tr.innerHTML = `
        <th scope="row">${titulo}</th>
        <td>${descricao}</td>
        <td>${prioridade}</td>
        <td id="finalizar-tarefa" class="fw-bold ${concluida ? "text-success" : "text-danger"}">${concluida ? "Sim" : "Não"}</td>
    `

    const finalizarTarefa = tr.querySelector("#finalizar-tarefa");
    finalizarTarefa.addEventListener("click", () => {
        finalizarTarefa.textContent = finalizarTarefa.textContent === "Sim" ? "Nao" : "Sim";
        if(finalizarTarefa.textContent === "Sim"){
            finalizarTarefa.classList.replace("text-danger","text-success");
        } else {
            finalizarTarefa.classList.replace("text-success","text-danger");
        }
        
        tr.classList.add("disabled")
    })

    tabelaTodos.appendChild(tr);


}


formRegistrarTodo.addEventListener("submit", (e)=> registrarTodo(e));

getTodos();
