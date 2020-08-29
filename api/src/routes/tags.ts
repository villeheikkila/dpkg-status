const Router = require('koa-router');
const queries = require('../db/queries/tags');
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/tags`;

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const tags = await queries.getTagsByPackageId(ctx.params.id);

        if (tags.length) {
            ctx.body = {
                status: 'success',
                data: tags,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That tag does not exist.',
            };
        }
    } catch (err) {
        console.log(err);
    }
});

router.post(`${BASE_URL}`, async (ctx: Context) => {
    try {
        console.log(ctx);
        const body = ctx.request.body;
        console.log('body: ', body);
        const tag = await queries.addTag(body);

        if (tag.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: tag,
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.',
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.',
        };
    }
});

router.delete(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const tag = await queries.deleteTag(ctx.params.id);

        if (tag.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: tag,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That tag does not exist.',
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.',
        };
    }
});

module.exports = router;
