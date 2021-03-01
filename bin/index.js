import polish from './polish';
import core from './core';
function generateWebsiteData() {
    return {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        author: document.getElementById('author').value,
        domain: document.getElementById('url').value,
        license: document.getElementById('license').value,
        version: document.getElementById('version').value
    };
}
function download() {
    var websiteData = generateWebsiteData();
    var zip = new JSZip();
    var dockerFile = zip.file('Dockerfile', core.generateDocker());
    var packageFile = zip.file('package.json', core.generatePackage(websiteData));
    zip.generateAsync({ type: 'blob' }).then(function (blob) {
        window.saveAs(blob, "website.zip");
    });
}
window.onload = function () {
    document.getElementById('download').onclick = function () {
        download();
    };
    polish.setupCookies();
    polish.setupStoredInputs();
    polish.setupSubtextAnimation();
};
