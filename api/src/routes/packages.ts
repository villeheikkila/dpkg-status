const Router = require('koa-router');
const queries = require('../db/queries/packages');
import { Context } from 'koa';

const router = new Router();
const BASE_URL = `/api/packages`;

router.get(BASE_URL, async (ctx: Context) => {
    try {
        const packages = await queries.getAllPackages();

        ctx.body = {
            status: 'success',
            data: packages,
        };
    } catch (err) {
        console.log(err);
    }
});

router.get(`${BASE_URL}/:id`, async (ctx: Context) => {
    try {
        const packages = await queries.getPackageByID(ctx.params.id);

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
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
