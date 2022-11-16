require('ts-node/register');
require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();

module.exports = {
    
    development: {
        client: 'pg',
        connection: process.env.DB_URL_LOCAL,
        // {
        //     // host: process.env.DB_HOST,
        //     // port: process.env.DB_PORT,
        //     // database: process.env.DB_NAME,
        //     // user: process.env.DB_USER,
        //     // password: process.env.DB_PASSWORD,  
        // },
        searchPath: 'public',
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DB_URL,
        searchPath: 'public',
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    }
}