import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD9V6dYyCVBnq2v_rrdb_UXVD6H3ZMiXPo",
    authDomain: "website-4350d.firebaseapp.com",
    projectId: "website-4350d",
    storageBucket: "website-4350d.firebasestorage.app",
    messagingSenderId: "60469440464",
    appId: "1:60469440464:web:b48b852ebfbe914055d3d5",
    measurementId: "G-N212HRSKNP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app); 

const submit = document.getElementById('submit');

submit.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           
            const user = userCredential.user;
            alert("Account created successfully!");
            window.location.href = "index.html"; 
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage); 
        });
});
