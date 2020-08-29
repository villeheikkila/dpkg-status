const knex = require('../connection');

const getAllPackages = () => {
    return knex('packages').select('*');
};

const getPackageByID = (id: number) => knex('packages').select('*').where({ id });

const getPackageByName = (name: string) => knex('packages').select('*').where({ name });

export { getAllPackages, getPackageByID, getPackageByName };
