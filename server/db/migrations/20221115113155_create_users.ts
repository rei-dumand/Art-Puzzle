import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table
            .increments('id')
            .primary();
        table
            .string('uid', 255)
            .unique()
            // .notNullable();
        table.
            string('username', 255);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .hasTable('users')
        .then(async function (exists) {
            if (exists) {
                return knex.schema.dropTable('users');
            };
        });
}
