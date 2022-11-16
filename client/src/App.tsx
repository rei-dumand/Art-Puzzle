import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios'
import api from './services/axiosconfig'

import Form from './components/Authentication/Form';
import {
    auth,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
} from "./firebase-config";

import Home from './pages/Home'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Explore from './pages/Explore'
import Play from './pages/Play'

import { Artwork } from './types';

function App() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleForm = (id: String) => {
        console.log(id)
        if (id === "login") {
            logInWithEmailAndPassword(email, password)
            navigate("/home")
        } else {
            registerWithEmailAndPassword(username, email, password)
            navigate("/home")

        }
    }
    // console.log(auth);


    let artworkData = useRef<Artwork[] | null>(null);
    let fetchedOnce = useRef<boolean>(false);
    const [arrImgID, setArrImgID] = useState<string[] | null>(null);
    const [heroImgID, setHeroImgID] = useState<string | null>(null);
    let heroImg = useRef<HTMLImageElement | null>(null)

    async function fetchArtworkMetadata() {
        artworkData.current = await axios
            .post<{ data: Artwork[] }>('https://api.artic.edu/api/v1/artworks/search', {
                "fields": ["id", "title", "artist_title", "date_start", "date_end", "place_of_origin", "dimensions", "medium_display", "image_id"],
                "limit": 100,
                "query": {
                    "bool": {
                        "must": [
                            { "match": { "classification_titles": { "query": "painting" } } },
                            { "match": { "style_titles": { "query": "impressionism" } } },
                        ]
                    }
                }
            })
            .then(function (response) {
                return response.data.data
            })
            .catch(function (error) {
                console.error(error);
                return null
            });
    }

    // Call all artworks of relevant collection
    useEffect(() => {
        async function setupImgGrid() {
            await fetchArtworkMetadata();
            let arrArtworkData: Artwork[] = artworkData.current!;
            // console.log(arrArtworkData)
            setArrImgID(arrArtworkData.map((item) => item.image_id))
            const randIndex = Math.floor(Math.random() * arrArtworkData.length)
            setHeroImgID(arrArtworkData[randIndex].image_id)
        }

        if (!fetchedOnce.current) setupImgGrid();

        fetchedOnce.current = true;

    }, [fetchedOnce])

    useEffect(() => {
        if (heroImgID) {
            let img = new Image();
            img.src = `https://www.artic.edu/iiif/2/${heroImgID}/full/800,/0/default.jpg`
            heroImg.current = img;
        }
    }, [heroImgID])

    // Test endpoint to remove
    useEffect(() => {
        api
            .get('/example/')
            .then((res) => {
                console.log(res)
            })
        console.log(artworkData)
    }, [artworkData])


    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={
                    <Home
                        heroImg={heroImg.current}
                        heroImgID={heroImgID}
                        artworkData={artworkData.current}
                        arrImgID={arrImgID}
                    />
                } />
                <Route path="/explore" element={
                    <Explore
                        artworkData={artworkData.current}
                        arrImgID={arrImgID}
                    />
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/play" element={<Play />} />
                <Route path="/login" element={<Login element={
                    <Form
                        title="Login"
                        setUsername={setUsername}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleForm={() => handleForm("login")}
                    />
                } />} />
                <Route path="/signup" element={<Signup element={
                    <Form
                        title="Signup"
                        setUsername={setUsername}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleForm={() => handleForm("signup")}
                    />
                } />} />
            </Routes>
        </div>
    );
}

export default App;
