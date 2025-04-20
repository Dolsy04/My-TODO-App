function lightTheme() {
    const light = document.querySelector(".light");

    if (light) {
        light.addEventListener('click', () => {
            document.body.classList.remove('dark-theme');

            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('body-theme', 'dark'); // Save theme preference
            } else {
                localStorage.setItem('body-theme', 'light'); // Save theme preference
            }
        });
    }
}
function darkTheme() {
    const dark = document.querySelector(".dark");

    if (dark) {
        dark.addEventListener('click', () => {
            document.body.classList.add('dark-theme');

            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('body-theme', 'dark'); // Save theme preference
            } else {
                localStorage.setItem('body-theme', 'light'); // Save theme preference
            }
        });
    }
}
function applySavedTheme() {
    const currentTheme = localStorage.getItem('body-theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}
function initializeTheme() {
    applySavedTheme(); // Apply saved theme on page load
    lightTheme();
    darkTheme();
}
initializeTheme();


document.querySelector(".menu-icon").addEventListener("click", () => {
    document.querySelector("aside").classList.add("active");
});
document.querySelector(".close-menu").addEventListener("click", () => {
    document.querySelector("aside").classList.remove("active");
});

const dateAPI = new Date().getFullYear();
document.querySelector(".copyright-year").innerHTML = dateAPI