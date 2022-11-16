import { json } from 'stream/consumers';
import db from '../db/knex';

interface Track {
    id: number;
    song: string;
    artist: string;
    album: string;
    url: string;
}

module.exports = {

    // sanitiseUserID(userID: string) {
    //     const lowercaseID = userID.toLowerCase();
    //     const firstLetter = lowercaseID.charAt(0).toUpperCase();
    //     const remainingLetters = lowercaseID.slice(1);

    //     return firstLetter + remainingLetters
    // },

    async verifyUserID(uId: string): Promise<string> {
        const userIDdb = await db
            .select('id')
            .from('users')
            .where({ uId: uId })
            .first()
        return userIDdb
    },


    async createGameInstance(uId: string, imageID: string, gridState: JSON): Promise<string> {
        return await db('games')
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

    insertResultRow(gameID: number, userID: number, score: number, maxScore: number) {
        return db('results')
            .insert({
                game_id: gameID,
                user_id: userID,
                score: score,
                max_score: maxScore,
            })
    }

}