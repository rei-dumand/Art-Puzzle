"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const example_1 = __importDefault(require("./routes/example"));
const newgame_controller_1 = __importDefault(require("./routes/newgame.controller"));
const guess_controller_1 = __importDefault(require("./routes/guess.controller"));
const timeout_controller_1 = __importDefault(require("./routes/timeout.controller"));
const nextround_controller_1 = __importDefault(require("./routes/nextround.controller"));
const result_controller_1 = __importDefault(require("./routes/result.controller"));
const setupServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use('/example', example_1.default);
    app.use('/newgame', newgame_controller_1.default);
    app.use('/guess', guess_controller_1.default);
    app.use('/timeout', timeout_controller_1.default);
    app.use('/nextround', nextround_controller_1.default);
    app.use('/result', result_controller_1.default);
    return app;
};
exports.default = setupServer;
