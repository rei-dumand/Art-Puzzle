import express, { Request, Response } from 'express';

const nextRoundModel = require('./guess.model');
const globalModel = require('./global.model');

const router = express.Router();

const { getCurrentGame, getTrackWithGameID } = globalModel

const { getNextRoundTrackURL } = nextRoundModel

router.post('/', async (req: Request, res: Response) => {
    const clientGameID = req.body.gameID;

    if (req.body.gameID == undefined) {
        return res.status(400).send({
            error: "Expected a request body containing: { gameID: '<your_game_id_num>' }"
        })
    };

    const currentGame = await getCurrentGame(clientGameID)
    const nextRound = currentGame.round + 1

    if (!currentGame) {
        return res.status(404).send({ error: 'Game not found. We searched real hard... promise.' })
    };

    if (currentGame.round < currentGame["max_round"]) {
        const nextTrack = await getTrackWithGameID(clientGameID)
        const nextTrackURL = nextTrack.url

        return res
            .status(200)
            .send({ "gameID": clientGameID, "songURL": nextTrackURL, "round": nextRound })
    } else {
        return res
            .status(200)
            .send({ "gameID": clientGameID, "gameEnd": true })
    }

});

export default router;