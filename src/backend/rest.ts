// Dynamic Imports and Parcel are not Working So I guess we Have to do This
import createEndpoint from './templates/rest/create';
import deleteEndpoint from './templates/rest/delete';
import getEndpoint from './templates/rest/get';
import listEndpoint from './templates/rest/list';
import updateEndpoint from './templates/rest/update';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function singleIndent(textData) {

    // return textData;
    return '\t' + textData.replace(/\n/g, '\n\t');

}

function safetyWrapForFile(textData) {

    return `module.exports = function (req, res) {

${singleIndent(textData)}

};`;

}

function compileOpenApi(websiteData) {

    var paths = {};

    for (var i = 0; i < websiteData.backend.models.length; i++) {

        var currentModel = websiteData.backend.models[i];

        for (var j = 0; j < currentModel.paths.length; j++) {

            var currentPath = currentModel.paths[j];
            
            if (paths[`/${currentModel.name}/${currentPath.path}`] == undefined) paths[`/${currentModel.name}/${currentPath.path}`] = {};
            
            paths[`/${currentModel.name}/${currentPath.path}`][currentPath.protocol] = {
                description: currentPath.description,
                responses: currentPath.responses,
                parameters: currentPath.parameters
            };

        }

    }

    return JSON.stringify({
        openapi: "3.0.0",
        info: {
            title: websiteData.name,
            description: websiteData.description,
            termsOfService: `https://${websiteData.domain}/terms`,
            contact: {
                name: websiteData.name,
                url: `https://${websiteData.domain}/support`,
                email: `support@${websiteData.domain}`
            },
            license: {
                "name": websiteData.license.toUpperCase(),
                "url": ""
            },
            servers: [
                {
                    description: "Development Server",
                    url: "http://localhost:8000/"
                },
                {
                    description: "Production Server",
                    url: `https://${websiteData.domain}/`
                }
            ],
            version: websiteData.version
        },
        paths: paths
    }, null, "\t");

}

async function compileBackend(websiteData, zip) {

    var backendFolder = zip.folder('src');
    var backendRouteFolder = backendFolder.folder('routes');
    var backendModelsFolder = backendFolder.folder('models');

    for (var i = 0; i < websiteData.backend.models.length; i++) {

        var model = websiteData.backend.models[i];
        var modelData = await compileModel(model, websiteData, backendRouteFolder);
        var sequelizeData = await compileSequelize(model, websiteData, backendModelsFolder);

    }

    return backendFolder;

}

async function compileSequelize(model, websiteData, zip) {

    var modelDefintion = "";

    for (var i = 0; i < model.schema.length; i++) {

        var modelSchemaItem = model.schema[i];
modelDefintion += modelSchemaItem.name + ": {\n";
        for (var modelParam in modelSchemaItem) {

            if (modelParam != 'name') {

                modelDefintion += "\t\t" + modelParam + ": " + modelSchemaItem[modelParam] + ",\n";

            }

        }

        modelDefintion += "},\n";

    }

    var schemaData = `const ${model.name} = sequelize.define('${model.name}', {${modelDefintion}});`;
    var fileData = `module.exports = function (sequelize, DataTypes) {
${singleIndent(schemaData)}
    return ${model.name};
};`;

    return zip.file(`${window['functions'].refactorPathString(model.name)}.js`, fileData);

}

async function compileModel(model, websiteData, zip) {

    var folder = zip.folder(model.name);

    for (var i = 0; i < model.paths.length; i++) {

        var endpoint = model.paths[i];
        var { endpointFile, endpointMetaData } = await compileEndpoint(endpoint, model, websiteData, folder);
        model.paths[i] = endpointMetaData;

    }

    return folder;

}

async function compileEndpoint(endpoint, model, websiteData, zip) {

    var endpointParser = await findTargetEndpoint(endpoint.type);

    var endpointFileData = endpointParser.compileEndpointFile(endpoint, model, websiteData);
    var endpointMetaData = endpointParser.compileEndpointMeta(endpoint, model, websiteData);

    var endpointFile = zip.file(endpointMetaData.fileLocation, safetyWrapForFile(endpointFileData));

    return { endpointFile, endpointMetaData };

}

async function findTargetEndpoint(type) {

    switch (type.toUpperCase()) {

        case 'GET':
            return getEndpoint;

        case 'CREATE':
            return createEndpoint;

        case 'DELETE':
            return deleteEndpoint;

        case 'LIST':
            return listEndpoint;

        case 'UPDATE':
            return updateEndpoint;

    }

}

export default {
    compileOpenApi,
    compileBackend,
    compileModel,
    compileEndpoint
};