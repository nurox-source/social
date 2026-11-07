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

// 3. Tab Switcher Logic
function switchForm(tabName) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  if (tabName === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  } else {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
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
