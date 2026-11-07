// Firebase SDK Imports (ES Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeHQHMKOfatuzl-e3a9l3ATxZxCMhJQFo",
  authDomain: "social-app-6cffa.firebaseapp.com",
  projectId: "social-app-6cffa",
  storageBucket: "social-app-6cffa.appspot.com",
  messagingSenderId: "880716821433",
  appId: "1:880716821433:web:714ce9a6df235643527c68",
  measurementId: "G-NKQ7VWR565"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 1. Loading Screen Handler
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const authWrapper = document.getElementById('auth-wrapper');

    loadingScreen.style.opacity = '0';
    
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      authWrapper.classList.remove('hidden');
    }, 800);
  }, 2200);
});

// 2. Custom Alert Box Function
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

// 3. Tab Switcher
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

// 4. Form Submit Logic (Firebase Auth Integration)
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
    .then((userCredential) => {
      showAlert('Registration successful! Please login.', 'success');
      switchForm('login');
    })
    .catch((error) => {
      showAlert(error.message, 'error');
    });
}

// 5. Google Sign-In Trigger Function
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

// Make functions globally available for HTML inline events
window.switchForm = switchForm;
window.onLoginSubmit = onLoginSubmit;
window.onRegisterSubmit = onRegisterSubmit;
window.signInWithGoogle = signInWithGoogle;
