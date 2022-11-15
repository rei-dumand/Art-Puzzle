"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalModel = require('./global.model');
const resultsModel = require('./result.model');
const { getCurrentGame } = globalModel;
const { getResult, getPreviousResult } = resultsModel;
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const clientGameID = req.body.gameID;
    if (req.body.gameID == undefined) {
        return res.status(400).send({
            error: "Expected a request body containing: { gameID: '<your_game_id_num>' }"
        });
    }
    ;
    const currentGame = await getCurrentGame(clientGameID);
    if (!currentGame) {
        return res.status(404).send({ error: 'Game not found. We searched real hard... promise.' });
    }
    ;
    const gameResult = await getResult(clientGameID);
    console.log(gameResult);
    const previousResults = await getPreviousResult(currentGame.user_id, gameResult.id);
    console.log(previousResults);
    return res
        .status(200)
        .send({
        "gameID": clientGameID,
        "score": gameResult.score,
        "previousScore": previousResults.score
    });
});
exports.default = router;
