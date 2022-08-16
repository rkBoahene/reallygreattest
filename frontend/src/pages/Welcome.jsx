import React from 'react'

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Chat from './Chat'
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

export default function Welcome() {

    const enterChat = async() =>{
        const data = await axios.get(`${loginRoute}`)
        console.log(data)
    }

    return (
        <Container>

            <div>
                <button className='welcome-btn' onClick={enterChat}>Welcome</button>
            </div>
        </Container>
    )
    //  <Chat /> 
}

const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.welcome-btn{
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor:pointer;
    border-radius: 0.4rem;
    font-size; 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
        background-color: #4e0eff;
    }
}
`;