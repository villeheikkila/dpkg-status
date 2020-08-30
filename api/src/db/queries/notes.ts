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

const deleteNoteByID = async (noteId: number, packageId: number) => {
    await knex('packages_notes').del().where({ noteId, packageId });
    return knex('notes').del().where({ id: noteId }).returning('*');
};

export { getNotesByPackageId, addNote, deleteNoteByID };
