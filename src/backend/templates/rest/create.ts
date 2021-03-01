function compileEndpointFile(endpoint, model, websiteData) {

    return ``;

}

function compileEndpointMeta(endpoint, model, websiteData) {

    var fileName = window['functions'].refactorPathString(endpoint.path);

    return {
        path: endpoint.path,
        protocol: endpoint.protocol,
        type: endpoint.type,
        description: `Use this endpoint to create the ${model.name} data. The created ${model.name} will use the values that you specify in the body.`,
        fileLocation: `${fileName}.js`,
        responses: {},
        parameters: []
    };

}

export default {
    compileEndpointFile,
    compileEndpointMeta
};