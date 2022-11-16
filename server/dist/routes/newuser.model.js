"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../db/knex"));
module.exports = {
    async addUser(uId, username) {
        return await (0, knex_1.default)('users')
            .insert({
            uId: uId,
            username: username,
        })
            .returning('username');
    },
};
