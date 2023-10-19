import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


const firebaseConfig = {
  // nice try
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
