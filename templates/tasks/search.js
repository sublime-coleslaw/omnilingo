function onReadySearch(current_text, distractor) {
/**
 * Core task function for the 'Search' task
 * - Gets a question from the backend
 * - Makes 6 boxes (spans) where 3 are correct and three are incorrect
 * - The boxes are arranged randomly
 */
    console.log('onReadySearch()');

// Specific code starts here
    console.log('distractors:');
    console.log(distractor);
    console.log('current_text:');
    console.log(current_text);

    var pruned_text = Array();
    for(var i = 0; i < current_text.length; i++) { 
        if(current_text[i].match(/\w+/)) {
            pruned_text.push(current_text[i]);
        }
    } 
    console.log('pruned_text:');
    console.log(pruned_text);

    var tb = '';
    var allWords = Array();
    var distractors = Array();
    var repl = Array();
    
    for(var i = 0; i < 3; i++) {
        distractors.push(getRandomInt(0,distractor.length - 1));
        repl.push(getRandomInt(0,pruned_text.length - 1));
    }
  
    console.log('distractors:');
    console.log(distractors);
    console.log('repl:');
    console.log(repl);

    var replacements = pruned_text.slice(); 
    for(var i = 0; i < 3; i++) {
        var d = distractors[i];
        console.log('d: ' + d);
        // FIXME: We need an API change here, we need to be able to get more than one distractor
        var word = pruned_text[repl[i]];
        console.log('word: ' + word);
        replacements = arrayRemove(replacements, word);
        var tw = '<span onClick="checkInputSearch(event)" class="wordGuess" data-value="true">' + word.toLowerCase() + '</span>';
        var ds = distractor[d]; 
        console.log('ds: ' + ds);
        var fw = '<span onClick="checkInputSearch(event)" class="wordGuess" data-value="false">' + ds.toLowerCase() + '</span>';
        allWords.push(tw);
        allWords.push(fw);
    }
    allWords = allWords.sort(randomSort);
    for(var i = 0; i < allWords.length; i++) {
        if(i == 3) {
            tb += '<br/>';
            tb += '<br/>';
        }
        tb += allWords[i] + ' ';
    }

    tbox = document.getElementById('textbox');

    tbox.innerHTML = tb;
}

function maybeCounter(counter) {
/** 
 * A function that either returns or initialises a counter in localstorage
 */
    var counter = localStorage.getItem(counter);
    if(counter == false) {
        localStorage.setItem(counter, Number(0));
        counter = localStorage.getItem(counter);
    }
    return Number(counter);
}

function checkInputSearch(e) {
/**
 * This is for the searching task, which is select K words found in the audio from N words in total
 * It checks to see if the answer is correct or incorrect and sets the colour accordingly
 * Then it redraws the feedback.
 */ 
    console.log('checkInputSearch()');

    var nclicks = maybeCounter('searchClicks'); // always returns either 0 or the number
    localStorage.setItem('searchClicks', Number(nclicks) + Number(1));

    var trueclicks = maybeCounter('trueClicks');

    var res = e.target.getAttribute('data-value');
    if(res == "false") {
        e.target.setAttribute('class', 'wordGuessIncorrect');
    } else {
        e.target.setAttribute('class', 'wordGuessCorrect');
        localStorage.setItem('trueClicks', Number(trueclicks) + Number(1));
    }

    console.log('nclicks: ' + nclicks);
    console.log('trueclicks: ' + trueclicks);

    if(nclicks == 2) {
        var buttons = document.querySelectorAll('[class="wordGuess"]')
        for(var i = 0; i < buttons.length; i++) {
          buttons[i].removeAttribute("onClick");
        }
        var responses = localStorage.getItem("responses");
        if(nclicks == trueclicks) {
            console.log('CORRECT!');
            responses += '+';
        } else {
            responses += '-';
        }
        localStorage.setItem("responses", responses);
        localStorage.removeItem('searchClicks'); 
        localStorage.removeItem('trueClicks'); 
    }

    clearFeedback();
    drawFeedback();
}


