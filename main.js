//get all the important elements from our html document
const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

//get the todos for local storage
const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){
    todos.forEach(todo => addTodo(todo))
}

//add event to form to prevent it from auto refreshing and call the addTodo function
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    addTodo();
})

//creating the addTodo function here

function addTodo(todo){
    let todoText = input.value;

    if(todo){
        todoText = todo.text
    }
    
    if(todoText){
        //now creating the li and add the class completed
        const todoEl = document.createElement('li');
        if(todo && todo.completed){
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        // add functionality for toggling the class completed
        todoEl.addEventListener('click', ()=>{
            todoEl.classList.toggle('completed')
            updateLS();
        })

        todoEl.addEventListener('contextmenu', (e)=>{
            e.preventDefault();

            todoEl.remove();
            updateLS();
        })

        todosUL.appendChild(todoEl)
        input.value=''
        updateLS();
    }
}

// creating the function updateLS
function updateLS(){
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl =>{
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })
    
    //setting all the todos in our localstorage
    localStorage.setItem('todos', JSON.stringify(todos))
}