var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
// var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var render = require('metalsmith-in-place');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var sass = require('metalsmith-sass');

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
.use(render({
  pattern: '**/*.hbs'
}))
.use(markdown())
.use(permalinks({
  relative: false,
  linksets: [{
    match: {collection: 'posts'},
    pattern: 'blog/:title'
  }]
}))
.use(layouts({
  engine: 'handlebars',
  directory: './_layouts',
  default: 'blog-post.hbs',
  pattern: ["**/*.html","**/*.hbs"]
}))
.use(serve())
.use(watch({
  paths: {
    "${source}/**/*": true,
    "./_layouts/**/*": "**/*"
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