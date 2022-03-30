const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

// Disable/Enable button
function toggleButton(){
    button.disabled = !button.disabled;
}


function tellMe(joke) {
    VoiceRSS.speech({
        key: '05979dc72cd94ce29145b90363c45337',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get Jokes from Joke API
async function getJokes() {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable button
        toggleButton();
    }catch(error){
        console.log("Whooo! the error is: ",error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes); 
audioElement.addEventListener('ended',toggleButton);