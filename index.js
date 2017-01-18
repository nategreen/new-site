var Metalsmith = require('metalsmith');

// var BrowserSync= require('metalsmith-browser-sync');
var collections = require('metalsmith-collections');
// var defaultValues = require('metalsmith-default-values');
// var drafts = require('metalsmith-drafts');
// var googleAnalytics = require('metalsmith-google-analytics');
// var layouts = require('metalsmith-layouts');
// var markdown = require('metalsmith-markdown');
// var permalinks = require('metalsmith-permalinks');
// var sass = require('metalsmith-sass');

new Metalsmith(__dirname)
  
  .metadata({
    "site": {
      "name": "Nate Green, UX Designer",
      "url": "http://nategreen.design/",
      "description": "Nate Green is a UX designer with a visual design background and experience in several other creative, digital media."
    }
  })
  .source('./src')
  .destination('./dist')
  .clean(true)
  .use(collections({
    "posts": "_posts/*.{md, hbs}",
    "projects": "_projects/**/*.hbs"
  }))
  .build(function(err){
    if (err) throw err;
  });