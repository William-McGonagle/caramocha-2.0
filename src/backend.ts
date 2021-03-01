import falcor from './backend/falcor';
import graphQL from './backend/graphql';
import rest from './backend/rest';

function compileOpenApi(websiteData, zip) {

    var fileData = ``;

    if (websiteData.backend.type.toUpperCase() == 'NONE') return null;
    if (websiteData.backend.type.toUpperCase() == 'GRAPHQL') fileData = graphQL.compileOpenApi(websiteData);
    if (websiteData.backend.type.toUpperCase() == 'FALCOR') fileData = falcor.compileOpenApi(websiteData);
    if (websiteData.backend.type.toUpperCase() == 'REST') fileData = rest.compileOpenApi(websiteData);

    return zip.file('OpenAPI.json', fileData);

}

async function compileBackend (websiteData, zip) {

    if (websiteData.backend.type.toUpperCase() == 'NONE') return null;
    if (websiteData.backend.type.toUpperCase() == 'GRAPHQL') return await graphQL.compileBackend(websiteData, zip);
    if (websiteData.backend.type.toUpperCase() == 'FALCOR') return await falcor.compileBackend(websiteData, zip);
    if (websiteData.backend.type.toUpperCase() == 'REST') return await rest.compileBackend(websiteData, zip);

}

export default {
    compileOpenApi,
    compileBackend
};