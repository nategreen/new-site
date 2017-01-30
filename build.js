var metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var drafts = require('metalsmith-drafts');
var handlebars = require('handlebars');
  var helpers = require('handlebars-helpers')({
    handlebars: handlebars
  });  
var inPlace = require('metalsmith-in-place');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var paths = require('metalsmith-paths');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var writeMetadata = require('metalsmith-writemetadata');

var partialsDirectory = './partials'

metalsmith(__dirname)
.metadata({
  site: {
    name: "Nate Green, UX Designer",
    description: "Nate Green is a UX designer from Northeast Ohio."
  }
})
.source('./src')
.destination('./build')
.use(sass({
  outputDir: 'css'
}))
.use(drafts())
.use(collections({
  posts: {
    pattern: 'blog/**/*.md',
    sortBy: 'date',
    reverse: true
  },
  pages: {
    pattern: '**/*.html'
  }
}))
.use(markdown())
.use(permalinks({
  relative: false,
  linksets: [
  {
    match: {collection: 'posts'},
    pattern: 'blog/:link.name'
  },
  {
    match: {collection: 'posts'},
    pattern: 'case-studies/:link.name'
  }
  ]
}))
.use(paths({
  property: 'link',
  directoryIndex: 'index.html'
}))
.use(inPlace({
  engine: 'handlebars',
  pattern: ['**/*.html', '**/*.hbs'],
  rename: false,
  partials: partialsDirectory
}))
.use(layouts({
  engine: 'handlebars',
  directory: './layouts',
  default: 'default.hbs',
  pattern: ["**/*.html"]
}))
// .use(writeMetadata({
//   pattern: ['**/*'],
//   bufferencoding: 'utf-8'
// }))
// .use(serve())
// .use(watch({
//   paths: {
//     "${source}/**/*": true,
//     "./layouts/**/*": "**/*"
//   }
// }))
.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Build complete');
  }
});