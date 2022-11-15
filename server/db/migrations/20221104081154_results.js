/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('results', table => {
        table
            .increments("id")
            .primary();
        table
            .integer('game_id')
            .notNullable()
            .references('id')
            .inTable('games')
            .onDelete('cascade')
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('cascade');
        table
            .integer('score')
            .notNullable();
        table
            .integer('max_score')
            .notNullable();
        table
            .bigInteger('end_game')
            // .defaultTo(knex.fn.now())
            // .notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
        .hasTable('results')
        .then(async function(exists) {
            if (exists) {
                return knex.schema.dropTable('results');
            };
        });
};
