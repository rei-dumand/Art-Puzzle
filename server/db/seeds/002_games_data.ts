import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("games").del();

    // Inserts seed entries
    await knex("games").insert([
        {
            user_uId: "192983-AHSBD-7829",
            image_id: "11728",
            grid_state: '["5", "0", "4", "2", "3", "1"]',
            hasWon: false,
            started: Date.now(),
        }
    ]);
};