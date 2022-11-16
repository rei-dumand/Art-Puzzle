"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require('axios');
require('dotenv').config({ path: '.../.env' });
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const https = require('https');
exports.seed = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex('playlist_data').del();
        let config = {
            url: `/v1/playlists/37i9dQZF1DXb57FjYWz00c/tracks`,
            baseURL: 'https://api.spotify.com',
            method: 'get',
            headers: {
                'User-agent': 'PostmanRuntime/7.29.2',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.TOKEN_SPOTIFY}`
            }
        };
        const playlistData = yield axios(config);
        for (let i = 0; i < playlistData.data.items.length; i++) {
            let individualTrack = playlistData.data.items[i].track;
            let songName = individualTrack.name;
            let artistName = individualTrack.artists[0].name;
            let albumName = individualTrack.album.name;
            let url = individualTrack['preview_url'];
            yield knex('playlist_data').insert([
                { song: songName, artist: artistName, album: albumName, url: url },
            ]);
        }
    });
};
