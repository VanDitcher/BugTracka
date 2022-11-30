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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const dbRef = getDatabase();

//---------------------------------------------------PROJECT SYSTEM----------------------------------------------------------------

//Project Table Printing Function
async function projectListStartUp(){
  console.log("Building projects...")

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


    let template = `
      <tr id="T${i}">
        <td><p style="font-size: clamp(0.5rem, 0.8vw, 1rem);margin: 0; font-weight: bold; color: #35393F">${projArray[i].title}</p></td>
        <td>${printProjPriority}</td>
        <td><button disabled style="font-size: clamp(5px, 0.8vw, 10px); background-color: #00000000; border: solid; border-color: #1cc88a; color:#1cc88a; border-radius:3px; text-align:center; border-width: 1px;">${projArray[i].start}</button></td>
        <td><button disabled style="font-size: clamp(5px, 0.8vw, 10px); background-color: #00000000; border: solid; border-color: #e74a3b; color:#e74a3b; border-radius:3px; text-align:center; border-width: 1px;">${projArray[i].end}</button></td>
        <td><p style="margin-top: 2px;font-size: clamp(5px, 0.8vw, 19px);">${projArray[i].team}</p></td>
        <td class="text-right"><a id="a view tag" href="#" data-toggle="modal" data-target="#ticketDescModal" style="margin-left: 2px; margin-right: 2px; text-decoration: none;"><button id="viewProjectP${i}" style="font-size: 12px; background-color: #00000000; border: solid; border-color: #1F9EAE; color:#1F9EAE; border-radius:3px; text-align:center; border-width: 1px;"><i class="fas fa-eye" style="color: #1F9EAE;"></i></button></a><a id="a edit tag" href="#" data-toggle="modal" data-target="#projectViewModal" style="margin-left: 2px; margin-right: 2px; text-decoration: none;"><button id="editProjectBtnP${i}" style="font-size: 12px; background-color: #00000000; border: solid; border-color: #858585; color:#858585; border-radius:3px; text-align:center; border-width: 1px;"><i class="fas fa-pen" style="color: #858585;"></i></button></a><button id="deleteProjectP${i}" style="margin-left: 2px; margin-right: 2px; font-size: 12px; background-color: #00000000; border: solid; border-color: #E74A3B; color:#858585; border-radius:3px; text-align:center; border-width: 1px;"><i class="fas fa-trash" style="color: #E74A3B;"></i></button></td>
      </tr>`
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
  let randomIdGen = Math.floor(Math.random() * 99999)
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
    editProjectIndex = event.target.parentElement.id;
    editProjectIndex = editProjectIndex.slice(15,16)
    console.log(editProjectIndex);
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


var projArray = await populateProjArray();

let projectTable = document.getElementById('projectDataTable');
await projectListStartUp();

await deleteProjBtnSetup();

var editProjectIndex = 0;
await editProjBtnSetup();

let projChartVals = [];
ticketDistributionChartSetup()
export {projChartVals}

//--------------------------------------------------------TOP OF DASHBOARD SYSTEM------------------------------------------------------------
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

const tixArray = await populateTixArray();

const userArray = await populateUserArray();

dashCardValues();
