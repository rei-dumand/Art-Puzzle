import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("games").del();

    // Inserts seed entries
    await knex("games").insert([
        {
            user_id: 3, 
            chosen_songs: JSON.stringify([20, 50, 10, 24, 76]),
            round: 5,
            max_round: 5,
            game_start: Date.now(), 
        },
    ]);
};
