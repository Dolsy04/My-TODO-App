import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAtxBpEXrbpXSuMZTc1jky230C1xF4jL_I",
    authDomain: "my-todo-app-5170b.firebaseapp.com",
    projectId: "my-todo-app-5170b",
    storageBucket: "my-todo-app-5170b.appspot.com",
    messagingSenderId: "354976643587",
    appId: "1:354976643587:web:2c4e89baa205d790fdec36",
    databaseURL: "https://my-todo-app-5170b-default-rtdb.firebaseio.com/" // Added databaseURL
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Convert image file to Base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("No file provided"));
            return;
        }

        if (!file.type.match('image.*')) {
            reject(new Error("File is not an image"));
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Set profile image in database
async function setProfileImage() {
    const user = auth.currentUser;
    if (!user) {
        alert("⚠️ Please log in to upload a profile picture");
        window.location.href = "index.html";
        return;
    }

    const fileInput = document.getElementById('collect-profile-pic');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("⚠️ Please select an image first");
        return;
    }

    const userImage = fileInput.files[0];

    try {
        const base64Image = await convertToBase64(userImage);
        
        // Check image size (max 1MB)
        // if (base64Image.length > 1 * 1024 * 1024) {
        //     alert("❌ Image is too large (max 1MB)");
        //     return;
        // }

        await set(ref(db, "user-profile-pic/" + user.uid), {
            image: base64Image,
            lastUpdated: Date.now()
        });
        
        alert("✅ Profile picture uploaded successfully");
        updateDisplayedProfileImage(base64Image);
    } catch (error) {
        console.error("Upload error:", error);
        if (error.message.includes("PERMISSION_DENIED")) {
            alert("❌ You don't have permission to upload images");
        } else if (error.message.includes("File is not an image")) {
            alert("❌ Please select a valid image file");
        } else {
            alert("❌ Error uploading profile picture: " + error.message);
        }
    }
}

// Update displayed profile images
function updateDisplayedProfileImage(imageUrl) {
    if (!imageUrl) return;
    
    const profileImages = document.querySelectorAll('.profile-img, .set-profile-img');
    profileImages.forEach(img => {
        img.src = imageUrl;
        img.onerror = () => {
            img.src = './icon-image/default-profile.png';
        };
    });
}

// Load profile image from database
async function loadProfileImage() {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const snapshot = await get(ref(db, "user-profile-pic/" + user.uid));
        if (snapshot.exists()) {
            const data = snapshot.val();
            if (data.image) {
                updateDisplayedProfileImage(data.image);
            }
        }
    } catch (error) {
        console.error("Failed to load profile image:", error);
        if (error.message.includes("PERMISSION_DENIED")) {
            console.warn("User doesn't have permission to view this image");
        }
    }
}


// loadProfileDetails function
async function loadProfileDetails() {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const snapshot = await get(ref(db, 'users/' + user.uid));
        if (snapshot.exists()) {
            const data = snapshot.val();
            if (data) {
                if (data.userName) {
                    document.querySelector('.profile-user-name').textContent = data.userName;
                }
                if (data.email) {
                    document.querySelector('.profile-email').textContent = data.email;
                }
            }
        } else {
            console.log("No user data found");
        }
    } catch (error) {
        console.error("Failed to fetch user information", error);
    }
}
// Initialize event listeners
function initializeProfilePictureHandlers() {
    const uploadBtn = document.querySelector(".set-upload-pic");
    if (uploadBtn) {
        uploadBtn.addEventListener("click", setProfileImage);
    } else {
        console.warn("Upload button not found");
    }

    // Handle auth state changes
    auth.onAuthStateChanged(user => {
        if (user) {
            loadProfileDetails()
            loadProfileImage();
        } else {
            // updateDisplayedProfileImage('./icon-image/default-profile.png');
            window.location.href = "index.html";
        }
    });
}

function logOut(){
    signOut(auth).then(() => {
        window.location.href = "index.html";
      }).catch((error) => {
        alert(error);
      });
}

document.querySelector(".logout-btn").addEventListener("click", logOut);


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProfilePictureHandlers);

function showUploadProfileSection(){
    const showPopup = document.querySelector(".set-profile-container");
    showPopup.classList.add("active");
}
function hideUploadProfileSection(){
    const showPopup = document.querySelector(".set-profile-container");
    showPopup.classList.remove("active");
}

document.querySelector('.Uploadpopup').addEventListener("click", showUploadProfileSection)

document.querySelector('.exit-page').addEventListener("click", hideUploadProfileSection);


document.querySelector(".menu-icon").addEventListener("click", () => {
    document.querySelector("aside").classList.add("active");
});
document.querySelector(".close-menu").addEventListener("click", () => {
    document.querySelector("aside").classList.remove("active");
});