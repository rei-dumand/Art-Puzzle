"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const example_1 = __importDefault(require("./routes/example"));
const newgame_controller_1 = __importDefault(require("./routes/newgame.controller"));
// import guess from './routes/guess.controller';
// import timeout from './routes/timeout.controller';
// import nextRound from './routes/nextround.controller';
// import result from './routes/result.controller';
const newuser_controller_1 = __importDefault(require("./routes/newuser.controller"));
const setupServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use('/example', example_1.default);
    app.use('/newgame', newgame_controller_1.default);
    // app.use('/guess', guess);
    // app.use('/timeout', timeout);
    // app.use('/nextround', nextRound);
    // app.use('/result', result)
    app.use('/newuser', newuser_controller_1.default);
    return app;
};
exports.default = setupServer;
