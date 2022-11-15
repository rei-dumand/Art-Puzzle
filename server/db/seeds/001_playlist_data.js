const axios = require('axios');
require('dotenv').config({path: '.../.env'});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const https = require('https');

exports.seed = async function(knex) {
  
  await knex('playlist_data').del()
  
  let config = {
    url: `/v1/playlists/3QGJEPt9z4XXWqh2Q4MXIb/tracks`, // 37i9dQZF1DXb57FjYWz00c
    baseURL: 'https://api.spotify.com',
    method: 'get',
    headers: {
      'User-agent': 'PostmanRuntime/7.29.2',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN_SPOTIFY}`
    }
  }
  const playlistData = await axios(config)
  
  for(let i = 0; i < playlistData.data.items.length; i++) {
    let individualTrack = playlistData.data.items[i].track;
    let songName = individualTrack.name;
    let artistName = individualTrack.artists[0].name;
    let albumName = individualTrack.album.name;
    let url = individualTrack['preview_url'];
    
    await knex('playlist_data').insert([
      {song: songName, artist: artistName, album: albumName, url: url},
    ]);

  }
};
