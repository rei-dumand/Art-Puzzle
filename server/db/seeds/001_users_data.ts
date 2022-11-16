import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            uId: "192983-AHSBD-7829",
            username: "DummyAccount",
        },
    ]);
};
