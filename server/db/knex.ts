const config = require('../knexfile');
import knex, { Knex } from 'knex';

const db : Knex = process.env.NODE_ENV === 'production' ? knex(config.production) : knex(config.development);

export default db;