document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Загрузка задач из localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


    function updateTime() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timeString = now.toLocaleTimeString('ru-RU', options);
        document.getElementById('currentTime').textContent = timeString;
    }
    // Обновление времени каждую секунду
    setInterval(updateTime, 1000);
    // Первичное обновление
    updateTime();
    
    // Функция для отображения задач
    function displayTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerText = task.description;
            if (task.completed) {
                li.classList.add("completed");
            }

            // Отметка задачи как выполненной
            li.onclick = () => {
                toggleTaskCompletion(task.id);
            };

            // Кнопка удаления задачи
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Удалить";
            deleteBtn.onclick = (event) => {
                event.stopPropagation(); // Предотвращаем всплытие события клика
                deleteTask(task.id);
            };

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }


    // Функция для добавления задачи
    function addTask() {
        const taskDescription = taskInput.value.trim();
        if (taskDescription) {
            const newTask = {
                id: Date.now(),
                description: taskDescription,
                completed: false
            };
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";


            displayTasks();
        }
    }

    // Функция для переключения состояния задачи (выполнена/не выполнена)
    function toggleTaskCompletion(id) {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }

    // Функция для удаления задачи
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }

    addTaskBtn.addEventListener("click", addTask);

    // Отображение задач при загрузке страницы
    displayTasks();
});
