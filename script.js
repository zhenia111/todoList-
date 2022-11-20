

const taskInput = document.querySelector('.message');
const addBtn = document.querySelector('.add');
const todoContainer = document.querySelector('.todo');
//task 1
const longestTaskResult = document.querySelector('.longest__body span');
//task 4
const amountTaskResult = document.querySelector('.amount__body span');

let toDoList = [];

if (localStorage.getItem("toDoList")) {
    toDoList = JSON.parse(localStorage.getItem("toDoList"));
    displayMessages();
    findLongestTask();
    getAmountTask();
}

addBtn.addEventListener('click', () => {
    const newToDoTask = {
        todo: taskInput.value,
        checked: false,
        important: false
    };
    taskInput.value = '';
    toDoList.push(newToDoTask);
    displayMessages();
    findLongestTask();
    getAmountTask();
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
});

todoContainer.addEventListener('change', (event) => {
    let idInput = event.target.getAttribute('id');              //Забираем атрибут id с элемента input. 
    toDoList[idInput].checked = !toDoList[idInput].checked;         //В атрибуте id хранится порядковый номер элемента в массиве
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
});

todoContainer.addEventListener('click', (event) => {
    if (event.target.closest('.list-item__delete-btn')) {
        let idItem = event.target.getAttribute('data-id'); 
        toDoList.splice(idItem, 1); // 
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
        displayMessages();

        //localStorage.setItem("amoutTask", JSON.stringify(amountTaskResult.innerHTML));
        getAmountTask();

        //localStorage.setItem("result", JSON.stringify(longestTaskResult.innerHTML));
        findLongestTask();


        return; //Пишем return чтобы следующий if не выполнялся и не забирала наши вычислительные мощности.
    }
    if (event.target.closest('.list-item__important-btn')) {
        let idItem = event.target.getAttribute('data-id');
        toDoList[idItem].important = !toDoList[idItem].important;
        //task 2
        toDoList.unshift(...toDoList.splice(idItem, 1));
        //toDoList.splice(2,0,toDoList.splice(idItem, 1));
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
        displayMessages();
    }

});

//task 3
const mainHeader = document.querySelector('.todo_list h1');

mainHeader.addEventListener('click', function (event) {
    if (!event.target.classList.contains('h1-red')) {
        event.target.classList.add('h1-red');
    }
    else {
        event.target.classList.remove('h1-red');
    }

    //или можно так 
    // event.target.classList.toggle('h1-red');
});


function displayMessages() {
    let toDoListContent = '';
    toDoList.forEach((item, i) => {
        toDoListContent += `
        <li class="list-item">
            <input type="checkbox" id="${i}" ${item.checked ? 'checked' : ''}>
            <label for="${i}" class="${item.important ? 'important' : ''}">${item.todo}</label>
            <span>
                <button data-id="${i}" class="list-item__btn list-item__important-btn">X</button>
                <button data-id="${i}" class="list-item__btn list-item__delete-btn">Удалить</button>
            </span>
        </li>
        `;
    });
    todoContainer.innerHTML = toDoListContent;
}
// я пытался выдать значение todo в строку Longest string length поэтому и не получалось, а если нужно просто length то все понятно ! 
function findLongestTask() {
    let longestTask = 0;
    //result ='';
    for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].todo.length > longestTask) {
            longestTask = toDoList[i].todo.length;
        }
        
    };

    longestTaskResult.innerHTML = longestTask;
    console.log(longestTaskResult.innerHTML);
}

function getAmountTask() {
    let amountTask = 0;
    amountTask = toDoList.length;
    amountTaskResult.innerHTML = amountTask;
}






//ЗАДАНИЯ
//В задании вы должны будете сделать пару своих html блоков(можно напрямую добавлять в index.html вставлять)
//и с помощью Js менять значение.Красота ваших блоков,которые вы добавили не важна,главное увидеть результат работы js
//1.Под надписью  Longest string length вывести задание (todo) у которой самая большая длина строки
//2.После того как вы отметили ваше ежедневное задание как важное,нужно чтобы выполнялась такая логика


/*
*-Отмечено как важное задание
Было вот так
--123*
--55576676
-2332332
-999
а стало вот так после того как мы отметим пункт 999 как важный 
--123*
-999*
--55576676
-2332332

То есть важные задания перемещаются вверх и показываются одними из первых
(реализация устроит любая,какую придумаете или какую найдёте)

3.При первом нажатии на главную надпись формы "ToDo list - glo.academy" данная надпись меняет цвет на красный,
а при втором нажатии цвет надписи становится прежним,то есть белым
4.Также создать отдельный блок вне формы, в котором будет выводиться количество ежедневных задач ,которое вы себе поставили,
то есть существует такой список ваших дел
--123*
-999*
--55576676
-2332332

Надпись должна показывать цифру 4 сколько соотвественно и задач (если дел в списке ноль,показывать ноль)
*/ 