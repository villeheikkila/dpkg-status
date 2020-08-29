const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');
const mount = require('koa-mount');
import initRoute from './routes/init';
import tagsRoute from './routes/tags';
import notesRoute from './routes/notes';
import packagesRoute from './routes/packages';

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
