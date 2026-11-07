// 1. Loading Screen Handler
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const authWrapper = document.getElementById('auth-wrapper');

    loadingScreen.style.opacity = '0';
    
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      authWrapper.classList.remove('hidden');
    }, 800); // Fades out completely before showing form
  }, 2200); // 2.2 Seconds loading animation
});

// 2. Tab Switcher Logic (Login / Register)
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

// 3. Form Submit Handlers
function onLoginSubmit(event) {
  event.preventDefault();
  alert('Logging in...');
  // Next step: add navigation to chat.html or main feed
}

function onRegisterSubmit(event) {
  event.preventDefault();
  alert('Registration successful! Please login.');
  switchForm('login');
}
