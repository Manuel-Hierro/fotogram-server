/*
esto nose si lo transpilara bien de TS a JS 

import dotenv from 'dotenv';
dotenv.config();
*/

import Server from './clases/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

import cors from 'cors';

const server = new Server();

// Cors
server.app.use(cors());

// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// FileUpload
server.app.use(fileUpload({ useTempFiles: true }));

// Rutas de mi aplicacion
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Conectar DB
// mongoose.connect('mongodb://localhost:27017/fotosgram', 
// mongoose.connect( process.env.MONGO_URI,
if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
        if (err) throw err;    
        console.log('Base de datos ONLINE');    
    });   
}

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});

