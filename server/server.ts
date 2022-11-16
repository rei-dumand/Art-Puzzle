import express, { Express } from 'express';
import cors from 'cors';

import exampleEndpoint from './routes/example';
import newGame from './routes/newgame.controller';
// import guess from './routes/guess.controller';
// import timeout from './routes/timeout.controller';
// import nextRound from './routes/nextround.controller';
// import result from './routes/result.controller';
import newUser from './routes/newuser.controller';
import endGame from './routes/endgame.controller';

const setupServer : Function = () => {
    const app: Express = express();

    app.use(cors());
    app.use(express.json());

    app.use('/example', exampleEndpoint);
    app.use('/newgame', newGame);
    // app.use('/guess', guess);
    // app.use('/timeout', timeout);
    // app.use('/nextround', nextRound);
    // app.use('/result', result)
    app.use('/newuser', newUser);
    app.use('/endgame', endGame)

    return app;
}

export default setupServer;