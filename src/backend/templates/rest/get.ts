function compileEndpointFile(endpoint, model, websiteData) {

    var fileName = window['functions'].refactorPathString(endpoint.path);

    return `
// ${fileName}.js

if (req.params.id == undefined) return res.status(400).send('No ID Provided.');  

${model.name}.findOne({
    where: {
        id: 
    }
}).then(function (data) {

    if (data == null) return res.status(404).send("${model.name} Not Found.");

    return res.status(200).json(data);

}).catch(function (error) {

    console.log(error);
    return res.status(500).send("Internal Server Error.");

});

    `;

}

function compileEndpointMeta(endpoint, model, websiteData) {

    var fileName = window['functions'].refactorPathString(endpoint.path);

    return {
        path: endpoint.path,
        protocol: endpoint.protocol,
        type: endpoint.type,
        description: `Use this endpoint to get the ${model.name} data specified with the 'id' parameter.`,
        fileLocation: `${fileName}.js`,
        responses: {},
        parameters: []
    };

}

export default {
    compileEndpointFile,
    compileEndpointMeta
};