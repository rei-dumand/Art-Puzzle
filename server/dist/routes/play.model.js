"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { query } from 'express';
// import knex, { Knex } from 'knex';
const knex_1 = __importDefault(require("../db/knex"));
module.exports = {
    queryTracks(limit = 10) {
        return knex_1.default
            .select()
            .from('playlist_data')
            .orderByRaw('Random()')
            .limit(limit);
    },
};
