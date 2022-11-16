import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('games', table => {
        table
            .increments("id")
            .primary();
        table
            .string('user_uid', 255)
            .notNullable()
            .references('uid')
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
            .bigInteger('completed')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
    .hasTable('games')
    .then(async function(exists) {
        if (exists) {
            return knex.schema.dropTable('games');
        };
    });
}

