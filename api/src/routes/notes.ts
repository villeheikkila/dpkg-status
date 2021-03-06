const Router = require('koa-router');
import { getNotesByPackageId, addNote, deleteNoteByID } from '../db/queries/notes';
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/notes`;

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const notes = await getNotesByPackageId(ctx.params.id);

        if (notes) {
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
    } catch (error) {
        console.error(error);
    }
});

router.post(`${BASE_URL}`, async (ctx: Context) => {
    try {
        const body = ctx.request.body;
        const note = await addNote(body);

        if (note) {
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
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message || 'Sorry, an error has occurred.',
        };
    }
});

router.delete(`${BASE_URL}/:noteId/:packageId`, async (ctx: Context) => {
    try {
        const data = await deleteNoteByID(ctx.params.noteId, ctx.params.packageId);

        if (data.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That note does not exist.',
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
