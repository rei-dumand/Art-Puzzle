/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.hasTable('users').then(async function(exists) {
    if (exists) {
      await knex('users').del()
    }
  });
  await knex('users').insert([
    { username: "Alex" },
    { username: "Andy" },
    { username: "Angelica" },
    { username: "Azu" },
    { username: "Bibi" },
    { username: "Blake" },
    { username: "Bukky" },
    { username: "Chad" },
    { username: "Cris" },
    { username: "Dominic" },
    { username: "Edjann" },
    { username: "Garrett" },
    { username: "Haruna" },
    { username: "Jay" },
    { username: "Joey" },
    { username: "Juli" },
    { username: "Kamil" },
    { username: "Kazuki" },
    { username: "Kristine" },
    { username: "Michael" },
    { username: "Rei" },
    { username: "Sanju" },
    { username: "Yunn" },
  ] );
};
