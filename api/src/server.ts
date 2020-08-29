const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');
const mount = require('koa-mount');
const initRoute = require('./routes/init');
const packagesRoute = require('./routes/packages');
const tagsRoute = require('./routes/tags');
const notesRoute = require('./routes/notes');

const app = new Koa();
const build = new Koa();
const PORT = process.env.PORT || 2222;

build.use(serve(__dirname + '/build'));

app.use(mount('/', build));
app.use(cors());
app.use(bodyParser());
app.use(initRoute.routes());
app.use(packagesRoute.routes());
app.use(tagsRoute.routes());
app.use(notesRoute.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
