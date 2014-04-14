
// test/main.js
var should = require('chai').should();
var clone = require('../tasks/clone');
var fs = require('fs.extra');
var tmpPath = '_tmp';
var assetPath = 'app';
var projectConfig = {
  'tmpDir': tmpPath,
  'assetDir': assetPath
}
// before 
describe('#burrito-clone', function() {
  it('copies git repo to tmp', function(done) {
    var cloneFn = clone();
    var afterFinish = function(){
        if (!fs.existsSync(cloneFn.getStylesheetPath(tmpPath))) {
          throw ("Logging File Does Not Exist");
        }
        cloneFn.removeTmp();
        done();
    };
    projectConfig.callback = afterFinish;

    cloneFn.init(projectConfig);
    cloneFn.copyGitRepo(projectConfig); 
  });
  // it('copies tmp to app for html project', function(done) {
  //   var cloneFn = clone();
  //   var afterFinish = function(){
  //       if (!fs.existsSync(cloneFn.getStylesheetPath(assetPath))) {
  //         throw ("Logging File Does Not Exist");
  //       }
  //       cloneFn.removeTmp();
  //       done();
  //   };
  //   projectConfig.callback = afterFinish;
  //   cloneFn.init(projectConfig);
  //   cloneFn.copyGitRepo(projectConfig); 
  // });
});
