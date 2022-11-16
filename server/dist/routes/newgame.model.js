"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
module.exports = {
    // sanitiseUserID(userID: string) {
    //     const lowercaseID = userID.toLowerCase();
    //     const firstLetter = lowercaseID.charAt(0).toUpperCase();
    //     const remainingLetters = lowercaseID.slice(1);
    //     return firstLetter + remainingLetters
    // },
    async verifyUserID(uId) {
        const userIDdb = await knex_1.default
            .select('id')
            .from('users')
            .where({ uId: uId })
            .first();
        return userIDdb;
    },
    async createGameInstance(uId, imageID, gridState) {
        return await (0, knex_1.default)('games')
            .insert({
            user_uId: uId,
            image_id: imageID,
            grid_state: gridState,
            hasWon: false,
            started: Date.now(),
        })
            .returning('id')
            .then(gameID => gameID[0]['id']);
    },
    insertResultRow(gameID, userID, score, maxScore) {
        return (0, knex_1.default)('results')
            .insert({
            game_id: gameID,
            user_id: userID,
            score: score,
            max_score: maxScore,
        });
    }
};
