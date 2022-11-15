import db from '../db/knex';

module.exports = {

    getResult(gameID: number) {
        return db('results')
            .select()
            .where({ game_id: gameID })
            .first();
    },

    getPreviousResult(userID: number, resultID: number) {
        return db('results')
            .select()
            .where('id', '<', resultID)
            .orderBy('id', 'desc')
            .first()
    }
};