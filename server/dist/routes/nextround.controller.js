"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nextRoundModel = require('./guess.model');
const globalModel = require('./global.model');
const router = express_1.default.Router();
const { getCurrentGame, getTrackWithGameID } = globalModel;
const { getNextRoundTrackURL } = nextRoundModel;
router.post('/', async (req, res) => {
    const clientGameID = req.body.gameID;
    if (req.body.gameID == undefined) {
        return res.status(400).send({
            error: "Expected a request body containing: { gameID: '<your_game_id_num>' }"
        });
    }
    ;
    const currentGame = await getCurrentGame(clientGameID);
    const nextRound = currentGame.round + 1;
    if (!currentGame) {
        return res.status(404).send({ error: 'Game not found. We searched real hard... promise.' });
    }
    ;
    if (currentGame.round < currentGame["max_round"]) {
        const nextTrack = await getTrackWithGameID(clientGameID);
        const nextTrackURL = nextTrack.url;
        return res
            .status(200)
            .send({ "gameID": clientGameID, "songURL": nextTrackURL, "round": nextRound });
    }
    else {
        return res
            .status(200)
            .send({ "gameID": clientGameID, "gameEnd": true });
    }
});
exports.default = router;
