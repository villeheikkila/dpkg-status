exports.up = (knex) =>
    knex.schema.createTable('packages', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.text('description');
    });

exports.down = (knex) => knex.schema.dropTable('packages');
