import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDMwzug_6RzdZ3UVvEjtbDGedpgEHFeN4A",
  authDomain: "bug-tracka.firebaseapp.com",
  databaseURL: "https://bug-tracka-default-rtdb.firebaseio.com",
  projectId: "bug-tracka",
  storageBucket: "bug-tracka.appspot.com",
  messagingSenderId: "64400813098",
  appId: "1:64400813098:web:2f7bb7f5799ec3aaa82753",
  measurementId: "G-JZB8HD7HPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//------------------------------------------------------------LOGIN AUTHENTICATION SYSTEM----------------------------------------------------------------
function loginButtonSetup(){
  document.getElementById('loginPageLoginBtn').addEventListener("click", tryLogin);
  function tryLogin(){
    var enteredEmail = document.getElementById('loginPageEmailInput').value;
    var enteredPassword = document.getElementById('loginPagePasswordInput').value;
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        location.href= '/maindash.html';
        // ...
      })
      .catch((error) => {
        alert("Incorrect Credentials");
      });
  }
}

function demoButtonsSetup(){
  document.getElementById('demoAdminButton').addEventListener("click", demoAdminLogin);
  document.getElementById('demoPMButton').addEventListener("click", demoPMLogin);
  document.getElementById('demoDevButton').addEventListener("click", demoDevLogin);
  document.getElementById('demoSubmitButton').addEventListener("click", demoSubmitLogin);
  function demoAdminLogin(){
    var enteredEmail = "admin@email.com"
    var enteredPassword = "test123"
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      location.href= 'maindash.html';
      // ...
    })
    .catch((error) => {
      alert("Incorrect Credentials");
    });
  }
  function demoPMLogin(){
    var enteredEmail = "pm@email.com"
    var enteredPassword = "test123"
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      location.href= 'maindash.html';
      // ...
    })
    .catch((error) => {
      alert("Incorrect Credentials");
    });
  }
  function demoDevLogin(){
    var enteredEmail = "dev@email.com"
    var enteredPassword = "test123"
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      location.href= 'maindash.html';
      // ...
    })
    .catch((error) => {
      alert("Incorrect Credentials");
    });
  }
  function demoSubmitLogin(){
    var enteredEmail = "submit@email.com"
    var enteredPassword = "test123"
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      location.href= 'maindash.html';
      // ...
    })
    .catch((error) => {
      alert("Incorrect Credentials");
    });
  }
}

loginButtonSetup();
demoButtonsSetup();
