import { Knex } from "knex";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
        table
            .increments("id")
            .primary();
        table
        // /!\ Check if reference works when populating data
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('cascade');
        table
            .json('chosen_songs')
            .notNullable();
        table
            .integer('round')
            .notNullable();
        table
            .integer('max_round')
            .notNullable();
        table
            .bigInteger('game_start')
            // .defaultTo(knex.fn.now())
            // .notNullable();
    })
};

exports.down = async function(knex) {
    await knex.schema
    .hasTable('games')
    .then(async function(exists) {
        if (exists) {
            return knex.schema.dropTable('games');
        };
    });
}

