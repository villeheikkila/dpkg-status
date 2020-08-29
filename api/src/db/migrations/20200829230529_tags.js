exports.up = (knex) =>
    knex.schema.createTable('tags', (table) => {
        table.increments();
        table.string('tag').notNullable().unique();
        table.integer('packageId');
    });

exports.down = (knex) => knex.schema.dropTable('tags');
