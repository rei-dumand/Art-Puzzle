/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    console.log('running users create table')
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('username', 255)
            .notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
    .hasTable('users')
    .then(async function(exists) {
        if (exists) {
            return knex.schema.dropTable('users');
        };
    });
};
