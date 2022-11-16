"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newUser = require('./newuser.model');
const { addUser, } = newUser;
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const { uId, username } = req.body;
    if (username === undefined || uId === undefined) {
        return res.status(400).send({ error: 'Expected a request body containing: { "username": "<username>", "imageID":"<imageID>" }' });
    }
    else {
        const usernameDB = await addUser(uId, username);
        return res.status(200).send(usernameDB);
    }
});
exports.default = router;
