require('dotenv').config({ path: '.env' });

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL_CUSTOM,
        migrations: {
            directory: __dirname + '/src/db/migrations',
        },
        pool: {
            min: 2,
            max: 6,
            createTimeoutMillis: 3000,
            acquireTimeoutMillis: 30000,
            idleTimeoutMillis: 30000,
            reapIntervalMillis: 1000,
            createRetryIntervalMillis: 100,
            propagateCreateError: false,
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL_CUSTOM,
        migrations: {
            directory: __dirname + '/src/db/migrations',
        },
    },
};
