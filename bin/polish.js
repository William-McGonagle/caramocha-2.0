var cookies = {};
function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function setupCookies() {
    var cookieData = document.cookie.split(';');
    cookieData.forEach(function (data, index, array) {
        var mutData = data.trim();
        var mutSections = data.split('=');
        cookies[mutSections[0].trim()] = decodeURI(mutSections[1].trim());
    });
}
function getCookie(key) {
    return cookies[key];
}
function setCookie(key, value) {
    cookies[key] = value;
    document.cookie = key + "=" + value + ";";
}
function setupStoredInputs() {
    setupStoredInput('name');
    setupStoredInput('author');
    setupStoredInput('url');
    setupStoredInput('version');
    setupStoredInput('license');
    setupStoredInput('description');
}
function setupStoredInput(id) {
    var element = document.getElementById(id);
    element.value = getCookie(id);
    element.onchange = function () {
        setCookie(id, element.value);
    };
}
function setupSubtextAnimation() {
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
    setInterval(function () {
        subtext.innerHTML = "Build a " + getRandom(possibleSayings) + " in Minutes.";
    }, 2500);
    subtext.innerHTML = "Build a " + getRandom(possibleSayings) + " in Minutes.";
}
export default {
    setupCookies: setupCookies,
    setupSubtextAnimation: setupSubtextAnimation,
    setupStoredInput: setupStoredInput,
    setupStoredInputs: setupStoredInputs,
    setCookie: setCookie,
    getCookie: getCookie,
    getRandom: getRandom
};
