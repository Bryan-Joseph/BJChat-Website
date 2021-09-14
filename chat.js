// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEyE-FPtfOZIsXH0DqfNehmmNSjH3rCWo",
  authDomain: "chat-website-34a33.firebaseapp.com",
  databaseURL: "https://chat-website-34a33-default-rtdb.firebaseio.com",
  projectId: "chat-website-34a33",
  storageBucket: "chat-website-34a33.appspot.com",
  messagingSenderId: "201368676960",
  appId: "1:201368676960:web:54b5747cbefe5a4b027105"
};

var message ;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

var userName = localStorage.getItem("user-name");
var roomName = localStorage.getItem("room-name");

console.log(database);

update(ref(database, "/" + roomName), {
  purpose: 'adding room name'
});



onload = function () {
  console.log("performing get function");
  onValue(ref(database, "/" + roomName), function (snapshot) {
    document.getElementById("chatMessageDiv").innerHTML = '';
    snapshot.forEach(function (snap) {
      var snapK = snap.key;
      var snapD = snap.val();
      console.log("snapK: " + snapK);
      console.log("snapD: " + snapD);
      
      if (snapK != 'purpose') {
        var name = snapD['userName'];
        var message = snapD['message'];
        console.log("name: " + name + "   " + "message: " + message);

        var result = "<div class='prop'><h3 class='d-inline-block'>" + name + "  <img src='tick.png' class='tick'></h3><button  id='" + message + "' data-message='"+message+"' class='speak'><i class='fa fa-volume-up' aria-hidden='true'></i></button><p>" + message + "</p></div><br><br>";
        document.getElementById("chatMessageDiv").innerHTML += result;
            
      }
    });
  });
}

document.addEventListener("click" , e =>{
  console.log(e.target);
  if (e.target.matches("button")) {
    console.log("clicking a buttton");
    var dataset = e.target.dataset.message;
    console.log("dataset : " + dataset);

    var synth = window.speechSynthesis;
    var speechtoSay = new SpeechSynthesisUtterance(dataset);

    synth.speak(speechtoSay);

  }else if(e.target.matches("i")){
    var dataset = e.target.parentElement.dataset.message;
    console.log("datasets: " + dataset);

    var synth = window.speechSynthesis;
    var speechtoSay = new SpeechSynthesisUtterance(dataset);
    synth.speak(speechtoSay);
  }
});

var SRecog = window.webkitSpeechRecognition;
var recog = new SRecog();

document.getElementById("micButton").onclick = function () {
  recog.start();
}

recog.onresult = function (e){
  console.log(e);
  var contents = e.results[0][0].transcript;
  console.log(contents);

  document.getElementById("input").value += contents+ " ";
}


function speak(speech) {
  var synth = window.speechSynthesis;
  var speechtoSay = new SpeechSynthesisUtterance(speech);

  synth.speak(speechtoSay);
  console.log("                      " + speechtoSay);

  console.log(synth);
}

console.log(recog);



document.getElementById("sendButton").onclick = function () {
  var input = document.getElementById("input").value;
  if (input != '') {
    push(ref(database, "/" + roomName), {
      message: input,
      userName: userName
    });
    document.getElementById("input").value = '';
  }

}