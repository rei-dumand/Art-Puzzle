"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
function getCurrentGame(gameID) {
    return (0, knex_1.default)('games')
        .select()
        .where({ id: gameID })
        .first();
}
;
function getTrack(id) {
    return (0, knex_1.default)('playlist_data')
        .select()
        .where({ id: id })
        .first();
}
;
async function getTrackWithGameID(gameID) {
    const currentGame = await getCurrentGame(gameID);
    const currentRound = currentGame.round;
    const songList = currentGame["chosen_songs"];
    const currentRoundTrackID = songList[currentRound];
    return await getTrack(currentRoundTrackID);
}
;
function incrementRound(gameID, currentRound) {
    return (0, knex_1.default)('games')
        .where({ id: gameID })
        .update({ round: currentRound + 1 });
}
;
function incrementScore(gameID) {
    return (0, knex_1.default)('results')
        .where({ game_id: gameID })
        .increment('score', 1)
        .returning('score');
}
;
function getCurrentScore(gameID) {
    return (0, knex_1.default)('results')
        .select('score')
        .where({ game_id: gameID })
        .first();
}
;
module.exports = {
    getCurrentGame,
    getTrack,
    getTrackWithGameID,
    incrementRound,
    incrementScore,
    getCurrentScore
};
