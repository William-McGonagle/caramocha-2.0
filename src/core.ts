function generateDocker() {

    return `
FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD [ "npm", "start" ]
`;

}

// https://stackoverflow.com/questions/48969495/in-javascript-how-do-i-should-i-use-async-await-with-xmlhttprequest
function makeHttpRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

async function getLicense(websiteData) {

    if (websiteData.license.toUpperCase() == `UNLICENSED`) {

        return `UNLICENSED; COPYRIGHT ${websiteData.author.toUpperCase()} ALL RIGHTS RESERVED;`;

    }

    var request = (await makeHttpRequest('GET', `https://api.github.com/licenses/${websiteData.license}`)) as string;
    var requestData = JSON.parse(request);

    var licenseText = requestData.body;
        
    licenseText = licenseText.replace(`[year]`, new Date().getFullYear());
    licenseText = licenseText.replace(`[fullname]`, websiteData.author);

    return licenseText;

}
 
function generatePackage(websiteData) {

    return JSON.stringify({
        name: websiteData.name,
        version: websiteData.version,
        description: websiteData.description,
        author: websiteData.author,
        keywords: [],
        homepage: `https://${websiteData.domain}/`,
        bugs: {
            url: `https://${websiteData.domain}/bugs`,
            email: `bugs@${websiteData.domain}`
        },
        scripts: {
            start: "node src/main.js",
            test: "echo \"No Test Script Exists;"
        },
        license: websiteData.license,
        dependencies: {
            "express": "^4.17.1",
            "sequelize": "^6.3.5",
            "bcrypt": "^5.0.0",
            "jsonwebtoken": "^8.5.1",
            "react": "17.0.1",
            "react-dom": "17.0.1"
        }
    }, null, 4);

}

function generateReadme(websiteData) {

    return `# ${websiteData.name}
### by ${websiteData.author}

## License: ${websiteData.license}`;

}

export default {
    generateDocker,
    generatePackage,
    generateReadme,
    getLicense
};