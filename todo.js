// const meunIcon = document.querySelector(".menu-icon");
// const closeMeunIcon = document.querySelector(".close-menu");
// function openMenuIcon(){
//     const asideContainer = document.querySelector("aside");
//     asideContainer.classList.add("active");
// }
// function removeMenuIcon(){
//     const asideContainer = document.querySelector("aside");
//     asideContainer.classList.remove("active");
// }
// meunIcon.addEventListener("click", openMenuIcon);
// closeMeunIcon.addEventListener("click", removeMenuIcon);

// function openEditSection(){
//     const editTaskContainer = document.querySelector(".edit-task-container");
//     editTaskContainer.classList.add("active");
// }
// function hideEditSection(){
//     const editTaskContainer = document.querySelector(".edit-task-container");
//     editTaskContainer.classList.remove("active");
// }



// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
// import { getDatabase, ref, push, set, remove, update, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// import { getAuth, signOut, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyAtxBpEXrbpXSuMZTc1jky230C1xF4jL_I",
//     authDomain: "my-todo-app-5170b.firebaseapp.com",
//     projectId: "my-todo-app-5170b",
//     storageBucket: "my-todo-app-5170b.appspot.com",
//     messagingSenderId: "354976643587",
//     appId: "1:354976643587:web:2c4e89baa205d790fdec36",
//     databaseURL: "https://my-todo-app-5170b-default-rtdb.firebaseio.com/" // Added databaseURL
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const auth = getAuth(app);


// function addTask(){
//     const user = auth.currentUser;
//     if (!user) {
//         alert("⚠️ Please log in to to perform any task");
//         window.location.href = "index.html";
//         return;
//     }
//     const responseMsg = document.querySelector(".responds");

//     const taskName = document.getElementById("todo-input").value.trim();

//     if (taskName === "") {
//         responseMsg.classList.remove("hidden");
//         responseMsg.textContent = "Please enter a task!";
//         setTimeout(() => responseMsg.classList.add("hidden"), 2000);
//         return;
//     }

//     const user_Task = {
//         taskInput: taskName
//     };
        
//     push(ref(db, 'user-task/' + user.uid), user_Task)
//     .then(() => {
//         console.log('Task added');
//         responseMsg.textContent = "Added successfully!";
//         setTimeout(() => responseMsg.classList.add("hidden"), 2000);
//         document.getElementById("todo-input").value = "";
//     })
//     .catch((error) => {
//         console.error("Error adding task:", error);
//     });
// }
// document.querySelector('.add-todo-btn').addEventListener("click", addTask);


// function getTasks() {
//     const displayTodo = document.querySelector(".display-todo");
//     displayTodo.innerHTML = ""; // Clear before displaying
//     const user = auth.currentUser;
//     if (!user) return;

//     get(ref(db, 'user-task/' + user.uid)).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();

//             Object.entries(data).forEach(([taskId, taskObj]) => {
//                 const taskElement = document.createElement("li");
//                 taskElement.innerHTML = `
//                     <span>${taskObj.taskInput}</span>
//                     <button class="edit-btn" data-id="${taskId}">Edit</button>
//                     <button class="delete-btn" data-id="${taskId}">Delete</button>
//                 `;
//                 displayTodo.appendChild(taskElement);
//             });

//             // Attach click listeners after rendering
//             document.querySelectorAll(".delete-btn").forEach(button => {
//                 button.addEventListener("click", deleteTask);
//             });

//             document.querySelectorAll(".edit-btn").forEach(button => {
//                 button.addEventListener("click", openEditSection);
//             });
//         }
//     });
// }

// function deleteTask(e) {
//     const taskId = e.target.dataset.id;
//     const user = auth.currentUser;
//     if (!user) return;

//     remove(ref(db, 'user-task/' + user.uid + '/' + taskId))
//     .then(() => {
//         responseMsg.textContent = "Task Deleted";
//         getTasks();
//     })
//     .catch(err => console.error("Delete failed", err));
// }

// function editTask(e) {
//     const editResponse  = document.querySelector(".edit-responds");
//     openEditSection();

//     const taskId = e.target.dataset.id;
//     const user = auth.currentUser;
//     if (!user) return;

//     // Use correct input selector
//     const newTaskName = document.getElementById('edit-task-input').value.trim();

//     if (newTaskName !== "") {
//         update(ref(db, 'user-task/' + user.uid + '/' + taskId), {
//             taskInput: newTaskName
//         }).then(() => {
//             editResponse.textContent = "Task Updated!";
//             getTasks();
//             document.getElementById('edit-task-input').value = '';
//             // hideEditSection();
//         }).catch(err => console.error("Update failed", err));
//     }
// }

// document.querySelector('.edit-btn-list').addEventListener("click", editTask);

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         getTasks();
//     } else {
//         window.location.href = "index.html";
//     }
// });






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