"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('games', table => {
        table
            .increments("id")
            .primary();
        table
            .string('user_uId', 255)
            .notNullable()
            .references('uId')
            .inTable('users')
            .onDelete('cascade');
        table
            .string('image_id', 255)
            .notNullable();
        table
            .json('grid_state')
            .notNullable();
        table
            .boolean('hasWon')
            .notNullable();
        table
            .bigInteger('started')
            .notNullable();
        table
            .bigInteger('completed');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema
        .hasTable('games')
        .then(async function (exists) {
        if (exists) {
            return knex.schema.dropTable('games');
        }
        ;
    });
}
exports.down = down;
