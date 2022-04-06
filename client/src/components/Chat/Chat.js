import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from 'query-string';
//const queryString = require('query-string');
import io from 'socket.io-client'

import './Chat.css';

let socket;

const Chat = ({ location }) =>
{ 
    const [searchParams] = useSearchParams();
    //const currentParams = Object.fromEntries([...searchParams])
   
    
    //const parsed = queryString.parse(location.search)
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const ENDPOINT = 'http://localhost:5000';
    
     useEffect(() => {
        
        const { name, room } = queryString.parse(searchParams.location);    
        socket = io(ENDPOINT, {transports : ['websocket']})
        
        setRoom(room);
        setName(name);

        socket.emit("join", ({ name, room }) =>{
            console.log(name,room);
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, [ENDPOINT, searchParams.location]);
    
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        })
        
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage('')); // clear 
        }
    }

    console.log(message, messages);
    return (
        <div className="outerContainer">
        <div className="container">
        <input 
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
        
        </div>
        </div>

    )
}

export default Chat;