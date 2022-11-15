/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('playlist_data', table => {
    table.increments('id').primary();
    table.string('song', 255)
        .notNullable();
    table.string('artist', 255);
    table.string('album', 255);
    table.string('url', 255);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
  .hasTable('playlist_data')
  .then(async function(exists) {
    if (exists) {
        return knex.schema.dropTable('playlist_data');
      };
  });
};
