const knex = require('../connection');

interface Note {
    packageId: number;
    note: string;
}

const getNotesByPackageId = (packageId: number) => {
    return knex('notes').select('*').where({ packageId });
};

const addNote = (note: Note) => {
    return knex('notes').insert(note).returning('*');
};

const deleteNoteByID = (id: number) => {
    return knex('notes').del().where({ id }).returning('*');
};

export { getNotesByPackageId, addNote, deleteNoteByID };
