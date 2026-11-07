// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// Check if user is already logged in (Auto-login / Session save)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // যদি অলമേডি লগইন করা থাকে, তবে সরাসরি main.html এ পাঠিয়ে দিবে (যাতে বারবার লগইন না করতে হয়)
    if (window.location.pathname.includes('rglg.html') || window.location.pathname.endsWith('/')) {
      window.location.href = 'main.html';
    }
  }
});

// DOM Loaded & Event Listeners
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
  }, 2200);

  const tabRegister = document.getElementById('tab-register');
  const tabLogin = document.getElementById('tab-login');
  if (tabRegister) tabRegister.addEventListener('click', () => switchForm('register'));
  if (tabLogin) tabLogin.addEventListener('click', () => switchForm('login'));

  const googleBtn = document.getElementById('google-btn');
  if (googleBtn) googleBtn.addEventListener('click', signInWithGoogle);

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
    .then((result) => {
      showAlert('Login successful! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'main.html'; }, 1200);
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

  if (pass !== confirmPass) {
    showAlert('Passwords do not match!', 'error');
    return;
  }

  showAlert('Creating account...', 'info');

  createUserWithEmailAndPassword(auth, email, pass)
    .then((result) => {
      showAlert('Registration successful! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'main.html'; }, 1200);
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
