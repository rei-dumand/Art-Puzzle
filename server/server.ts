import express, { Express } from 'express';
import cors from 'cors';

import exampleEndpoint from './routes/example';
import newGame from './routes/newgame.controller';
import guess from './routes/guess.controller';
import timeout from './routes/timeout.controller';
import nextRound from './routes/nextround.controller';
import result from './routes/result.controller';

const setupServer : Function = () => {
    const app: Express = express();

    app.use(cors());
    app.use(express.json());

    app.use('/example', exampleEndpoint);
    app.use('/newgame', newGame);
    app.use('/guess', guess);
    app.use('/timeout', timeout);
    app.use('/nextround', nextRound);
    app.use('/result', result)

    return app;
}

export default setupServer;