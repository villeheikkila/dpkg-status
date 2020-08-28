const Router = require('koa-router');
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/init`;

router.get(BASE_URL, async (ctx: Context) => {
    try {
        ctx.body = {
            status: 'success',
            data: 'Hello world!',
        };
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
