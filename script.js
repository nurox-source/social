// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeHQHMKOfatuzl-e3a9l3ATxZxCMhJQFo",
  authDomain: "social-app-6cffa.firebaseapp.com",
  projectId: "social-app-6cffa",
  storageBucket: "social-app-6cffa.appspot.com",
  messagingSenderId: "880716821433",
  appId: "1:880716821433:web:714ce9a6df235643527c68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Discord Configuration
const DISCORD_CLIENT_ID = 'YOUR_DISCORD_CLIENT_ID'; // এখানে আপনার Discord Client ID বসান
const REDIRECT_URI = encodeURIComponent(window.location.origin + window.location.pathname.replace('rglg.html', 'main.html'));

// Session Verification on Load
onAuthStateChanged(auth, (user) => {
  if (user) {
    redirectToDashboard();
  }
});

if (localStorage.getItem('discord_token')) {
  redirectToDashboard();
}

function redirectToDashboard() {
  if (window.location.pathname.includes('rglg.html') || window.location.pathname.endsWith('/')) {
    window.location.href = 'main.html';
  }
}

// DOM Event Listeners Initialization
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const authWrapper = document.getElementById('auth-wrapper');

    if (loadingScreen && authWrapper) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        authWrapper.classList.remove('hidden');
      }, 800);
    }
  }, 1200);

  const tabRegister = document.getElementById('tab-register');
  const tabLogin = document.getElementById('tab-login');
  if (tabRegister) tabRegister.addEventListener('click', () => switchForm('register'));
  if (tabLogin) tabLogin.addEventListener('click', () => switchForm('login'));

  const discordBtn = document.getElementById('discord-btn');
  if (discordBtn) discordBtn.addEventListener('click', signInWithDiscord);

  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', onLoginSubmit);

  const registerForm = document.getElementById('register-form');
  if (registerForm) registerForm.addEventListener('submit', onRegisterSubmit);
});

// Toast Alert System
function showAlert(message, type = 'info') {
  const alertBox = document.getElementById('alert-box');
  const alertMsg = document.getElementById('alert-message');
  if (!alertBox || !alertMsg) return;

  alertMsg.innerText = message;
  alertBox.className = `alert-box ${type}`;
  alertBox.classList.remove('hidden');

  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3000);
}

// Tab Switching Mechanism
function switchForm(tabName) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  if (!loginForm || !registerForm) return;

  if (tabName === 'register') {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    if (tabRegister) tabRegister.classList.add('active');
    if (tabLogin) tabLogin.classList.remove('active');
  } else {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    if (tabLogin) tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
  }
}

// Login Handler
function onLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;

  showAlert('Logging in...', 'info');

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      showAlert('Login successful!', 'success');
      setTimeout(() => { window.location.href = 'main.html'; }, 1000);
    })
    .catch((error) => {
      showAlert(error.message, 'error');
    });
}

// Registration Handler
function onRegisterSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-password').value;
  const confirmPass = document.getElementById('reg-confirm-password').value;

  if (pass !== confirmPass) {
    showAlert('Passwords do not match!', 'error');
    return;
  }

  showAlert('Creating account...', 'info');

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => {
      showAlert('Account created successfully!', 'success');
      setTimeout(() => { window.location.href = 'main.html'; }, 1000);
    })
    .catch((error) => {
      showAlert(error.message, 'error');
    });
}

// Discord Sign-In OAuth Flow
function signInWithDiscord() {
  showAlert('Redirecting to Discord...', 'info');
  const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=identify+email`;
  window.location.href = discordAuthUrl;
}
