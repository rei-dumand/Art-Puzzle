import express, { Request, Response } from 'express';

const newGame = require('./newgame.model');
const {
    verifyUserID,
    createGameInstance,
    insertResultRow
} = newGame

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    let {uId, imageID, gridState} = req.body

    if (imageID === undefined || uId === undefined || gridState === undefined) {
        return res.status(400).send({error: 'Expected a request body containing: { "uID": "<uId>", "imageID":"<imageID>", "gridState":"<gridState>" }'})
    }

    const userIDdb = await verifyUserID(uId);
 
    if (!userIDdb) {
        return res.status(400).send({error: `user "${uId}" does not exist`})
    }

    gridState = JSON.stringify(gridState)
    const gameID = await createGameInstance(uId, imageID, gridState)

    return res.status(200).send(`${gameID}`)
})

export default router;