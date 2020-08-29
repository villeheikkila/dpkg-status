exports.up = (knex) =>
    knex.schema.createTable('packages', (table) => {
        table.increments();
        table.string('name').notNullable().unique();
        table.text('description');
        table.specificType('dependencies', 'INT[]');
        table.specificType('alternatives', 'INT[]');
    });

exports.down = (knex) => knex.schema.dropTable('packages');
