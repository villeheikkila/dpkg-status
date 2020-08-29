module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/dkpk',
        migrations: {
            directory: __dirname + '/src/db/migrations',
        },
        seeds: {
            directory: __dirname + '/src/db/seeds',
        },
    },
};
