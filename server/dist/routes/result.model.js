"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
module.exports = {
    getResult(gameID) {
        return (0, knex_1.default)('results')
            .select()
            .where({ game_id: gameID })
            .first();
    },
    getPreviousResult(userID, resultID) {
        return (0, knex_1.default)('results')
            .select()
            .where('id', '<', resultID)
            .orderBy('id', 'desc')
            .first();
    }
};
