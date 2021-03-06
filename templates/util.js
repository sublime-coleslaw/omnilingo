
function changeLanguage(elem) {
   console.log('changeLanguage: ' + elem.value);
   localStorage.setItem('currentLanguage', elem.value);
   localStorage.setItem('responses', Array());
   location.reload(); 
}


function changeLevel(elem) {
   console.log('changeLevel: ' + elem.value);
   localStorage.setItem('currentLevel', elem.value);
   location.reload(); 
}

function getLanguages() {
    // Creates the language selection dialogue
    console.log('getLanguages()');
    languageSelector = document.getElementById('languages');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_languages');
    xhr.onload = function() {
        res = JSON.parse(xhr.responseText);
        languages = res["languages"];
        for(var i = 0; i < languages.length; i++) {
            var language = document.createElement("option");
            var languageText = document.createTextNode(languages[i]);
            if(localStorage.getItem('currentLanguage') == languages[i]) {
                language.setAttribute("selected","");
            }
            language.setAttribute("value", languages[i]);
            language.appendChild(languageText);
            languageSelector.appendChild(language);
        } 
    };
    xhr.send();
}

function getRandomInt(min, max) {
    // Generate a pseudo-random integer between min and max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function globalKeyDown(e) {
    console.log('globalKeyDown() ' + e.key);

    if(e.key == 'Tab') {
      // Play and focus textbox
      console.log('TAB');
      var player = document.getElementById('player');
      player.play();
    }
    if(e.key == ' ') {
      // Next clip
      location.reload();
    }
}

function clearFeedback() {
    console.log('clearFeedback()');
    var myNode = document.getElementById("feedback");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function drawFeedback() {
    feedback = document.getElementById('feedback');
    responses = localStorage.getItem('responses');
    console.log('drawFeedback() ' + responses);
    for(var i = 0; i < 10; i++) {
        span = document.createElement('span');
        if(responses[i] == '-') {
            t = document.createTextNode(' ✘ ');
            span.setAttribute("style", "padding:2px;align:center;color:red; border: 1px solid black");
            span.appendChild(t);
        } else if(responses[i] == '+') {
            t = document.createTextNode(' ✔ ');
            span.setAttribute("style", "padding:2px;align:center;color:green; border: 1px solid black");
            span.appendChild(t);
        } else {
            t = document.createTextNode(' ? ');
            span.setAttribute("style", "padding:2px;align:center;color:white; border: 1px solid black");
            span.appendChild(t);
        }
        feedback.appendChild(span);
        padding = document.createElement('span');
        padding.setAttribute('style', 'width: 20px');
        t = document.createTextNode(' ');
        padding.appendChild(t);
        feedback.appendChild(padding);
    }
}




function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function randomSort(a, b) {  
  return Math.random();
}  


function shuffleArray(array) {
   let curId = array.length;
   // There remain elements to shuffle
   while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
   }
   return array;
}


