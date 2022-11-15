"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('results', table => {
        table
            .increments("id")
            .primary();
        table
            .integer('game_id')
            .notNullable()
            .references('id')
            .inTable('games')
            .onDelete('cascade');
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('cascade');
        table
            .integer('score')
            .notNullable();
        table
            .integer('max_score')
            .notNullable();
        table
            .timestamp('end_game')
            .defaultTo(knex.fn.now())
            .notNullable();
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema
            .hasTable('results')
            .then(function (exists) {
            return __awaiter(this, void 0, void 0, function* () {
                if (exists) {
                    return knex.schema.dropTable('results');
                }
                ;
            });
        });
    });
};
