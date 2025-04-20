    const popUpSignup = document.querySelector(".sign-up-in");
    const popUpSignin = document.querySelector(".sign-in");
    const forgottenPasswordSection = document.querySelector(".forgotten-password");


    // ============= Function for showing and hiding SIGN-IN, SIGN-UP, RESET-PASSWORD ===============

    function showSignUpSection(){
        const popUpSignup = document.querySelector(".sign-up-in");
        popUpSignup.classList.add("active");
    }
    function hideSignUpSection(){
        const popUpSignup = document.querySelector(".sign-up-in");
        popUpSignup.classList.remove("active");
    }

    document.querySelector(".getStarted").addEventListener("click", showSignUpSection);
    document.querySelector(".close-sign-up").addEventListener("click", hideSignUpSection);

    function showSignInSection(){
        const popUpSignin = document.querySelector(".sign-in");
        popUpSignin.classList.add("active");

        const popUpSignup = document.querySelector(".sign-up-in");
        popUpSignup.classList.remove("active");
    }
    function hideSignInSection1(){
        const popUpSignin = document.querySelector(".sign-in");
        popUpSignin.classList.remove("active");
    }
    function hideSignInSection(){
        const popUpSignin = document.querySelector(".sign-in");
        popUpSignin.classList.remove("active");

        const popUpSignup = document.querySelector(".sign-up-in");
        popUpSignup.classList.add("active");
    }

    document.querySelectorAll(".sign-in-btn").forEach(signupbtn => {
        signupbtn.addEventListener("click", showSignInSection);
    });
    
    document.querySelector(".close-sign-in").addEventListener("click", hideSignInSection1);
    document.querySelector(".sign-up-btn").addEventListener("click", hideSignInSection);

    function showforgottenPassword(){
        const forgottenPasswordSection = document.querySelector(".forgotten-password");
        forgottenPasswordSection.classList.add('active');

        hideSignInSection1();

    }

    function hideforgottenPassword(){
        const forgottenPasswordSection = document.querySelector(".forgotten-password");
        forgottenPasswordSection.classList.remove('active');
    }

    document.querySelector('.reset-password').addEventListener('click', showforgottenPassword);
    document.querySelector(".close-forgotten-password").addEventListener("click", hideforgottenPassword);

    // =============END Function for showing and hiding SIGN-IN, SIGN-UP, RESET-PASSWORD ===============


    // =============Function for showing and hiding PASSWORDS ==============
    const signInToggle = document.querySelector(".sign-in-toggle-icon");
    function signInToggleIcon(){
        const signInPassword = document.getElementById("sign-password");
        const signInToggle = document.querySelector(".sign-in-toggle-icon");

        if (signInPassword) {
            if(signInPassword.type === "password") {
                signInPassword.type = "text";
                signInToggle.src = './icon-image/hide-password.png'
            }else{
                signInPassword.type = "password";
                signInToggle.src = './icon-image/show-password.png'
            }
        }
    }
    signInToggle.addEventListener("click", signInToggleIcon);

    const signUpToggle = document.querySelector(".sign-up-toggle-icon");
    function signUpToggleIcon(){
        const signUpPassword = document.getElementById("password");
        const signUpToggle = document.querySelector(".sign-up-toggle-icon");

        if (signUpPassword) {
            if(signUpPassword.type === "password") {
                signUpPassword.type = "text";
                signUpToggle.src = './icon-image/hide-password.png'
            }else{
                signUpPassword.type = "password";
                signUpToggle.src = './icon-image/show-password.png'
            }
        }
    }
    signUpToggle.addEventListener('click',signUpToggleIcon);

    // =============END Function for showing and hiding  showing and hiding PASSWORDS ===============

    // =============Function for showing and hiding LOADER-CONTAINER, SPINNER, SUCCESSFULL-LOADER, REDIRECTING, ERROR-LOADER==============

    function showLoader(){
        const loader = document.querySelector(".loader-section");
        loader.classList.add("active");
    }
    function hideLoader(){
        const loader = document.querySelector(".loader-section");
        loader.classList.remove("active");
    }

    function showLoadingLoader(){
        const loadingLoader = document.querySelector(".loader-list-container");
        loadingLoader.classList.add("active");
    }
    function hideLoadingLoader(){
        const loadingLoader = document.querySelector(".loader-list-container");
        loadingLoader.classList.remove("active");
    }

    function showSuccssfullLoader(){
        const loadingLoader2 = document.querySelector(".loader-list-2-container");
        loadingLoader2.classList.add("active");


        const countdownElement = document.querySelector('.redirecting-count');
            
        let countdown = 5;
        
        const countdownInterval = setInterval(() => {
            countdown--;
            
            countdownElement.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                window.location.href = 'todo.html';
            }
        }, 1000);
    }
    function hideSuccssfullLoader(){
        const loadingLoader2 = document.querySelector(".loader-list-2-container");
        loadingLoader2.classList.remove("active");
    }

    function showErrorLoader(){
        const loadingLoader3 = document.querySelector(".loader-list-3-container");
        loadingLoader3.classList.add("active");
    }
    function hideErrorLoader(){
        const loadingLoader3 = document.querySelector(".loader-list-3-container");
        loadingLoader3.classList.remove("active");
    }

    function exitButton(){
        hideErrorLoader();
        hideSuccssfullLoader();
        hideLoadingLoader();
        hideLoader();
    }

    document.querySelector('.exit').addEventListener("click", exitButton);

    function clearErrorMessages() {
        document.querySelector('.userName-response').innerHTML = "";
        document.querySelector('.email-response').innerHTML = "";
        document.querySelector('.password-response').innerHTML = "";
        document.querySelector('.response-data').innerHTML = "";
    }

    // =============END Function for showing and hiding LOADER-CONTAINER, SPINNER, SUCCESSFULL-LOADER, REDIRECTING, ERROR-LOADER ===============


    window.addEventListener("dblclick", (e)=>{
        if(e.target === popUpSignup){
            hideSignUpSection();
        }
        if(e.target === popUpSignin){
            hideSignInSection1();
        }
        if(e.target === forgottenPasswordSection){
            hideforgottenPassword();
        }
    });


    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

    import { getDatabase, ref, set, get,  child, remove, update } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

    const firebaseConfig = {
        apiKey: "AIzaSyAtxBpEXrbpXSuMZTc1jky230C1xF4jL_I",
        authDomain: "my-todo-app-5170b.firebaseapp.com",
        projectId: "my-todo-app-5170b",
        storageBucket: "my-todo-app-5170b.firebasestorage.app",
        messagingSenderId: "354976643587",
        appId: "1:354976643587:web:2c4e89baa205d790fdec36"
    };


    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const auth = getAuth(app);


    //========fuction to create account======
    function createAccount(){
        const email = document.getElementById('email').value.trim();

        const password = document.getElementById('password').value.trim();

        const userName = document.getElementById('username').value.trim();

        clearErrorMessages();
        
        if (!validate_field(userName)) {
            document.querySelector('.userName-response').innerHTML = "Username is required*";
            return;
        }
        if (!validate_email(email)) {
            document.querySelector('.email-response').innerHTML = "A valid email is required*";
            return;
        }
        if (!validate_password(password)) {
            document.querySelector('.password-response').innerHTML = "Password must be at least 6 characters long*";
            return;
        }
               

        showLoader();
        showLoadingLoader();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;

        const  user_data = {
            uid:user.uid,
            email: email,
            password: password,
            userName: userName,
        }
        set(ref(db, 'users/' + user.uid), user_data)
            .then(() => {
                console.log("User created successfully");

                hideLoadingLoader();
                showSuccssfullLoader();

                document.getElementById('email').value = ""
                document.getElementById('password').value = "";
                document.getElementById('username').value = "";
            }).catch((err) => {
                document.querySelector('.response-data').innerHTML = ("Error saving users data" + errorMessage);
                hideSuccssfullLoader();
                hideLoadingLoader();
                showErrorLoader();
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Firebase signup error:", errorCode, errorMessage);
            document.querySelector('.response-data').innerHTML = (errorMessage)
            hideSuccssfullLoader();
            hideLoadingLoader();
            showErrorLoader();
        }); 
    }
    document.querySelector('.create-acct-btn').addEventListener("click", createAccount);
    // ========End of create Account function=========


    //========fuction to sign in======

    function signIn() {
        const email = document.getElementById('sign-in-identifier').value.trim();
        const password = document.getElementById('sign-password').value.trim();
    
        clearErrorMessages();

        if (!validate_email(email)) {
            document.querySelector('.email-sign-in-response').innerHTML = "A valid email is required*";
            return;
        }
        if (!validate_password(password)) {
            document.querySelector('.password-sign-in-response').innerHTML = "Input your password*";
            return;
        }
    
        showLoader();
        showLoadingLoader();
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            hideLoadingLoader();
            showSuccssfullLoader();
            document.getElementById('sign-in-identifier').value = "";
            document.getElementById('sign-password').value = "";
        })
        .catch((error) => {
        console.error("Login error:", error.message);
        document.querySelector('.response-data').innerHTML = "Invalid email or password";
        hideLoadingLoader();
        showErrorLoader();
    });
    }
    document.querySelector('.login-btn').addEventListener('click', signIn);

    // ========End of sign in function=========

    //========fuction to reset password=======

    function resetPassword() {
        const email = document.getElementById('forgotten-password-input').value.trim();
        const responseEl = document.querySelector('.sent-email-response');
        const feedbackEl = document.querySelector('.forgotten-password-response');
    
        // Clear previous messages
        feedbackEl.innerHTML = "";
        responseEl.innerHTML = "";
    
        // Validate email format
        if (!validate_email(email)) {
            feedbackEl.innerHTML = "A valid email is required*";
            return;
        }
    
        showLoader();
        showLoadingLoader();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                hideLoader();
                hideLoadingLoader();
                responseEl.innerHTML = `
                    <strong>If an account with the email ${email} exists,</strong> 
                    <p>a password reset link has been sent to this ${email}. Please check your inbox or spam folder.</p>
                `;
                responseEl.style.color = "green";
                document.getElementById('forgotten-password-input').value = "";
            })
            .catch((error) => {
                hideLoader();
                hideLoadingLoader();
    
                let message = "Error sending reset link. Please try again.";
                if (error.code === 'auth/user-not-found') {
                    message = "No account found with this email address.";
                } else if (error.code === 'auth/too-many-requests') {
                    message = "Too many attempts. Please try again later.";
                }
    
                responseEl.innerHTML = message;
                responseEl.style.color = "red";
            });
    }
    document.querySelector(".reset-btn").addEventListener("click", resetPassword);

    // ========End of sign in function=========

    
    //========fuction to validate inputs=======
    
    function validate_email(email) {
        const expression = /^[^@]+@\w+(\.\w+)+\w$/;
        return expression.test(email);
    }
    function validate_password(password) {
        return password.length >= 6;
    }
    function validate_field(field) {
        return field !== null && field.length > 0;
    }

    // ========End of input validation function=========


    //========fuction to remove response when inputs recevice data=======
    document.getElementById('username').addEventListener('input', () => {
        if (document.getElementById('username').value.trim().length > 2) {
            document.querySelector('.userName-response').innerHTML = "";
        }
    });
    document.getElementById('email').addEventListener('input', () => {
        if (document.getElementById('email').value.trim().length > 2) {
            document.querySelector('.email-response').innerHTML = "";
        }
    });
    document.getElementById('password').addEventListener('input', () => {
        if (document.getElementById('password').value.trim().length >= 6) {
            document.querySelector('.password-response').innerHTML = "";
        }
    });

    document.getElementById('sign-in-identifier').addEventListener('input', () => {
        if (document.getElementById('sign-in-identifier').value.trim().length > 2) {
            document.querySelector('.email-sign-in-response').innerHTML = "";
        }
    });
    document.getElementById('sign-password').addEventListener('input', () => {
        if (document.getElementById('sign-password').value.trim().length >= 6) {
            document.querySelector('.password-sign-in-response').innerHTML = "";
        }
    });

    document.getElementById('forgotten-password-input').addEventListener('input', () => {
        if (document.getElementById('forgotten-password-input').value.trim().length > 2) {
            document.querySelector('.forgotten-password-response').innerHTML = "";
        }
    });

    //========End fuction to remove response when inputs recevice data=======