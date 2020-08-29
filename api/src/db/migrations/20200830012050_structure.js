exports.up = function (knex) {
    return knex.schema
        .createTable('packages', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable().unique();
            table.text('description');
            table.specificType('dependencies', 'INT[]');
            table.specificType('alternatives', 'INT[]');
        })
        .createTable('notes', function (table) {
            table.increments('id').primary();
            table.text('note').notNullable();
        })
        .createTable('tags', function (table) {
            table.increments('id').primary();
            table.string('tag').unique().notNullable();
        })
        .createTable('packages_tags', function (table) {
            table.integer('packageId').unsigned().references('packages.id');
            table.integer('tagId').unsigned().references('tags.id');
        })
        .createTable('packages_notes', function (table) {
            table.integer('packageId').unsigned().references('packages.id');
            table.integer('noteId').unsigned().references('notes.id');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('packages_notes')
        .dropTable('packages_tags')
        .dropTable('tags')
        .dropTable('notes')
        .dropTable('packages');
};
