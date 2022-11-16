"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("games").del();
    // Inserts seed entries
    await knex("games").insert([
        {
            user_uid: "192983-AHSBD-7829",
            image_id: "11728",
            grid_state: '["5", "0", "4", "2", "3", "1"]',
            hasWon: false,
            started: Date.now(),
        }
    ]);
}
exports.seed = seed;
;
