exports.up = (knex) =>
    knex.schema.createTable('notes', (table) => {
        table.increments();
        table.text('note').notNullable();
        table.integer('packageId');
    });

exports.down = (knex) => knex.schema.dropTable('tags');
