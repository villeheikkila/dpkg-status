const Router = require('koa-router');
import { Context } from 'koa';
import { parseDkpkStatus } from '../utils/parseDkpkStatus';
const axios = require('axios');

const router = new Router();
const BASE_URL = `/api/init`;

router.get(BASE_URL, async (ctx: Context) => {
    try {
        // Fetch the sample gist from the Reaktor GitHub gist
        const rawData = await axios.get('https://api.github.com/gists/29735158335170c27297422a22b48caa');
        const data = rawData.data.files['status.real'].content;

        // Parse the relevant data from the file
        const relevantData = parseDkpkStatus(data);

        console.log('data: ', relevantData);

        ctx.body = {
            status: 'success',
            data: relevantData,
        };
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
