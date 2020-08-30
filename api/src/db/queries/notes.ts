const knex = require('../connection');

interface Note {
    packageId: number;
    note: string;
}

const getNotesByPackageId = (id: number) =>
    knex('notes').whereIn('id', knex('packages_notes').select('noteId').where('packageId', id));

const addNote = async ({ note, packageId }: Note) => {
    const newNote = await knex('notes').insert({ note }).returning('id');

    await knex('packages_notes').insert({ packageId, noteId: newNote[0] }).returning('noteId');

    return knex('notes').where({ id: newNote[0] }).first();
};

const deleteNoteByID = (id: number) => knex('notes').del().where({ id }).returning('*');

export { getNotesByPackageId, addNote, deleteNoteByID };
