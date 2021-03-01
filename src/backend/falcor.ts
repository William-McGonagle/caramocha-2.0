function compileOpenApi(websiteData) {

    return JSON.stringify({}, null, 4);

}

function compileBackend(websiteData, zip) {

    for (var i = 0; i < websiteData.backend.models.length; i++) {

        var model = websiteData.backend.models[i];
        var modelData = compileModel(model, websiteData, zip);

    }

}

function compileModel(model, websiteData, zip) {

    console.log(model);

    for (var i = 0; i < model.paths.length; i++) {

        var endpoint = model.paths[i];
        var endpointData = compileEndpoint(endpoint, model, websiteData, zip);

    }

}

function compileEndpoint(endpoint, model, websiteData, zip) {

    console.log(endpoint);

}

export default {
    compileOpenApi,
    compileBackend,
    compileModel,
    compileEndpoint
};