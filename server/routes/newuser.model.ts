import db from '../db/knex';

module.exports = {

    
    async addUser(uId: string, username: string): Promise < string > {
        return await db('users')
        .insert({
                uId: uId,
                username: username,
        })
        .returning('username')
    },



}