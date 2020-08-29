const knex = require('../connection');

interface Note {
    packageId: number;
    note: string;
}

const getNotesByPackageId = (packageId: number) => knex('notes').select('*').where({ packageId });

const addNote = ({ note, packageId }: Note) =>
    knex('notes')
        .insert({ note })
        .returning('id')
        .then((response: any) => {
            knex('packages_notes').insert({ packageId, noteId: response[0] });
            return response[0];
        })
        .then((id: number) => knex('notes').first().where({ id }));

const deleteNoteByID = (id: number) => knex('notes').del().where({ id }).returning('*');

export { getNotesByPackageId, addNote, deleteNoteByID };
