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

    sanitiseUserID(userID: string) {
        const lowercaseID = userID.toLowerCase();
        const firstLetter = lowercaseID.charAt(0).toUpperCase();
        const remainingLetters = lowercaseID.slice(1);

        return firstLetter + remainingLetters
    },

    async getUserID(userID: string): Promise<string> {
        const objUserID = await db
            .select('id')
            .from('users')
            .where({ username: userID })
            .first()
        return objUserID
    },

    async getTrackURL(trackID: number) {
        const trackURL = await db
            .select('url')
            .from<Track>('playlist_data')
            .where({ id: trackID })
            .first()
        return trackURL.url
    },

    getRandomTracksID(limit = 5) {
        return db
            .select('id')
            .from<Track>('playlist_data')
            .orderByRaw('Random()')
            .limit(limit)
            .then(arrTrackID => arrTrackID.map(objTrackID => objTrackID.id))
    },

    async createGameInstance(user: string, chosen_songs: Array<number>, round: number, maxRound: number, timestamp: number): Promise<string> {
        return await db('games')
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

    insertResultRow(gameID: number, userID: number, score: number, maxScore: number) {
        return db('results')
            .insert({
                game_id: gameID,
                user_id: userID,
                score: score,
                max_score: maxScore,
            })
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
}