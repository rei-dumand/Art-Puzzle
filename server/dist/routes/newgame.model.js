"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
module.exports = {
    sanitiseUserID(userID) {
        const lowercaseID = userID.toLowerCase();
        const firstLetter = lowercaseID.charAt(0).toUpperCase();
        const remainingLetters = lowercaseID.slice(1);
        return firstLetter + remainingLetters;
    },
    async getUserID(userID) {
        const objUserID = await knex_1.default
            .select('id')
            .from('users')
            .where({ username: userID })
            .first();
        return objUserID;
    },
    async getTrackURL(trackID) {
        const trackURL = await knex_1.default
            .select('url')
            .from('playlist_data')
            .where({ id: trackID })
            .first();
        return trackURL.url;
    },
    getRandomTracksID(limit = 5) {
        return knex_1.default
            .select('id')
            .from('playlist_data')
            .orderByRaw('Random()')
            .limit(limit)
            .then(arrTrackID => arrTrackID.map(objTrackID => objTrackID.id));
    },
    async createGameInstance(user, chosen_songs, round, maxRound, timestamp) {
        return await (0, knex_1.default)('games')
            .insert({
            user_id: user,
            chosen_songs: chosen_songs,
            round: round,
            max_round: maxRound,
            game_start: timestamp,
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
    // async getSongInitialRound(gameID : number) {
    //     return db('games')
    //         .select('chosen_songs')
    //         .where({id: gameID})
    //         .first()
    //         .then(objSongs => objSongs['chosen_songs'][0])
    // }
    // async getGameID(timestamp : number) {
    //     const gameID = await db
    //         .select('id')
    //         .from('games')
    //         .where({game_start: timestamp})
    //         .first()
    //     return gameID.id
    // }
};
