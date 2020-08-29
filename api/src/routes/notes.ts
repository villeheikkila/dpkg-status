const Router = require('koa-router');
const queries = require('../db/queries/notes');
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/notes`;

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const notes = await queries.getNotesByPackageId(ctx.params.id);

        if (notes.length) {
            ctx.body = {
                status: 'success',
                data: notes,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That note does not exist.',
            };
        }
    } catch (err) {
        console.log(err);
    }
});

router.post(`${BASE_URL}`, async (ctx: Context) => {
    try {
        const body = ctx.request.body;
        const note = await queries.addNote(body);

        if (note.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: note,
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
        const tag = await queries.deleteNote(ctx.params.id);

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
