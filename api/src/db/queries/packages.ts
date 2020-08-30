import { getTagsByPackageId } from './tags';

const knex = require('../connection');

const getAllPackages = async () => {
    const allPackages = await knex('packages').select('*');

    for (let i = 0; i < allPackages.length; i++) {
        const tags = (await getTagsByPackageId(allPackages[i].id)) || [];
        const tagIds = tags.map((e: any) => e.id);
        allPackages[i].tags = tagIds;
    }

    return allPackages;
};

const getPackagesByTag = (tagId: number) => knex('packages').where('tagId', tagId).select('*');

const getPackageByID = (id: number) => knex('packages').select('*').where({ id });

const getPackageByName = (name: string) => knex('packages').select('*').where({ name });

export { getAllPackages, getPackageByID, getPackageByName, getPackagesByTag };
