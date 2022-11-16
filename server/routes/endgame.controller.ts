import express, { Request, Response } from 'express';

const endGame = require('./endgame.model');
const {
    markGameAsComplete
} = endGame
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    let {uId, imageID, gridState} = req.body

    if (imageID === undefined || uId === undefined || gridState === undefined) {
        return res.status(400).send({error: 'Expected a request body containing: { "uID": "<uId>", "imageID":"<imageID>", "gridState":"<gridState>" }'})
    }

    gridState = JSON.stringify(gridState)
    const gameID = await markGameAsComplete(uId, imageID, gridState)
    console.log(gameID)
    return res.status(200).send(`${gameID}`)


})

export default router;