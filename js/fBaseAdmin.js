import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, set, child, update, remove, onValue, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
console.log('initializing firebase');
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const dbRef = getDatabase();

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
async function usersListStartUp(){
  console.log("Building users...")

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

    let template = `
      <tr>
        <td><p style="margin: 0; font-weight: bold; color: #35393F">${userArray[i].name}</p></td>
        <td class="text-center"><p style="margin: 0; font-weight: bold; color: #35393F">${userArray[i].projects}</p></td>
        <td class="text-center">${printRole}</td>
        <td class="text-end">
        <a href="#" data-toggle="modal" data-target="#userEditModal" style="margin-left: 2px; margin-right: 2px; text-decoration: none;"><button id="userEditBtnU${i}" style="font-size: 12px; background-color: #00000000; border: solid; border-color: #858585; color:#858585; border-radius:3px; text-align:center; border-width: 1px;"><i class="fas fa-pen" style="color: #858585;"></i></button></a>
        </td>
      </tr>`
      userTable.innerHTML += template;
  }
}

//Edit Ticket Functionality
function editUserBtnSetup(){
  console.log("Setting up edit buttons...");
  for (var i = 0; i<userArray.length; i++){
    let userEditBtnIndex = i;
    document.getElementById('userEditBtnU' + i).addEventListener("click", getEditUserIndex);
  };
  function getEditUserIndex(){ //transfering desc value to modal body paragraph 
    userEditBtnIndex = event.target.parentElement.id;
    userEditBtnIndex = userEditBtnIndex.slice(12,13)
    console.log(userEditBtnIndex);
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
  let userIdOG = userArray[userEditBtnIndex].id;
  let userProjectsOG = userArray[userEditBtnIndex].projects;
  let userTeamOG = userArray[userEditBtnIndex].team;
  
  if(userName == ""){
    set(ref(dbRef, 'users/U' + userArray[userEditBtnIndex].id), {
      id: userIdOG,
      name: userNameOG,
      projects : userProjectsOG,
      role : userRole,
      team : userTeam
    });
  }
  else{
    set(ref(dbRef, 'users/U' + userArray[userEditBtnIndex].id), {
      id: userIdOG,
      name: userName,
      projects : userProjectsOG,
      role : userRole,
      team : userTeam
    });
  }
}

var userArray =  await populateUserArray();

let userTable = document.getElementById('userDataTable');
await usersListStartUp();

var userEditBtnIndex = 0;
editUserBtnSetup();
