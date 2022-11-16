import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GoogleIcon from "@mui/icons-material/Google";
import SubmitButton from './Button';
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase-config";
import './Form.css'

type props = {
    title: string;
    setPassword: Function;
    setEmail: Function;
    setUsername: Function;
    handleForm: Function;
}

export default function BasicTextFields(props: props) {
    const { title, setUsername, setPassword, setEmail, handleForm } = props;

    return (
        <section id="sign-register__container">
            <div className="heading-container">
                <h3>
                    {title} Form
                </h3>
            </div>
            <Box
                component="form"
                sx={{
                    'width': '100%',
                    'display': 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'align-items': 'center',

                    '& > :not(style)': { m: 2, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                { (() => {
                    if (title !== "Login") {
                        return (
                            <TextField
                                id="username"
                                label="Your username"
                                variant="outlined"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        )
                    }
                })()
                }
                <TextField
                    id="email"
                    label="Your Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Your Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <SubmitButton title={title} handleForm={handleForm} />
            <Button
                type="submit"
                variant="outlined"
                endIcon={<GoogleIcon />}
                onClick={signInWithGoogle}
                sx={{
                    'width': '100%'
                }}
            >Sign up with</Button>
        </section>
    );
}