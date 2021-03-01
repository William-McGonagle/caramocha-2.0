// https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function replaceAt(index, replacement, string) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

function refactorPathString(path) {

    // :id/edit -> :id/edit
    var output = path;

    // :id/edit -> id/edit
    output = output.replace(/\:/g, '');

    // id/edit -> idEdit
    var words = output.split('/');
    var mended = '';
    for (var i = 0; i < words.length; i++) {

        mended += replaceAt(0, words[i][0].toUpperCase(), words[i]);

    }

    mended = replaceAt(0, mended[0].toLowerCase(), mended);

    return mended;

}

export default {
    refactorPathString
};