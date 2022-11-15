import db from '../db/knex';

function getCurrentGame(gameID: number) {
    return db('games')
        .select()
        .where({ id: gameID })
        .first()
};

function getTrack(id: number) {
    return db('playlist_data')
        .select()
        .where({ id: id })
        .first()
};

async function getTrackWithGameID(gameID: number) {
    const currentGame = await getCurrentGame(gameID);
    const currentRound = currentGame.round;
    const songList = currentGame["chosen_songs"];
    const currentRoundTrackID = songList[currentRound];
    return await getTrack(currentRoundTrackID)
};

function incrementRound(gameID: number, currentRound: number) {
    return db('games')
        .where({ id: gameID })
        .update({ round: currentRound + 1 })
};

function incrementScore(gameID: number) {
    return db('results')
        .where({ game_id: gameID })
        .increment('score', 1)
        .returning('score')
};

function getCurrentScore(gameID: number) {
    return db('results')
        .select('score')
        .where({ game_id: gameID })
        .first();
};

module.exports = {
    getCurrentGame,
    getTrack,
    getTrackWithGameID,
    incrementRound,
    incrementScore,
    getCurrentScore
}