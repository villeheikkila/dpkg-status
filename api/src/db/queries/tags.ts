const knex = require('../connection');

interface Tag {
    packageId: number;
    tag: string;
}

const getAllTags = () => knex('tags').leftJoin('packages_tags', 'tags.id', 'packages_tags.tagId');

const getTagsByPackageId = (id: number) =>
    knex('tags').whereIn('id', knex('packages_tags').select('tagId').where('packageId', id));

const addTag = async ({ tag, packageId }: Tag) => {
    const newTagRaw = await knex('tags')
        .select()
        .where({ tag })
        .then((res: any) => {
            return res.length === 0
                ? knex('tags').insert({ tag }).returning('*')
                : knex('tags').where({ tag }).select('*');
        });

    const newTag = newTagRaw.map((e: any) => e.id);
    await knex('packages_tags').insert({ packageId, tagId: newTag[0] }).returning('tagId');

    return knex('tags').where({ id: newTag[0] }).first();
};

const deleteTagByID = (id: number) => knex('tags').del().where({ id }).returning('*');

export { getTagsByPackageId, addTag, deleteTagByID, getAllTags };
