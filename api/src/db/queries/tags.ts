const knex = require('../connection');

interface Tag {
    packageId: number;
    tag: string;
}

const getTagsByPackageId = (packageId: number) => knex('tags').select('*').where({ packageId });

const addTag = ({ tag, packageId }: Tag) =>
    knex('tags')
        .insert({ tag })
        .returning('id')
        .then((response: any) => {
            knex('packages_tags').insert({ packageId, tagId: response[0] });
            return response[0];
        })
        .then((id: number) => knex('tags').first().where({ id }));

const deleteTagByID = (id: number) => knex('tags').del().where({ id }).returning('*');

export { getTagsByPackageId, addTag, deleteTagByID };
