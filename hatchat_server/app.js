import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from "mongoose";
import users from './routes/users.js'
import authenticator from './routes/authenticator.js'
import chat from './routes/chat.js';
import customEnv from 'custom-env';

const app = express();
import {Server} from "socket.io";
import {createServer} from "http";

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ["GET", "POST", "DELETE"],
    },
});

const sockets = {};


io.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join', (username) => {
        sockets[username] = socket;
        console.log(username + ' joined the chat');
    });
});


customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);


const connectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(process.env.CONNECTION_STRING, connectOptions)
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });


app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/Users', users);
app.use('/api/Tokens', authenticator);
app.use('/api/Chats', chat);

httpServer.listen(process.env.PORT);
