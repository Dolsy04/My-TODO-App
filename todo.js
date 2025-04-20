import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, push, remove, update, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAtxBpEXrbpXSuMZTc1jky230C1xF4jL_I",
    authDomain: "my-todo-app-5170b.firebaseapp.com",
    projectId: "my-todo-app-5170b",
    storageBucket: "my-todo-app-5170b.appspot.com",
    messagingSenderId: "354976643587",
    appId: "1:354976643587:web:2c4e89baa205d790fdec36",
    databaseURL: "https://my-todo-app-5170b-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

let currentEditTaskId = null;

// ✅ Menu Toggle
document.querySelector(".menu-icon").addEventListener("click", () => {
    document.querySelector("aside").classList.add("active");
});
document.querySelector(".close-menu").addEventListener("click", () => {
    document.querySelector("aside").classList.remove("active");
});

// ✅ Show/Hide Edit Section
function openEditSection(taskId, currentText) {
    document.querySelector(".edit-task-container").classList.add("active");
    document.getElementById("edit-task-input").value = currentText;
    currentEditTaskId = taskId;
}
function hideEditSection() {
    document.querySelector(".edit-task-container").classList.remove("active");
    document.getElementById("edit-task-input").value = "";
    currentEditTaskId = null;
}

// ✅ Add Task
function addTask() {
    const user = auth.currentUser;
    const taskInput = document.getElementById("todo-input");
    const responseMsg = document.querySelector(".responds");

    if (!user) return alert("Please log in.");

    const taskName = taskInput.value.trim();
    if (taskName === "") {
        responseMsg.textContent = "Please enter a task!";
        responseMsg.classList.remove("hidden");
        setTimeout(() => responseMsg.classList.add("hidden"), 2000);
        return;
    }

    const newTask = { taskInput: taskName };
    push(ref(db, `user-task/${user.uid}`), newTask)
        .then(() => {
            responseMsg.textContent = "Added successfully!";
            responseMsg.classList.remove("hidden");
            setTimeout(() => responseMsg.classList.add("hidden"), 2000);
            taskInput.value = "";
            getTasks();
        });
}
document.querySelector(".add-todo-btn").addEventListener("click", addTask);

// ✅ Load Tasks
function getTasks() {
    const displayTodo = document.querySelector(".display-todo");
    displayTodo.innerHTML = "";
    const user = auth.currentUser;
    if (!user) return;

    get(ref(db, `user-task/${user.uid}`)).then(snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            Object.entries(data).forEach(([taskId, taskObj]) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div class="task-details-list">
                    <div class="task-name-container">
                        <span>${taskObj.taskInput}</span>
                    </div>
                        <div class="task-details-list-button">
                            <button class="edit-btn" data-id="${taskId}" data-task="${taskObj.taskInput}">Edit</button>
                            <button class="delete-btn" data-id="${taskId}">Delete</button>
                        </div>
                    </div>
                `;
                displayTodo.appendChild(li);
            });

            document.querySelectorAll(".delete-btn").forEach(btn =>
                btn.addEventListener("click", deleteTask)
            );

            document.querySelectorAll(".edit-btn").forEach(btn =>
                btn.addEventListener("click", (e) => {
                    const taskId = e.target.dataset.id;
                    const taskText = e.target.dataset.task;
                    openEditSection(taskId, taskText);
                })
            );
        }
    });
}

// ✅ Delete Task
function deleteTask(e) {
    const taskId = e.target.dataset.id;
    const user = auth.currentUser;
    const responseMsg = document.querySelector(".responds");
    if (!user) return;

    remove(ref(db, `user-task/${user.uid}/${taskId}`))
        .then(() => {
            responseMsg.textContent = "Task Deleted";
            responseMsg.classList.remove("hidden");
            setTimeout(() => responseMsg.classList.add("hidden"), 2000);
            getTasks();
        })
        .catch(err => console.error("Delete failed:", err));
}

// ✅ Edit Task Submit
function editTask() {
    const user = auth.currentUser;
    const editInput = document.getElementById("edit-task-input");
    const newText = editInput.value.trim();
    const editResponse = document.querySelector(".edit-responds");

    if (!user || !currentEditTaskId || newText === "") return;

    update(ref(db, `user-task/${user.uid}/${currentEditTaskId}`), {
        taskInput: newText
    }).then(() => {
        editResponse.textContent = "Task Updated!";
        editResponse.classList.remove("hidden");
        setTimeout(() => editResponse.classList.add("hidden"), 2000);
        getTasks();
        hideEditSection();
    }).catch(err => console.error("Update failed:", err));
}
document.querySelector(".edit-btn-list").addEventListener("click", editTask);

// ✅ Auth Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        getTasks();
    } else {
        window.location.href = "index.html";
    }
});

function logOut(){
    signOut(auth).then(() => {
        window.location.href = "index.html";
      }).catch((error) => {
        alert(error);
      });
}

document.querySelector(".logout-btn").addEventListener("click", logOut);