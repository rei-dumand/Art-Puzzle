"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newGame = require('./newgame.model');
const { verifyUserID, createGameInstance, insertResultRow } = newGame;
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    let { uId, imageID, gridState } = req.body;
    if (imageID === undefined || uId === undefined || gridState === undefined) {
        return res.status(400).send({ error: 'Expected a request body containing: { "uID": "<uId>", "imageID":"<imageID>", "gridState":"<gridState>" }' });
    }
    const userIDdb = await verifyUserID(uId);
    if (!userIDdb) {
        return res.status(400).send({ error: `user "${uId}" does not exist` });
    }
    gridState = JSON.stringify(gridState);
    const gameID = await createGameInstance(uId, imageID, gridState);
    return res.status(200).send(`${gameID}`);
});
exports.default = router;
