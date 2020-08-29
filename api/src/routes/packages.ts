const Router = require('koa-router');
import { getAllPackages, getPackageByID } from '../db/queries/packages';
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/packages`;

router.get(BASE_URL, async (ctx: Context) => {
    try {
        const packages = await getAllPackages();

        ctx.body = {
            status: 'success',
            data: packages,
        };
    } catch (error) {
        console.error(error);
    }
});

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const packages = await getPackageByID(ctx.params.id);

        if (packages.length) {
            ctx.body = {
                status: 'Success!',
                data: packages,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'No such package found.',
            };
        }
    } catch (error) {
        console.error(error);
    }
});

export default router;
