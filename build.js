var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var inPlace = require('metalsmith-in-place');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var sass = require('metalsmith-sass');

var partialsDirectory = './partials/';

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
.use(inPlace({
  pattern: '**/*.hbs',
  engineOptions: {
    partials: {
      'foot': partialsDirectory + 'foot.hbs',
      'head': partialsDirectory + 'head.hbs',
      'page-header': partialsDirectory + 'page-header.hbs',
      'site-header': partialsDirectory + 'site-header.hbs'
    }
  }
}))
.use(markdown())
.use(permalinks({
  relative: false,
  linksets: [{
    match: {collection: 'posts'},
    pattern: 'blog/:title/:name'
  }]
}))
.use(layouts({
  engine: 'handlebars',
  directory: './layouts',
  default: 'blog-post.hbs',
  partials: './partials',
  pattern: ["**/*.html","**/*.hbs"]
}))
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