const Router = require('koa-router');
import { Context } from 'koa';
import { parseDkpkStatus } from '../utils/parseDkpkStatus';
const knex = require('../db/connection');
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

        for (let i = 0; i < relevantData.length; i++) {
            const { name, description } = relevantData[i];
            try {
                await knex('packages').insert({ name, description }).returning('*');
            } catch (error) {
                console.error(error);
            }
        }

        for (let i = 0; i < relevantData.length; i++) {
            const deps = relevantData[i].dependencies;
            const alts = relevantData[i].alternatives;

            const ids = [];

            for (let j = 0; j < deps.length; j++) {
                const id = await knex('packages').where({ name: deps[j] }).returning('*');
                ids.push(id[0]);
            }
            try {
                const idsToAdd = ids.length !== 0 ? ids.filter((e) => e?.id !== undefined).map((e) => e.id) : null;
                await knex('packages').where({ name: relevantData[i].name }).update({
                    dependencies: idsToAdd,
                });
            } catch (error) {
                console.error(error);
            }

            const altIds = [];

            for (let j = 0; j < alts.length; j++) {
                const id = await knex('packages').where({ name: alts[j] }).returning('*');
                altIds.push(id[0]);
            }
            try {
                const idsToAdd =
                    altIds.length !== 0 ? altIds.filter((e) => e?.id !== undefined).map((e) => e.id) : null;
                await knex('packages').where({ name: relevantData[i].name }).update({
                    alternatives: idsToAdd,
                });
            } catch (error) {
                console.error(error);
            }
        }

        const db = await knex('packages').returning('*');

        ctx.body = {
            status: 'Succesfully initialized the database with data from the status file.',
            data: db,
        };
    } catch (error) {
        console.error(error);
        ctx.body = {
            status: 'Initialization encountered an error',
        };
    }
});

export default router;
