var clone = function(){
    var fs = require('fs.extra');
    var ncp = require('ncp').ncp;
    var wrench = require('wrench');
    var util = require('util');
    var css_burrito_repo = 'https://github.com/tgandee79/css-burrito.git';
    var tmpPath = './_tmp';
    var assetPath = './app'
    var stylesheetsName = 'stylesheets/';
    var config;


    function init(config){
        tmpDir = config && config.tmpDir ? config.tmpDir : tmpPath;
        assetDir = config && config.assetDir ? config.assetDir : assetPath;
        config = config || {tmpDir: tmpDir, assetDir : assetDir};
        fs.removeSync(tmpPath);
    }
    function copyGitRepo(config){
        fs.mkdir(tmpPath, function() {
            require('simple-git')().clone(css_burrito_repo, tmpPath, function() {
                // copy files into project
                copyFileToApp('./_tmp/stylesheets/', './app/stylesheets/', config);
            });
        });
    }
    function copyFileToApp(dirToCopy, destPath, config){
        console.log('copy file to app directory');
        // fs.copy(dirToCopy, destPath, function(err){
        //     config.callback();
        //     if (err) return console.error(err);
            
        // }); //copies directory, even if it has subdirectories or files
        // ncp.limit = 16;

        // ncp(dirToCopy, destPath, function (err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     if(config.callback){
        //         config.callback();
        //     };
        //  console.log('done!');
        // });


        wrench.copyDirSyncRecursive(dirToCopy, destPath, {
            forceDelete: true, // Whether to overwrite existing directory or not
            excludeHiddenUnix: false, // Whether to copy hidden Unix files or not (preceding .)
            preserveFiles: true, // If we're overwriting something and the file already exists, keep the existing
            preserveTimestamps: true, // Preserve the mtime and atime when copying files
            inflateSymlinks: true //, Whether to follow symlinks or not when copying files
            // filter: regexpOrFunction, // A filter to match files against; if matches, do nothing (exclude).
            // whitelist: bool, // if true every file or directory which doesn't match filter will be ignored
            // include: regexpOrFunction, // An include filter (either a regexp or a function)
            // exclude: regexpOrFunction // An exclude filter (either a regexp or a function)
        });
        if(config.callback){
            config.callback();
        };
    }
    function getStylesheetPath(path){
        return path + '/stylesheets/application.css.scss'
    }
    function removeTempDirectory(config){
        fs.removeSync(tmpPath);
    }
    return {
        init: init,
        copyGitRepo: copyGitRepo,
        getStylesheetPath: getStylesheetPath,
        removeTmp: removeTempDirectory
    } 
};

module.exports = clone;
