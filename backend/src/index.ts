import express from 'express';
import bodyParser from 'body-parser';
import { auth, requiresAuth } from 'express-openid-connect';
import mongoose from 'mongoose';
import { Socket } from 'socket.io';

require('dotenv').config();

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Headers', 'Origin, x-Requested-With, Content-Type,Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Controll-Allow-Methods', 'GET, POST');
        return res.status(200).json({});
    }
    next();
});

import { router } from '../src/routes/messageRoutes';
app.use('/api/messages', router);

import { myUsersModel } from './model/myUsersModel';



app.get('/', async (req, res) => {
    // console.log(req.oidc.user?.sub)
    const userId = req.oidc.user?.sub
   
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    if (!req.oidc.isAuthenticated()) {
        return res.json({ status: false, data: 'User not logged in' });
    }
    const data = await myUsersModel.create({
        userId: req.oidc.user?.sub,
        user: req.oidc.user
    })
    
    return res.json({ status: true, data: 'User logged in' });
});

const port = process.env.PORT || 3000;

mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => {
        // console.log('database connection successful');
    })
    .catch((err) => {
        // console.log(err.message);
    });

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// listend on socketio

// const io = socket(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         Credential: true,
//     }
// })

// global.onlineUsers = new Map();

// io.on("connection",(socket) =>{
//     global.chatSocket = socket
//     socket.on("add-user",(userId) => onlineUsers.set(userId, socket.id))

//     socket.on("send-msg",(data)=>{
//         const sendUserSocket = onlineUsers.get(data.to)
//         if(sendUserSocket){
//             socket.to(sendUserSocket).emit("msg-recieved", data.message)
//         }
//     })
// })
