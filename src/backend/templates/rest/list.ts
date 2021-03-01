function compileEndpointFile(endpoint, model, websiteData) {

    return "";

}

function compileEndpointMeta(endpoint, model, websiteData) {

    var fileName = window['functions'].refactorPathString(endpoint.path);

    return {
        path: endpoint.path,
        protocol: endpoint.protocol,
        type: endpoint.type,
        description: `Use this endpoint to list the ${model.name} data. This endpoint will list all of the data without paging.`,
        fileLocation: `${fileName}.js`,
        responses: {},
        parameters: []
    };

}

export default {
    compileEndpointFile,
    compileEndpointMeta
};