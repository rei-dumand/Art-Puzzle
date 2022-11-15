"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
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
}
exports.seed = seed;
;
