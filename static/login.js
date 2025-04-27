const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// Firebase Config - replace with your actual project config
const firebaseConfig = {
    apiKey: "AIzaSyDFNDjwYaU50e25WWTGKR2EtpUE72ZTYlI",
    authDomain: "career-dbb02.firebaseapp.com",
    projectId: "career-dbb02",
    storageBucket: "career-dbb02.firebasestorage.app",
    messagingSenderId: "390204967097",
    appId: "1:390204967097:web:832c960fed7d548e54b368",
    measurementId: "G-421E8PWPY7"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // Login form handler
  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Login successful!");
        // Optionally redirect to chatbot page
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  });

  // Register form handler
  const registerForm = document.querySelector('.register-form');
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Registration successful!");
      })
      .catch((error) => {
        alert("Registration failed: " + error.message);
      });
  });