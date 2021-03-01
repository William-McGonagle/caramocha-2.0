export default function compileGit(zip, websiteData) {

    var gitFile = zip.folder('.git');

    gitFile.file('config', configFile());
    gitFile.file('description', websiteData.name);
    gitFile.file('FETCH_HEAD', '');
    gitFile.file('HEAD', 'ref: refs/heads/master');

    var hooks =   gitFile.folder('hooks');
    var info =    gitFile.folder('info').file('exclude', '# exclude file');
    var objects = gitFile.folder('objects');
    var ref =     gitFile.folder('ref');

    objects.folder('heads');
    objects.folder('info');
    objects.folder('pack');
    objects.folder('tags');

    return gitFile;

}

function configFile() {

    return `[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true`;

}