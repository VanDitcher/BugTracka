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

//---------------------------------------------------PROJECT SYSTEM----------------------------------------------------------------

//Project Table Printing Function
function projectListStartUp(userRole){
  console.log("Building projects...")
  var template = ``;

  for (var i = 0; i<projArray.length; i++){
    let printProjPriority = "";
    if (projArray[i].priority == 'high'){
      printProjPriority = `<button disabled style="background-color: #00000000; border: solid; border-color: #e74a3b; color:#e74a3b; border-radius:3px; text-align:center; border-width: 1px;">High</button>`;
    }
    else if(projArray[i].priority == 'mid'){
      printProjPriority = `<button disabled style="background-color: #00000000; border: solid; border-color: #f6c23e; color:#f6c23e; border-radius:3px; text-align:center; border-width: 1px;">Mid</button>`;
    }
    else{
      printProjPriority = `<button disabled style="background-color: #00000000; border: solid; border-color: #1cc88a; color:#1cc88a; border-radius:3px; text-align:center; border-width: 1px;">Low</button>`;
    }

    if (userRole == "admin" || userRole == "pm"){
      template = `
      <tr id="T${i}">
        <td><p style="font-size: clamp(0.5rem, 0.8vw, 1rem);margin: 0; font-weight: bold; color: #35393F">${projArray[i].title}</p></td>
        <td>${printProjPriority}</td>
        <td><button disabled style="font-size: clamp(5px, 0.8vw, 10px); background-color: #00000000; border: solid; border-color: #1cc88a; color:#1cc88a; border-radius:3px; text-align:center; border-width: 1px;">${projArray[i].start}</button></td>
        <td><button disabled style="font-size: clamp(5px, 0.8vw, 10px); background-color: #00000000; border: solid; border-color: #e74a3b; color:#e74a3b; border-radius:3px; text-align:center; border-width: 1px;">${projArray[i].end}</button></td>
        <td><p style="margin-top: 2px;font-size: clamp(5px, 0.8vw, 19px);">${projArray[i].team}</p></td>
        <td class="text-right"><a href="#" id="viewProjectP${i}" data-toggle="modal" data-target="#projectViewModal" style="margin-left: 2px; margin-right: 2px; text-decoration: none;"><button id="viewProjectP${i}" style="padding-left: 2px; padding-right: 2px; padding-top: 0px; padding-bottom: 0px; font-size: 15px; background-color: #00000000; border: solid; border-color: #1F9EAE; color:#1F9EAE; border-radius:3px; text-align:center; border-width: 1px;"><i id="viewProjectP${i}" class="fas fa-eye" style="padding-top: 2px; padding-bottom: 2px; color: #1F9EAE;"></i></button></a><a id="a edit tag" href="#" data-toggle="modal" data-target="#projectEditModal" style="margin-left: 2px; margin-right: 2px; text-decoration: none;"><button id="editProjectBtnP${i}" style="padding-left: 2px; padding-right: 2px; padding-top: 0px; padding-bottom: 0px; font-size: 15px; background-color: #00000000; border: solid; border-color: #858585; color:#858585; border-radius:3px; text-align:center; border-width: 1px;"><i class="fas fa-pen" style="padding-top: 2px; padding-bottom: 2px; color: #858585;"></i></button></a><button id="deleteProjectP${i}" style="padding-left: 2px; padding-right: 2px; padding-top: 0px; padding-bottom: 0px; font-size: 15px; background-color: #00000000; border: solid; border-color: #E74A3B; color:#858585; border-radius:3px; text-align:center; border-width: 1px;"><i class="fas fa-trash" style="padding-top: 2px; padding-bottom: 2px; color: #E74A3B;"></i></button></td>
      </tr>`
    }
    else if(userRole == "dev" || userRole == "submit"){
      template = `
      <tr id="T${i}">
        <td><p style="font-size: clamp(0.5rem, 0.8vw, 1rem);margin: 0; font-weight: bold; color: #35393F">${projArray[i].title}</p></td>
        <td>${printProjPriority}</td>
        <td><button disabled style="font-size: clamp(5px, 0.8vw, 10px); background-color: #00000000; border: solid; border-color: #1cc88a; color:#1cc88a; border-radius:3px; text-align:center; border-width: 1px;">${projArray[i].start}</button></td>
        <td><button disabled style="font-size: clamp(5px, 0.8vw, 10px); background-color: #00000000; border: solid; border-color: #e74a3b; color:#e74a3b; border-radius:3px; text-align:center; border-width: 1px;">${projArray[i].end}</button></td>
        <td><p style="margin-top: 2px;font-size: clamp(5px, 0.8vw, 19px);">${projArray[i].team}</p></td>
        <td class="text-right"><a href="#" id="viewProjectP${i}" data-toggle="modal" data-target="#projectViewModal" style="margin-left: 2px; margin-right: 2px; text-decoration: none;"><button id="viewProjectP${i}" style="padding-left: 2px; padding-right: 2px; padding-top: 0px; padding-bottom: 0px; font-size: 15px; background-color: #00000000; border: solid; border-color: #1F9EAE; color:#1F9EAE; border-radius:3px; text-align:center; border-width: 1px;"><i id="viewProjectP${i}" class="fas fa-eye" style="padding-top: 2px; padding-bottom: 2px; color: #1F9EAE;"></i></button></a></td>
      </tr>`
    }
      projectTable.innerHTML += template;
  }
}

$("#addProjectForm").submit(function(e) {
  //e.preventDefault();
  var addedProjTitle = document.getElementById('projectTitleAdd').value;
  var addedProjPriority = document.getElementById('projectPriorityAdd').value.toLowerCase();
  var addedStartDate = document.getElementById('startDateAdd').value;
  var addedEndDate = document.getElementById('endDateAdd').value;
  var addedProjTeam = document.getElementById('projTeamAdd').value;
  addProject(addedProjTitle, addedProjPriority, addedStartDate, addedEndDate, addedProjTeam);
});
function addProject(projTitle, projPriority, projStartDate, projEndDate, projTeam) {
  let randomIdGen = Date.now();
  if(projTitle == "" || projStartDate == "" || projEndDate == ""){
    alert("Incomplete data, project was not added");
    return 0;
  }
  set(ref(dbRef, 'projects/P' + randomIdGen), {
      id: randomIdGen.toString(),
      title: projTitle,
      priority : projPriority,
      start : projStartDate,
      end : projEndDate,
      team : projTeam
  });
}

//Project Delete Btn Functionality
async function deleteProjBtnSetup(){
  console.log("Delete projects buttons setup...")
  for (var i = 0; i<projArray.length; i++){
    let projDescIndex = i;
    document.getElementById('deleteProjectP' + i).addEventListener("click", deleteProject);
  };
  function deleteProject(){ //transfering desc value to modal body paragraph 
    var projectIndex = event.target.parentElement.parentElement.parentElement.id;
    projectIndex = projectIndex.slice(1,2)
    console.log("Deleting Project P" + projArray[projectIndex].id)
    alert("Deleting Project P" + projArray[projectIndex].id)
    remove(ref(dbRef, 'projects/P' + projArray[projectIndex].id));
    location.reload();
  };
}

function editProjBtnSetup(){
  //Edit Project Functionality
  console.log("Setting up project edit buttons...");
  for (var i = 0; i<projArray.length; i++){
    let projDescIndex = i;
    document.getElementById('editProjectBtnP' + i).addEventListener("click", getEditProjIndex);
  };
  function getEditProjIndex(){ //transfering desc value to modal body paragraph 
    projectPriorityEdit.innerHTML = "";
    projTeamEdit.innerHTML = "";
    editProjectIndex = event.target.parentElement.id;
    editProjectIndex = editProjectIndex.slice(15,16)
    console.log(editProjectIndex);
    if (projArray[editProjectIndex].team == "Coder Jokers"){
      projTeamEdit.innerHTML+=("<option>Coder Jokers</option>");
      projTeamEdit.innerHTML+=("<option>Coder Monkeys</option>");
    }
    else{
      projTeamEdit.innerHTML+=("<option>Coder Monkeys</option>");
      projTeamEdit.innerHTML+=("<option>Coder Jokers</option>");
    }
    if (projArray[editProjectIndex].priority == "high"){
      projectPriorityEdit.innerHTML+=("<option>High</option>");
      projectPriorityEdit.innerHTML+=("<option>Mid</option>");
      projectPriorityEdit.innerHTML+=("<option>Low</option>");
    }
    else if(projArray[editProjectIndex].priority == "mid"){
      projectPriorityEdit.innerHTML+=("<option>Mid</option>");
      projectPriorityEdit.innerHTML+=("<option>High</option>");
      projectPriorityEdit.innerHTML+=("<option>Low</option>");
    }
    else{
      projectPriorityEdit.innerHTML+=("<option>Low</option>");
      projectPriorityEdit.innerHTML+=("<option>Mid</option>");
      projectPriorityEdit.innerHTML+=("<option>High</option>");
    }
  };

  $("#editProjectForm").submit(function(e) {
    //e.preventDefault();
    var edittedProjTitle = document.getElementById('projectTitleEdit').value;
    var edittedProjStart = document.getElementById('startDateEdit').value;
    var edittedProjEnd = document.getElementById('endDateEdit').value;
    var edittedProjPriority = document.getElementById('projectPriorityEdit').value.toLowerCase();
    var edittedProjTeam = document.getElementById('projTeamEdit').value;
    editProject(edittedProjTitle, edittedProjStart, edittedProjEnd, edittedProjPriority, edittedProjTeam)
  });
}
async function editProject(ProjTitle, ProjStart, ProjEnd, ProjPriority, ProjTeam) {
  async function getEditProjDev(key){
    const snapshot = await get(ref(dbRef, 'projects/' + editProjectIndex + key));
    var data = snapshot.val();
    let value = data;
    return value;
  }
  let projTitleOG = projArray[editProjectIndex].title;
  let projStartOG = projArray[editProjectIndex].start;
  let projEndOG = projArray[editProjectIndex].end;
  let projID = projArray[editProjectIndex].id;
  if(ProjTitle == "" && ProjStart == "" && ProjEnd == ""){
    console.log("0 0 0");
    set(ref(dbRef, 'projects/P' + projArray[editProjectIndex].id), {
      end: projEndOG,
      start: projStartOG,
      team : ProjTeam,
      priority : ProjPriority,
      id : projID,
      title : projTitleOG
    });
  }
  else if(ProjTitle == "" && ProjStart == "" && ProjEnd != ""){
    console.log("0 0 1");
    set(ref(dbRef, 'projects/P' + projArray[editProjectIndex].id), {
      end: ProjEnd,
      start: projStartOG,
      team : ProjTeam,
      priority : ProjPriority,
      id : projID,
      title : projTitleOG
    });
  }
  else if(ProjTitle == "" && ProjStart != "" && ProjEnd == ""){
    console.log("0 1 0");
    set(ref(dbRef, 'projects/P' + projArray[editProjectIndex].id), {
      end: projEndOG,
      start: ProjStart,
      team : ProjTeam,
      priority : ProjPriority,
      id : projID,
      title : projTitleOG
    });
  }
  else if(ProjTitle == "" && ProjStart != "" && ProjEnd != ""){
    console.log("0 1 1");
    set(ref(dbRef, 'projects/P' + projArray[editProjectIndex].id), {
      end: ProjEnd,
      start: ProjStart,
      team : ProjTeam,
      priority : ProjPriority,
      id : projID,
      title : projTitleOG
    });
  }
  else if(ProjTitle != "" && ProjStart == "" && ProjEnd == ""){
    console.log("1 0 0");
    set(ref(dbRef, 'projects/P' + projArray[editProjectIndex].id), {
      end: projEndOG,
      start: projStartOG,
      team : ProjTeam,
      priority : ProjPriority,
      id : projID,
      title : ProjTitle
    });
  }
  else if(ProjTitle != "" && ProjStart == "" && ProjEnd != ""){
    console.log("1 0 1");
    set(ref(dbRef, 'projects/P' + projArray[editProjectIndex].id), {
      end: ProjEnd,
      start: projStartOG,
      team : ProjTeam,
      priority : ProjPriority,
      id : projID,
      title : ProjTitle
    });
  }
  else if(ProjTitle != "" && ProjStart != "" && ProjEnd == ""){
    console.log("1 1 0");
    set(ref(dbRef, 'projects/P' + projArray[editProjectIndex].id), {
      end: projEndOG,
      start: ProjStart,
      team : ProjTeam,
      priority : ProjPriority,
      id : projID,
      title : ProjTitle
    });
  }
  else{
    console.log("1 1 1");
    set(ref(dbRef, 'projects/P' + projArray[editProjectIndex].id), {
      end: ProjEnd,
      start: ProjStart,
      team : ProjTeam,
      priority : ProjPriority,
      id : projID,
      title : ProjTitle
    });
  }
}

function ticketDistributionChartSetup(){
  projChartVals = {low: 0, mid: 0, high: 0};
  for (let i = 0; i<projArray.length; i++){
    let priority = projArray[i].priority
    if(priority == "high"){
      projChartVals.high++;
    }
    if(priority == "mid"){
      projChartVals.mid++;
    }
    if(priority == "low"){
      projChartVals.low++;
    }
  }
}

//Ticket View Desc Button Functionality
async function viewProjBtnSetup(){
  console.log("View project buttons setup...")
  for (var i = 0; i<projArray.length; i++){
    let projectDescIndex = i;
    document.getElementById('viewProjectP' + i).addEventListener("click", read_project_desc);
  };
  function read_project_desc(){ //transfering desc value to modal body paragraph 
    var projectIndex = (event.target.id).slice(12,13)
    projectWorkersTable.innerHTML = "";
    projectTicketsTable.innerHTML = "";

    document.getElementById("projectDescriptionHeader").innerHTML = ("Details for Project #" + projArray[projectIndex].id);
    document.getElementById("projectDescriptionSectionTitle").innerHTML = projArray[projectIndex].title;
    document.getElementById("projectDescriptionSectionID").innerHTML = projArray[projectIndex].id;
    let projectPrio = projArray[projectIndex].priority
    projectPrio = projectPrio.charAt(0).toUpperCase() + projectPrio.slice(1);
    document.getElementById("projectDescriptionSectionPriority").innerHTML = projectPrio;
    document.getElementById("projectDescriptionSectionTeam").innerHTML = projArray[projectIndex].team;
    document.getElementById("projectDescriptionSectionStart").innerHTML = projArray[projectIndex].start;
    document.getElementById("projectDescriptionSectionEnd").innerHTML = projArray[projectIndex].end;


    projectWorkersSetup(projectIndex);
    projectTicketsSetup(projectIndex);
  };
  //project worker list building
  function projectWorkersSetup(projectIndex){
    console.log("Building Project Workers...");
    let thisProjectWorker = [];
    for (let i = 0; i<userArray.length; i++){
      if (userArray[i].team == projArray[projectIndex].team){
        thisProjectWorker.push(userArray[i]);
      }
    }
    for (var i = thisProjectWorker.length-1; i>=0; i--){

      let template = `
        <tr>
          <td>${thisProjectWorker[i].name}</td>
          <td>${thisProjectWorker[i].role}</td>
        </tr>`
        projectWorkersTable.innerHTML += template;
    }    
  }
  //project tickets list building
  function projectTicketsSetup(projectIndex){
    console.log("Building Project Tickets...");
    let thisProjectTicket = [];
    for (let i = 0; i<tixArray.length; i++){
      if (tixArray[i].pid == projArray[projectIndex].id){
        thisProjectTicket.push(tixArray[i]);
      }
    }
    for (var i = thisProjectTicket.length-1; i>=0; i--){

      let template = `
        <tr>
          <td>${thisProjectTicket[i].title}</td>
          <td>${thisProjectTicket[i].dev}</td>
          <td>${thisProjectTicket[i].status}</td>
          <td>${thisProjectTicket[i].priority}</td>
          <td>${thisProjectTicket[i].date}</td>
          <td><a id="viewTicketinProjectDescBtnT${i}" href="#" data-toggle="modal" data-target="#projectDescTicketDescModal" style="margin-left: 2px; margin-right: 2px; text-decoration: none;"><button id="viewTicketinProjectDescBtnT${i}" style="font-size: 12px; background-color: #00000000; border: solid; border-color: #1F9EAE; color:#1F9EAE; border-radius:3px; text-align:center; border-width: 1px;"><i id="viewTicketinProjectDescBtnT${i}" class="fas fa-eye" style="color: #1F9EAE;"></i></button></a></td>
        </tr>`
        projectTicketsTable.innerHTML += template;
    }
    function viewTixInProjectDescBtnSetup(){
      console.log("View ticket description buttons setup...")
      for (var i = 0; i<tixArray.length; i++){
        let ticketDescIndex = i;
        document.getElementById('viewTicketinProjectDescBtnT' + i).addEventListener("click", read_ticket_desc);
      };
      function read_ticket_desc(){ //transfering desc value to modal body paragraph 
        console.log(event.target.id);
        let ticketIndex = event.target.id;
        ticketIndex = ticketIndex.slice(27,28)
        console.log(ticketIndex);
        projectDescTicketDesc.innerHTML = tixArray[ticketIndex].desc;
      };
    } 
    if(thisProjectTicket.length > 0){
      viewTixInProjectDescBtnSetup();
    }
  }
}


//Ticket Array Populating
async function populateTixArray(){
  const snapshot = await get(ref(dbRef, 'tickets'));
  var tixArray = [];

  snapshot.forEach(childSnapshot=>{
    tixArray.push(childSnapshot.val());
  });
  return tixArray;
}

//User Array Populating
async function populateUserArray(){
  const snapshot = await get(ref(dbRef, 'users'));
  var userArray = [];

  snapshot.forEach(childSnapshot=>{
    userArray.push(childSnapshot.val());
  });
  return userArray;
}

//Project Array Populating
async function populateProjArray(){
  const snapshot = await get(ref(dbRef, 'projects'));
  var projArray = [];

  snapshot.forEach(childSnapshot=>{
    projArray.push(childSnapshot.val());
  });
  return projArray;
}

const tixArray = await populateTixArray();

const userArray = await populateUserArray();

var projArray = await populateProjArray();

var projectDescTicketDesc = document.getElementById('projectDescTicketDescModalBody');
var projectWorkersTable = document.getElementById('projWorkers-tbody');
var projectTicketsTable = document.getElementById('projectTickets-tbody');
let projectTable = document.getElementById('projects-tbody');
var projectPriorityEdit = document.getElementById('projectPriorityEdit');
var projTeamEdit = document.getElementById('projTeamEdit');
var editProjectIndex = 0;

let projChartVals = [];
ticketDistributionChartSetup()
export {projChartVals}



//--------------------------------------------------------TOP OF DASHBOARD SYSTEM------------------------------------------------------------
//Dashcard Values Setup
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
      projectListStartUp(role);
      deleteProjBtnSetup();
      editProjBtnSetup();
      viewProjBtnSetup();
      $(document).ready(function() {
        $('#projectDataTable').DataTable();
      });
    }
    else if (uid == "zsoy1sPUTfVFZArUl9hzAx0hlM32"){ //Demo Dev Sign in
      var role = "dev";
      document.getElementById('cornerNameDisplay').innerHTML = 'Demo Dev';
      projectListStartUp(role);
      viewProjBtnSetup();
      $(document).ready(function() {
        $('#projectDataTable').DataTable();
      });
    }
    else if (uid == "rQVkk2wA0QbUir3JxCuQBa4s58p1"){ //Demo Submitter Sign in
      var role = "submit";
      document.getElementById('cornerNameDisplay').innerHTML = 'Demo Submitter';
      projectListStartUp(role);
      viewProjBtnSetup();
      $(document).ready(function() {
        $('#projectDataTable').DataTable();
      });
    }
    else if (uid == "OwgqTXwLKMROqL96pTOkgl3MliD2"){ //Demo Project Manager Sign in
      var role = "pm";
      document.getElementById('cornerNameDisplay').innerHTML = 'Demo Project Manager';
      projectListStartUp(role);
      deleteProjBtnSetup();
      editProjBtnSetup();
      viewProjBtnSetup();
      $(document).ready(function() {
        $('#projectDataTable').DataTable();
      });
    }
    else if (uid == "d9dD4AseBYSwRYRxYuoLO2DAZaj1"){ //Michael Vanditch Sign in
      var role = "dev";
      document.getElementById('cornerNameDisplay').innerHTML = 'Michael Vanditch';
      projectListStartUp(role);
      viewProjBtnSetup();
      $(document).ready(function() {
        $('#projectDataTable').DataTable();
      });
    }
    
    // ...
  } else {
    // User is signed out
    // ...
  }
});