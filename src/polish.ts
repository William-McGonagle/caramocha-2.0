// VARIABLES
var cookies:Record<string, string> = {};

// UTILITY

function getRandom(array:Array<any>) {

    return array[Math.floor(Math.random() * array.length)];

}

function setupCookies() {

    var cookieData:Array<string> = document.cookie.split(';');

    cookieData.forEach(function (data, index, array) {

        // Setup the Data so it Can be Mutilated
        var mutData = data.trim();
        var mutSections = data.split('=');

        // Add to the Map
        cookies[mutSections[0].trim()] = decodeURI(mutSections[1].trim());

    });

}

function getCookie(key:string) {

    return cookies[key];

}

function setCookie(key:string, value:string) {

    cookies[key] = value;
    document.cookie = key + "=" + value + ";"; 
    
}

// CORE

function setupStoredInputs() {

    // General
    setupStoredInput('name');
    setupStoredInput('author');
    setupStoredInput('url');
    setupStoredInput('version');
    setupStoredInput('license');
    setupStoredInput('description');

    // Frontend
    setupStoredInput('frontendType');

    // Backend
    setupStoredInput('backendType');

}

function setupStoredInput(id:string) {

    var element = document.getElementById(id) as HTMLInputElement;
    element.value = getCookie(id);

    element.onchange = () => {

        setCookie(id, element.value);

    };

}

function setupSubtextAnimation() {

    // Add Reference to DOM Element and Possible Values
    var subtext = document.getElementById('subtext');
    var possibleSayings = [
        'Website',
        'Safe Whatsapp',
        'Twitter Clone',
        'Netflix Alternative',
        'Million Dollar Evaluation',
        'Future',
        'Reddit Competitor'
    ];

    // Run Every 1.5 Seconds
    setInterval(function () {

        subtext.innerHTML = `Build a ${getRandom(possibleSayings)} in Minutes.`;

    }, 2500);

    // Initial Clock Cycle
    subtext.innerHTML = `Build a ${getRandom(possibleSayings)} in Minutes.`;
    
}

function createModelUI() {

    document.getElementById('modelLabel').style.display = "block";

    var modelContainer = document.getElementById('models');
    
    var modelObject = document.createElement("div");
    var modelName = document.createElement("input");
    var deleteButton = document.createElement("button");
    var textInput = document.createElement("textarea");

    modelName.value = "New Model";
    modelName.className = "name";

    textInput.value = JSON.stringify({
        "model": {
            "year": "date",
            "owner": "string",
            "type": "string"
        }
    }, null, 4);
    textInput.className = "schema";

    deleteButton.innerHTML = "x";
    deleteButton.className = "delete";
    deleteButton.onclick = function () {

        modelContainer.removeChild(modelObject);

    }

    modelObject.append(deleteButton); 
    modelObject.append(modelName);
    modelObject.append(textInput);

    modelContainer.append(modelObject);

}

export default {
    setupCookies,
    setupSubtextAnimation,
    setupStoredInput,
    setupStoredInputs,
    setCookie,
    getCookie,
    getRandom,
    createModelUI
};