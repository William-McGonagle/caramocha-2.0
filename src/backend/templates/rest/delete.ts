function compileEndpointFile(endpoint, model, websiteData) {

    var fileName = window['functions'].refactorPathString(endpoint.path);

    return `// ${fileName}.js

if (req.params.id == undefined) return res.status(400).send('No ID Provided.');  



    `;

}

function compileEndpointMeta(endpoint, model, websiteData) {

    var fileName = window['functions'].refactorPathString(endpoint.path);

    return {
        path: endpoint.path,
        protocol: endpoint.protocol,
        type: endpoint.type,
        description: `Use this endpoint to delete the ${model.name} data specified with the 'id' parameter.`,
        fileLocation: `${fileName}.js`,
        responses: {},
        parameters: []
    };

}

export default {
    compileEndpointFile,
    compileEndpointMeta
};