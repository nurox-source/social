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

// 2. Custom Alert Box Function (Replaces alert())
function showAlert(message, type = 'info') {
  const alertBox = document.getElementById('alert-box');
  const alertMsg = document.getElementById('alert-message');

  alertMsg.innerText = message;
  alertBox.className = `alert-box ${type}`;
  alertBox.classList.remove('hidden');

  // Auto Hide after 3 Seconds
  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3000);
}

// 3.Tab Switcher (Register Default)
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

// 4. Form Submit Logic with Custom Alerts
function onLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;

  if (pass.length < 6) {
    showAlert('Password must be at least 6 characters long!', 'error');
    return;
  }

  showAlert('Login successful! Redirecting...', 'success');
  // Next Step: Redirect to chat.html
}

function onRegisterSubmit(event) {
  event.preventDefault();
  const pass = document.getElementById('reg-password').value;
  const confirmPass = document.getElementById('reg-confirm-password').value;

  if (pass !== confirmPass) {
    showAlert('Passwords do not match!', 'error');
    return;
  }

  showAlert('Registration successful! Please login.', 'success');
  switchForm('login');
}

// 5. Google Sign-In Click Trigger
function signInWithGoogle() {
  showAlert('Connecting to Google Sign-In...', 'info');
  // Backend Integration Code goes here
}
// Firebase SDK Imports (ES Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration (Firebase কনসোল থেকে পাওয়া)
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

// Google Sign-In Trigger Function
function signInWithGoogle() {
  showAlert('Connecting to Google...', 'info');
  
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      showAlert(`Welcome ${user.displayName}! Redirecting...`, 'success');
      
      // সফলভাবে লগইন হওয়ার পর চ্যাট পেজে পাঠাতে চাইলে:
      // setTimeout(() => { window.location.href = 'chat.html'; }, 1500);
    })
    .catch((error) => {
      showAlert('Google Authentication Failed!', 'error');
      console.error(error);
    });
}
