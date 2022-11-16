import React from 'react';
import Button from '@mui/material/Button';

type props = {
    handleForm: Function;
    title: string;
}

export default function SubmitButton(props: props) {
    const { handleForm, title } = props;

    return (
        <Button
            variant="contained"
            onClick={() => handleForm()}
            sx={{
                'width': '100%'
            }}
        >{title}
        </Button>
    );
}