"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('../knexfile');
const knex_1 = __importDefault(require("knex"));
const db = process.env.NODE_ENV === 'production' ? (0, knex_1.default)(config.production) : (0, knex_1.default)(config.development);
exports.default = db;
