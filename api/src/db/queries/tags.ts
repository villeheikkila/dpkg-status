const knex = require('../connection');

interface Tag {
    packageId: number;
    tag: string;
}

const getTagsByPackageId = (id: number) => {
    return knex('tags').select('*').where({ packageId: id });
};

const addTag = (tag: Tag) => {
    return knex('tags').insert(tag).returning('*');
};

const deleteTagByID = (id: number) => {
    return knex('tags').del().where({ id }).returning('*');
};

module.exports = {
    getTagsByPackageId,
    addTag,
    deleteTagByID,
};

export {};
