import express, { Request, Response } from 'express';
const newUser = require('./newuser.model');

const {
   addUser,
} = newUser


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {

    const {uId, username} = req.body;

    if (username === undefined || uId === undefined) {
        return res.status(400).send({error: 'Expected a request body containing: { "username": "<username>", "imageID":"<imageID>" }'})
    } else {
        const usernameDB = await addUser(uId, username);
        return res.status(200).send(usernameDB)
    }


})

export default router;