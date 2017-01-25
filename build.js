var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
// var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var render = require('metalsmith-in-place');

metalsmith(__dirname)
.metadata({
  site: {
    name: "Nate Green, UX Designer",
    description: "Nate Green is a UX designer from Northeast Ohio."
  }
})
.source('./src')
.destination('./build')
.use(collections({
  posts: {
    pattern: './blog/**/*.md',
    sortBy: 'date',
    reverse: true
  },
  pages: {
    pattern: './**/*.html'
  }
}))
.use(render({
  pattern: '**/*.hbs'
}))
.use(markdown())
.use(permalinks({
  relative: false
}))
.use(layouts({
  engine: 'handlebars',
  directory: './_layouts',
  default: 'blog-post.hbs',
  pattern: ["**/*.html","**/*.hbs"]
}))
.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Build complete');
  }
});