function generateDocker() {
    return "\nFROM node:12\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nENV PORT=8080\nEXPOSE 8080\nCMD [ \"npm\", \"start\" ]\n";
}
function generatePackage(websiteData) {
    return JSON.stringify({
        name: websiteData.name,
        version: websiteData.version,
        description: websiteData.description,
        author: websiteData.author,
        keywords: [],
        homepage: "https://" + websiteData.domain + "/",
        bugs: {
            url: "https://" + websiteData.domain + "/bugs",
            email: "bugs@" + websiteData.domain
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
export default {
    generateDocker: generateDocker,
    generatePackage: generatePackage
};
