import db from '../db/knex';

module.exports = {
    async markGameAsComplete(uId: string, imageID: string, gridState: JSON) {
        return db('games')
            .where({ user_uId: uId })
            .where({ image_id: imageID})
            .insert({
                user_uId: uId,
                image_id: imageID,
                grid_state: gridState,
                hasWon: true,
                completed: Date.now()
             })
             .onConflict()
             .merge()
             .returning('id')
    }
}