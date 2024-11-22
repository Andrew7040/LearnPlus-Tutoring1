// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtE7NstAvAyzQoVUYB0rbOqKiue62H1OQ",
  authDomain: "my-first-project-43826.firebaseapp.com",
  projectId: "my-first-project-43826",
  storageBucket: "my-first-project-43826.appspot.com",
  messagingSenderId: "776042074458",
  appId: "1:776042074458:web:eb20b7eb024c5088c7a363",
  measurementId: "G-MBTZXNM1VV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Utility function to display messages
const showMessage = (message, elementId) => {
  const messageElement = document.getElementById(elementId);
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.style.display = 'block';
  }
};

// Handle sign-up
const signUpButton = document.getElementById('submitSignUp');
if (signUpButton) {
  signUpButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const name = document.getElementById('name').value.trim();
    

    if (!email || !password) {
      showMessage('Email and password are required.', 'signUpMessage');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      const userData = { email };
      await setDoc(doc(db, "users", user.uid), userData);

      showMessage('Account created successfully!', 'signUpMessage');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Email address already exists!', 'signUpMessage');
      } else {
        showMessage('Unable to create account. Please try again.', 'signUpMessage');
      }
      console.error("Error creating account:", error);
    }
  });
}

// Handle login
const loginButton = document.getElementById('submitLogin');
if (loginButton) {
  loginButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
      showMessage('Email and password are required.', 'loginMessage');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage('Login successful!', 'loginMessage');
      setTimeout(() => {
        window.location.href = 'dashboard.html'; // Redirect to dashboard
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        showMessage('Invalid password. Please try again.', 'loginMessage');
      } else if (error.code === 'auth/user-not-found') {
        showMessage('No user found with this email.', 'loginMessage');
      } else {
        showMessage('Unable to login. Please try again.', 'loginMessage');
      }
      console.error("Error logging in:", error);
    }
  });
}
