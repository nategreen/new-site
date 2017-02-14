var metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var drafts = require('metalsmith-drafts');
var handlebars = require('handlebars');
  var helpers = require('handlebars-helpers')();
var ignore = require('metalsmith-ignore');
var inPlace = require('metalsmith-in-place');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var paths = require('metalsmith-paths');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var writeMetadata = require('metalsmith-writemetadata');

metalsmith(__dirname)
.metadata({
  site: {
    name: "Nate Green, UX Designer",
    description: "Nate Green is a UX designer from Northeast Ohio.",
    baseUrl: ''
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
.use(markdown({
  'smartypants': true,
  'gfm': false
}))
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
  partials: './partials'
}))
.use(layouts({
  engine: 'handlebars',
  directory: './layouts',
  default: false,
  pattern: ["**/*.html"],
  partials: '/partials'
}))
.use(serve())
.use(watch({
  paths: {
    "${source}/**/*": true,
    "layouts/**/*": "**/*"
  }
}))
.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Build complete');
  }
});