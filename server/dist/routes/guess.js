"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    // req expected to be a string submitted by user.
    // 01 Sanitise the data
    // 02 
    res.send('Hello from the Server!');
});
exports.default = router;
