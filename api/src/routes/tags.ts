const Router = require('koa-router');
import { getTagsByPackageId, addTag, deleteTagByID } from '../db/queries/tags';
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/tags`;

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const tags = await getTagsByPackageId(ctx.params.id);

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
    } catch (error) {
        console.error(error);
    }
});

router.post(`${BASE_URL}`, async (ctx: Context) => {
    try {
        const body = ctx.request.body;
        const tag = await addTag(body);

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
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message || 'Sorry, an error has occurred.',
        };
    }
});

router.delete(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const tag = await deleteTagByID(ctx.params.id);

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
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message || 'Sorry, an error has occurred.',
        };
    }
});

export default router;
