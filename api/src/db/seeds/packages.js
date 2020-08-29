exports.seed = function (knex) {
    return knex('packages')
        .del()
        .then(function () {
            return knex('packages').insert([{ id: 1, name: 'hei', description: 'moi' }]);
        });
};
