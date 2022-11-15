"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("../db/knex"));
// This is the instance of a connection to the database.
// let db : Knex = knex();
const router = express_1.default.Router();
router.get('/', (req, res) => {
    // When user clicks on "start game", it should make a knex request for 5 random items from 'playlist' table.
    const queryTracks = (limit = 10) => {
        return knex_1.default.select()
            .from('playlist_data')
            .limit(limit);
    };
    console.log(queryTracks(10));
    // Those 5 random items from 'playlist' 
    res.send('Hello from the Server!');
});
exports.default = router;
