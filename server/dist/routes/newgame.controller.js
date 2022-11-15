"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newGame = require('./newgame.model');
const { sanitiseUserID, getUserID, getRandomTracksID, createGameInstance, getTrackURL, insertResultRow } = newGame;
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const reqName = req.body.username;
    if (reqName === undefined) {
        return res.status(400).send({ error: 'Expected a request body containing: { "username": "<username>" }' });
    }
    ;
    const userObj = await getUserID(sanitiseUserID(reqName));
    if (!userObj) {
        return res.status(404).send({ error: 'Account not found. This is a CC28 members only club. Sorry not sorry :).' });
    }
    ;
    const userID = userObj.id;
    const timestamp = Date.now();
    const randomTrackID = await getRandomTracksID(5);
    const randomTrackIDJSON = JSON.stringify(randomTrackID);
    const gameID = String(await createGameInstance(userID, randomTrackIDJSON, 0, 5, timestamp));
    const songInitialRound = await getTrackURL(randomTrackID[0]);
    await insertResultRow(gameID, userID, 0, 5);
    return res.status(200).send({ gameID: gameID, songURL: songInitialRound });
});
exports.default = router;
