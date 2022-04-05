import React, { useState, useEffect } from "react";
import queryString from 'query-string';
//const queryString = require('query-string');
import io from 'socket.io-client'

import './Chat.css';

let socket;

const Chat = ({ location }) =>
{
    //const parsed = queryString.parse(location.search)
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    
    const ENDPOINT = 'localhost:5000';
    
    const parsed = queryString.parse(location.search);



    useEffect(() => {
        
        const { name, room } = queryString.parse(parsed.location.search);
        socket = io(ENDPOINT);
    
        setRoom(room);
        setName(name);
    }, [ENDPOINT, location.search]);   
    return (
        <h2>chat</h2>
    )
}

export default Chat;