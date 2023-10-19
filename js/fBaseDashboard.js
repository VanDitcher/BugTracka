import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, set, child, update, remove, onValue, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
  // nice try
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const dbRef = getDatabase();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    if (uid == "3XTExdq9ELUSR23RhH3FuwGZvbx1"){
      document.getElementById('adminSideBarButton').innerHTML = `
      <a href="admindash.html">
          <i class="fas fa-user-shield"></i>
          Admin
      </a>
      `;
    }
    // ...
  } else {
    // User is signed out
    // ...
  }
});


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

async function populateUserArray(){
  const snapshot = await get(ref(dbRef, 'users'));
  var userArray = [];

  snapshot.forEach(childSnapshot=>{
    userArray.push(childSnapshot.val());
  });
  return userArray;
}

function dashCardValues(){
  document.getElementById('activeProjectsDashCard').innerHTML = projArray.length;
  document.getElementById('totalTicketsDashCard').innerHTML = tixArray.length;
  document.getElementById('analyticsDashCard').innerHTML = 0;
  document.getElementById('totalUsersCard').innerHTML = userArray.length;
  var unassignedTixCount = 0;
  for(let i = 0; i<tixArray.length; i++){
    if(tixArray[i].dev == "tbd"){
      unassignedTixCount++;
    }
  }
  var totalDevCount = 0;
  for(let i = 0; i<userArray.length; i++){
    if(userArray[i].role == "Developer"){
      totalDevCount++;
    }
  }
  document.getElementById('unassignedTicketsDashCard').innerHTML = unassignedTixCount;
  document.getElementById('totalAssignedTicketsCard').innerHTML = tixArray.length - unassignedTixCount;
  document.getElementById('totalDevelopersCard').innerHTML = totalDevCount;
  document.getElementById('totalNotificationsButton').innerHTML = 0;
  document.getElementById('totalCompanyTicketsButton').innerHTML = tixArray.length;
  document.getElementById('totalCompanyProjectsButton').innerHTML = projArray.length;
  document.getElementById('totalCompanyUsersButton').innerHTML = userArray.length;
}
const tixArray = await populateTixArray();

const projArray = await populateProjArray();

const userArray = await populateUserArray();

dashCardValues();
