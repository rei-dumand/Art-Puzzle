import { Express } from 'express';
import setupServer from './server';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

let server : Express = setupServer();

(async () => {
    try {
        server.listen(PORT, () => {
            // console.log(process.env)
            console.log(`[server]: Server is running at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error(`server failed to start: ${err}`)
    }
})();

