// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeHQHWkOfaTuzl-e3a0l3ATxZxCBMjQfo",
  authDomain: "social-app-6cffa.firebaseapp.com",
  projectId: "social-app-6cffa",
  storageBucket: "social-app-6cffa.firebasestorage.app",
  messagingSenderId: "880716821433",
  appId: "1:880716821433:web:5553763b63f91e11527c68",
  measurementId: "G-LQGEGHVJL1"
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

    if (loadingScreen && authWrapper) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        authWrapper.classList.remove('hidden');
      }, 800);
    }
  }, 2200);

  // Tab Switch Buttons Event Listeners
  const tabReg = document.getElementById('tab-register');
  const tabLog = document.getElementById('tab-login');
  if (tabReg) tabReg.addEventListener('click', () => switchForm('register'));
  if (tabLog) tabLog.addEventListener('click', () => switchForm('login'));

  // Google Sign-In Button Event Listener
  const googleBtn = document.getElementById('google-btn');
  if (googleBtn) googleBtn.addEventListener('click', signInWithGoogle);

  // Form Submits Event Listeners
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', onLoginSubmit);

  const registerForm = document.getElementById('register-form');
  if (registerForm) registerForm.addEventListener('submit', onRegisterSubmit);
});

// Custom Alert Box Function
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

// Tab Switcher Logic
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

// Login Submit Logic
function onLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;

  showAlert('Logging in...', 'info');

  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      showAlert('Login successful! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'main.html'; }, 1200);
    })
    .catch((error) => {
      showAlert(error.message, 'error');
    });
}

// Register Submit Logic (৬+ অক্ষরের পাসওয়ার্ড চেক শুধু এখানে)
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
      setTimeout(() => { window.location.href = 'main.html'; }, 1200);
    })
    .catch((error) => {
      showAlert('Google Authentication Failed!', 'error');
      console.error(error);
    });
}
