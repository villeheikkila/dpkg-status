module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/dkpkdb',
        migrations: {
            directory: __dirname + '/src/db/migrations',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true',
        migrations: {
            directory: __dirname + '/src/db/migrations',
        },
    },
};
