const knex = require('../connection');

const getAllPackages = () => knex('packages').select('*');

const getPackagesByTag = (tagId: number) => knex('packages').where('tagId', tagId).select('*');

const getPackageByID = (id: number) => knex('packages').select('*').where({ id });

const getPackageByName = (name: string) => knex('packages').select('*').where({ name });

export { getAllPackages, getPackageByID, getPackageByName, getPackagesByTag };
