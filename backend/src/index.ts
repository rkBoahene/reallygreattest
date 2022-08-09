import express from 'express'
import bodyParser from 'body-parser'
import { auth, requiresAuth } from 'express-openid-connect';
import  mongoose  from "mongoose";

require('dotenv').config()

const app = express()

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

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())


app.use((req, res, next) => {
    res.header('Access-Controll-Allow-Origin','*')
    res.header('Access-Controll-Allow-Headers','Origin, x-Requested-With, Content-Type,Accept, Authorization')

    if (req.method == 'OPTIONS') {
        res.header('Access-Controll-Allow-Methods','GET, POST')
        return res.status(200).json({});
    }
    next()
})

import {router} from '../src/routes/messageRoutes'
app.use("/api/messages", router)

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    console.log(req.oidc.user)
    // res.json({msg: req.oidc.isAuthenticated()})
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const port = process.env.PORT || 3000

mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log("database connection successful");
}).catch((err)=>{
    console.log(err.message);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})