"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('users', table => {
        table
            .increments('id')
            .primary();
        table
            .string('uid', 255)
            .unique();
        // .notNullable();
        table.
            string('username', 255);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema
        .hasTable('users')
        .then(async function (exists) {
        if (exists) {
            return knex.schema.dropTable('users');
        }
        ;
    });
}
exports.down = down;
