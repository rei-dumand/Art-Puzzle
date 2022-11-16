"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    // Inserts seed entries
    await knex("users").insert([
        {
            uid: "192983-AHSBD-7829",
            username: "DummyAccount",
        },
    ]);
}
exports.seed = seed;
;
