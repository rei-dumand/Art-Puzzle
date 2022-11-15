"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("results").del();
    // Inserts seed entries
    await knex("results").insert([
        { user_id: 3, game_id: 1, score: 4, max_score: 5 },
    ]);
}
exports.seed = seed;
;
