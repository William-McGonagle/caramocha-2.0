import polish from './polish';
import core from './core';
import backend from './backend';
import compileGit from './git';
import windowFunctions from './globalFunctions';

window['functions'] = windowFunctions;

function generateWebsiteData() {

    return {
        name: (document.getElementById('name') as HTMLInputElement).value,
        description: (document.getElementById('description') as HTMLInputElement).value,
        author: (document.getElementById('author') as HTMLInputElement).value,
        domain: (document.getElementById('url') as HTMLInputElement).value,
        license: (document.getElementById('license') as HTMLInputElement).value,
        version: (document.getElementById('version') as HTMLInputElement).value,
        backend: {
            type: (document.getElementById('backendType') as HTMLInputElement).value,
            models: [
                {
                    name: 'user',
                    schema: [
                        {
                            name: 'username',
                            type: 'string'
                        },
                        {
                            name: 'email',
                            type: 'text'
                        }, 
                        {
                            name: 'password',
                            type: 'text'
                        },
                        {
                            name: 'biology',
                            type: 'text'
                        },
                        {
                            name: 'firstname',
                            type: 'string'
                        },
                        {
                            name: 'lastname',
                            type: 'string'
                        }
                    ],
                    paths: [
                        {
                            path: 'create',
                            protocol: 'post',
                            type: 'create'
                        },
                        {
                            path: ':id',
                            protocol: 'get',
                            type: 'get'
                        },
                        {
                            path: ':id/edit',
                            protocol: 'patch',
                            type: 'update'
                        },
                        {
                            path: ':id/delete',
                            protocol: 'delete',
                            type: 'delete'
                        }
                    ]
                }
            ]
        }
    };

}

async function download() {

    console.time('generateWebsite');
    
    var websiteData = generateWebsiteData();

    // @ts-ignore
    var zip:any = new JSZip();
    
    // Generate Backend
    var backendFolder = await backend.compileBackend(websiteData, zip);

    // Generate Frontend

    // Generate Core Files
    var dockerFile = zip.file('Dockerfile', core.generateDocker());
    var readmeFile = zip.file('readme.md', core.generateReadme(websiteData)); 
    var packageFile = zip.file('package.json', core.generatePackage(websiteData));
    var openApiFile = backend.compileOpenApi(websiteData, zip);
    var licenseFile = zip.file('license.md', await core.getLicense(websiteData));

    var gitFolder = compileGit(zip, websiteData);

    var blob = await zip.generateAsync({type: 'blob'});

    // @ts-ignore
    window.saveAs(blob, `${websiteData.name}.zip`);

    console.timeEnd('generateWebsite');

} 

// Will not load 'download function' unless Javascript Calls DOM
window.onload = function () {

    document.getElementById('createModel').onclick = polish.createModelUI;

    document.getElementById('download').onclick = function () {

        download();
    
    };

    polish.setupCookies();
    polish.setupStoredInputs();
    polish.setupSubtextAnimation();

};