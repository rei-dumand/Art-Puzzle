import express, { Request, Response } from 'express';

const guessModel = require('./guess.model');
const globalModel = require('./global.model');

const router = express.Router();

const {
    getCurrentGame,
    getTrack,
    incrementRound,
    incrementScore,
    getResult
} = globalModel

const {
    sanitiseInput,
    sanitiseAnswer
} = guessModel

router.post('/', async (req: Request, res: Response) => {

    const clientGameID = req.body.gameID;
    const clientGuess = req.body.guess

    if (clientGameID === undefined || clientGuess === undefined) {
        return res.status(400).send({
            error: "Expected a request body containing: { gameID: '<your_game_id_num>', guess: '<your_guess_str>' }"
        })
    };

    const currentGame = await getCurrentGame(clientGameID);

    if (!currentGame) {
        return res.status(404).send({ error: 'Game not found. We searched real hard... promise.' })
    };

    const songList = currentGame["chosen_songs"];
    const currentRoundTrackID = songList[currentGame.round];

    const currentTrack = await getTrack(currentRoundTrackID)
    const answer = currentTrack.song

    const answerSanitised = sanitiseAnswer(answer)
    const guessSanitised = sanitiseInput(clientGuess)

    console.log("guess: " + clientGuess)
    console.log("possible answers: " + answerSanitised)

    for (let i = 0; i < answerSanitised.length; i++) {
        if (answerSanitised[i] === guessSanitised) {
            const newScore = await incrementScore(currentGame.id)
            if (currentGame.round < currentGame["max_round"]) {
                await incrementRound(currentGame.id, currentGame.round);
            }

            console.log("it's a match!")
            return res.send({
                "gameID": clientGameID,
                "guessMatch": true,
                "roundSuccess": true,
                "result": {
                    "song": currentTrack.song,
                    "artist": currentTrack.artist,
                    "album": currentTrack.album
                },
                "currentScore": newScore[0].score,
            })
        }
    }

    return res.send({ "gameID": clientGameID, "guessMatch": false, "result": {
        "song": currentTrack.song,
        "artist": currentTrack.artist,
        "album": currentTrack.album
    }, });

})

export default router;