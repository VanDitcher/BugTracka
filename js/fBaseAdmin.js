import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, set, child, update, remove, onValue, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import 'https://code.jquery.com/jquery-3.6.1.min.js';
import '/node_modules/datatables.net/js/jquery.dataTables.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


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
const analytics = getAnalytics(app);
const database = getDatabase(app);
const dbRef = getDatabase();
const auth = getAuth();

//---------------------------------------------------EMPLOYEES SYSTEM----------------------------------------------------------------
async function populateUserArray(){
  const snapshot = await get(ref(dbRef, 'users'));
  var userArray = [];

  snapshot.forEach(childSnapshot=>{
    userArray.push(childSnapshot.val());
  });
  return userArray;
}

//User Table Builder
async function usersListStartUp(userRole){
  console.log("Building users...")
  var template = ``;
  for (var i = 0; i<userArray.length; i++){
    let printRole = "";
    if(userArray[i].role == "Administrator"){
      printRole = `<button disabled style="background-color: #00000000; border: solid; border-color: #00b8c1; color:#00b8c1; border-radius:3px; text-align:center; border-width: 1px;">ADMIN</button>`;
    }
    else if(userArray[i].role == "Project Manager"){
      printRole = `<button disabled style="background-color: #00000000; border: solid; border-color: #11CB6A; color:#11CB6A; border-radius:3px; text-align:center; border-width: 1px;">PM</button>`
    }
    else if(userArray[i].role == "Developer"){
      printRole = `<button disabled style="background-color: #00000000; border: solid; border-color: #6A11CB; color:#6A11CB; border-radius:3px; text-align:center; border-width: 1px;">DEV</button>`
    }
    else if(userArray[i].role == "Submitter"){
      printRole = `<button disabled style="background-color: #00000000; border: solid; border-color: #CB6A11; color:#CB6A11; border-radius:3px; text-align:center; border-width: 1px;">SUBMIT</button>`
    }
    if(userRole == "admin"){
      template = `
      <tr>
        <td><p style="margin: 0; font-weight: bold; color: #35393F">${userArray[i].name}</p></td>
        <td><p style="margin: 0; color: #35393F">${userArray[i].email}</p></td>
        <td><p style="margin: 0; color: #35393F">${userArray[i].team}</p></td>
        <td class="text-center">${printRole}</td>
        <td class="text-end">
        <a href="#" data-toggle="modal" data-target="#userEditModal" style="margin-left: 2px; margin-right: 2px; text-decoration: none;"><button id="userEditBtnU${i}" style="padding-left: 2px; padding-right: 2px; padding-top: 0px; padding-bottom: 0px; font-size: 15px; background-color: #00000000; border: solid; border-color: #858585; color:#858585; border-radius:3px; text-align:center; border-width: 1px;"><i class="fas fa-pen" style="padding-top: 2px; padding-bottom: 2px; color: #858585;"></i></button></a>
        </td>
      </tr>`
    }
    else{
      template = `
      <tr>
        <td><p style="margin: 0; font-weight: bold; color: #35393F">${userArray[i].name}</p></td>
        <td><p style="margin: 0; color: #35393F">${userArray[i].email}</p></td>
        <td><p style="margin: 0; color: #35393F">${userArray[i].team}</p></td>
        <td class="text-center">${printRole}</td>
        <td class="text-end">
        </td>
      </tr>`
    }
    userTable.innerHTML += template;
  }
}

//Edit User Functionality
function editUserBtnSetup(){
  console.log("Setting up user edit buttons...");
  for (var i = 0; i<userArray.length; i++){
    let userEditBtnIndex = i;
    document.getElementById('userEditBtnU' + i).addEventListener("click", getEditUserIndex);
  };
  function getEditUserIndex(){ //transfering desc value to modal body paragraph 
    userEditBtnIndex = event.target.parentElement.id;
    userEditBtnIndex = userEditBtnIndex.slice(12,13)
    var userRoleSelectTable = document.getElementById('userRoleEdit');
    var userTeamSelectTable = document.getElementById('userTeamEdit');
    var userNameInput = document.getElementById('userNameEdit');
    userNameInput.value = userArray[userEditBtnIndex].name;
    if (userArray[userEditBtnIndex].role == "Administrator"){
      userRoleSelectTable.innerHTML = `
      <option>Administrator</option>
      <option>Project Manager</option>
      <option>Developer</option>
      <option>Submitter</option>
      `
    }
    else if (userArray[userEditBtnIndex].role == "Developer"){
      userRoleSelectTable.innerHTML = `
      <option>Developer</option>
      <option>Administrator</option>
      <option>Project Manager</option>
      <option>Submitter</option>
      `
    }
    else if (userArray[userEditBtnIndex].role == "Submitter"){
      userRoleSelectTable.innerHTML = `
      <option>Submitter</option>
      <option>Developer</option>
      <option>Administrator</option>
      <option>Project Manager</option>
      `
    }
    else if(userArray[userEditBtnIndex].role == "Project Manager"){
      userRoleSelectTable.innerHTML = `
      <option>Project Manager</option>
      <option>Submitter</option>
      <option>Developer</option>
      <option>Administrator</option>
      `
    }
    if (userArray[userEditBtnIndex].team == "Coder Monkeys"){
      userTeamSelectTable.innerHTML = `
      <option>Coder Monkeys</option>
      <option>Coder Jokers</option>
      <option>none</option>
      `
    }
    else if (userArray[userEditBtnIndex].team == "Coder Jokers"){
      userTeamSelectTable.innerHTML = `
      <option>Coder Jokers</option>
      <option>Coder Monkeys</option>
      <option>none</option>
      `
    }
    else if (userArray[userEditBtnIndex].team == "none"){
      userTeamSelectTable.innerHTML = `
      <option>none</option>
      <option>Coder Jokers</option>
      <option>Coder Monkeys</option>
      `
    }
  };
  $("#editUserForm").submit(function(e) {
    //e.preventDefault();
    var edittedName = document.getElementById('userNameEdit').value;
    var edittedRole = document.getElementById('userRoleEdit').value;
    var edittedTeam = document.getElementById('userTeamEdit').value;
    editUser(edittedName, edittedRole, edittedTeam)
  });
}
async function editUser(userName, userRole, userTeam) {
  async function getEditTixDev(key){
    const snapshot = await get(ref(dbRef, 'users/U' + userEditBtnIndex + key));
    var data = snapshot.val();
    let value = data;
    return value;
  }
  let userNameOG = userArray[userEditBtnIndex].name;
  let emailOG = userArray[userEditBtnIndex].email;
  let userIdOG = userArray[userEditBtnIndex].id;
  let userProjectsOG = userArray[userEditBtnIndex].projects;
  let userTeamOG = userArray[userEditBtnIndex].team;
  
  set(ref(dbRef, 'users/U' + userArray[userEditBtnIndex].id), {
    email: emailOG,
    id: userIdOG,
    name: userName,
    role : userRole,
    team : userTeam
  });
}

var userArray =  await populateUserArray();

let userTable = document.getElementById('userTable-tbody');

var userEditBtnIndex = 0;


//--------------------------------------------------------TOP OF DASHBOARD SYSTEM------------------------------------------------------------
async function populateTixArray(){
  const snapshot = await get(ref(dbRef, 'tickets'));
  var tixArray = [];

  snapshot.forEach(childSnapshot=>{
    tixArray.push(childSnapshot.val());
  });
  return tixArray;
}

async function populateProjArray(){
  const snapshot = await get(ref(dbRef, 'projects'));
  var projArray = [];

  snapshot.forEach(childSnapshot=>{
    projArray.push(childSnapshot.val());
  });
  return projArray;
}

function dashCardValues(){
  document.getElementById('activeProjectsDashCard').innerHTML = projArray.length;
  document.getElementById('totalTicketsDashCard').innerHTML = tixArray.length;
  document.getElementById('analyticsDashCard').innerHTML = 0;
  var unassignedTixCount = 0;
  for(let i = 0; i<tixArray.length; i++){
    if(tixArray[i].dev == "tbd"){
      unassignedTixCount++;
    }
  }
  document.getElementById('unassignedTicketsDashCard').innerHTML = unassignedTixCount;
  
}

const tixArray = await populateTixArray();

const projArray = await populateProjArray();

dashCardValues();


//--------------------------------------------------------Authentication System---------------------------------------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    if (uid == "3XTExdq9ELUSR23RhH3FuwGZvbx1"){//Demo Admin Sign in
      var role = "admin";
      document.getElementById('adminSideBarButton').innerHTML = `
      <a href="admindash.html">
          <i class="fas fa-user-shield"></i>
          Admin
      </a>
      `;
      document.getElementById('cornerNameDisplay').innerHTML = 'Demo Admin'
      usersListStartUp(role);
      editUserBtnSetup();
      $(document).ready(function() {
        $('#userDataTable').DataTable();
      });
    }
    else{
      var role = "notadmin"
      usersListStartUp(role);
      $(document).ready(function() {
        $('#userDataTable').DataTable();
      });
    }
  } else {
    // User is signed out
    // ...
  }
});