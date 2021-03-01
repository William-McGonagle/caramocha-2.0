function compileEndpointFile(endpoint, model, websiteData) {

    return "";

}

function compileEndpointMeta(endpoint, model, websiteData) {

    var fileName = window['functions'].refactorPathString(endpoint.path);

    return {
        path: endpoint.path,
        protocol: endpoint.protocol,
        type: endpoint.type,
        description: `Use this endpoint to update the ${model.name} data specified with the 'id' parameter.`,
        fileLocation: `${fileName}.js`,
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: `The numberic identifier of the ${model.name} data.`,
                schema: {
                    type: 'integer',
                    example: 0,
                }
            }
        ],
        responses: {
            200: {
                description: `The updated ${model.name} data.`,
                content: {
                    "application/json": {
                        // "schema": {
                        //     "$ref": "#/components/schemas/Pet"
                        // }
                    }
                }
            },
            400: {
                description: `The client did not provide data for the 'id' parameter, or they provided the data incorrectly.`,
                content: {
                    "text/plain": {
                        schema: {
                            type: 'string',
                            example: 'Bad Request.'
                        }
                    }
                }
            },
            404: {
                description: `Could not find the ${model.name} data associated with the 'id' parameter.`,
                content: {
                    "text/plain": {
                        schema: {
                            type: 'string',
                            example: 'Not Found.'
                        }
                    }
                }
            }
        }
    };

}

export default {
    compileEndpointFile,
    compileEndpointMeta
};