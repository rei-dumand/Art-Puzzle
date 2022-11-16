import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('received request');
    res.send('Hello from the Server!');
})

export default router;