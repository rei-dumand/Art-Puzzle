import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("results").del();

    // Inserts seed entries
    await knex("results").insert([
        { user_id: 3, game_id: 1, score: 4, max_score: 5 },
    ]);
};