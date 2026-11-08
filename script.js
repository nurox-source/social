// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeHQHMKOfatuzl-e3a9l3ATxZxCMhJQFo",
  authDomain: "social-app-6cffa.firebaseapp.com",
  projectId: "social-app-6cffa",
  storageBucket: "social-app-6cffa.appspot.com",
  messagingSenderId: "880716821433",
  appId: "1:880716821433:web:714ce9a6df235643527c68",
  measurementId: "G-NKQ7VWR565"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Loaded & Event Listeners Binding
window.addEventListener('DOMContentLoaded', () => {
  // Loading Screen Timer
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const authWrapper = document.getElementById('auth-wrapper');

    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      authWrapper.classList.remove('hidden');
    }, 800);
  }, 2200);

  // Tab Switch Buttons Event Listeners
  document.getElementById('tab-register').addEventListener('click', () => switchForm('register'));
  document.getElementById('tab-login').addEventListener('click', () => switchForm('login'));

  // Google Sign-In Button Event Listener
  document.getElementById('google-btn').addEventListener('click', signInWithGoogle);

  // Form Submits Event Listeners
  document.getElementById('login-form').addEventListener('submit', onLoginSubmit);
  document.getElementById('register-form').addEventListener('submit', onRegisterSubmit);
});

// Custom Alert Box Function
function showAlert(message, type = 'info') {
  const alertBox = document.getElementById('alert-box');
  const alertMsg = document.getElementById('alert-message');

  alertMsg.innerText = message;
  alertBox.className = `alert-box ${type}`;
  alertBox.classList.remove('hidden');

  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3000);
}

// Tab Switcher Logic
function switchForm(tabName) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  if (tabName === 'register') {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
  } else {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  }
}

// Login Submit Logic
function onLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;

  showAlert('Logging in...', 'info');

  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      showAlert('Login successful! Redirecting...', 'success');
      // setTimeout(() => { window.location.href = 'chat.html'; }, 1500);
    })
    .catch((error) => {
      showAlert(error.message, 'error');
    });
}

// Register Submit Logic
function onRegisterSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-password').value;
  const confirmPass = document.getElementById('reg-confirm-password').value;

  if (pass.length < 6) {
    showAlert('Password must be at least 6 characters long!', 'error');
    return;
  }

  if (pass !== confirmPass) {
    showAlert('Passwords do not match!', 'error');
    return;
  }

  showAlert('Creating account...', 'info');

  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      showAlert('Registration successful! Please login.', 'success');
      switchForm('login');
    })
    .catch((error) => {
      showAlert(error.message, 'error');
    });
}

// Google Sign-In Function
function signInWithGoogle() {
  showAlert('Connecting to Google...', 'info');
  
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      showAlert(`Welcome ${user.displayName}! Redirecting...`, 'success');
      // setTimeout(() => { window.location.href = 'chat.html'; }, 1500);
    })
    .catch((error) => {
      showAlert('Google Authentication Failed!', 'error');
      console.error(error);
    });
}
