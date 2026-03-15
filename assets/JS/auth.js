// Switch panels
document.getElementById('go-register').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('panel-login').classList.remove('active');
    document.getElementById('panel-register').classList.add('active');
});

document.getElementById('go-login').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('panel-register').classList.remove('active');
    document.getElementById('panel-login').classList.add('active');
});

// ── Register validation ──
let usernameInput = document.getElementById('register-name');
let userRegex = /^[a-zA-Z]{3,16}$/;

usernameInput.addEventListener('input', function () {
    if (userRegex.test(usernameInput.value)) {
        usernameInput.classList.remove('invalid');
        usernameInput.classList.add('valid');
    } else {
        usernameInput.classList.remove('valid');
        usernameInput.classList.add('invalid');
    }
});

let emailInput = document.getElementById('register-email');
let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.(com|org|eg)$/;

emailInput.addEventListener('input', function () {
    if (emailRegex.test(emailInput.value)) {
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    } else {
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
    }
});

let passwordInput = document.getElementById('register-password');
let confirmPasswordInput = document.getElementById('register-confirm');
let passwordRegex = /^(?=[^A-Z]*[A-Z][^A-Z]*$)(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/;

passwordInput.addEventListener('input', function () {
    if (passwordRegex.test(passwordInput.value)) {
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    } else {
        passwordInput.classList.remove('valid');
        passwordInput.classList.add('invalid');
    }
    confirmPasswordInput.dispatchEvent(new Event('input'));
});

confirmPasswordInput.addEventListener('input', function () {
    if (confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== '') {
        confirmPasswordInput.classList.remove('invalid');
        confirmPasswordInput.classList.add('valid');
    } else {
        confirmPasswordInput.classList.remove('valid');
        confirmPasswordInput.classList.add('invalid');
    }
});

document.getElementById('panel-register').addEventListener('submit', function (e) {
    e.preventDefault();
    if (
        !userRegex.test(usernameInput.value) || !emailRegex.test(emailInput.value) || !passwordRegex.test(passwordInput.value) || confirmPasswordInput.value !== passwordInput.value) {
        alert('Please fix the errors in the form before submitting.');
    } else {
        userData = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Registration successful! You can now log in.');
        document.getElementById('panel-register').classList.remove('active');
        document.getElementById('panel-login').classList.add('active');
    }
});
// ── Login Submit ──
document.getElementById('panel-login').addEventListener('submit', function (e) {
    e.preventDefault();
    let loginEmail = document.getElementById('login-email').value;
    let loginPassword = document.getElementById('login-password').value;
    let savedData = JSON.parse(localStorage.getItem('userData'));

    if (!savedData) {
        alert('No account found. Please register first.');
        return;
    }

    if (loginEmail === savedData.email && loginPassword === savedData.password) {
        window.location.href = 'profile.html';
    } else {
        alert('Incorrect email or password.');
    }
});