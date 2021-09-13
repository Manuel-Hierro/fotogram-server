"use strict";
/*
esto nose si lo transpilara bien de TS a JS

import dotenv from 'dotenv';
dotenv.config();
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
// Cors
server.app.use(cors_1.default());
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
// Rutas de mi aplicacion
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);

// Conectar DB
// mongoose.connect('mongodb://localhost:27017/fotosgram', 
// mongoose.connect( process.env.MONGO_URI,
mongoose_1.default.connect( process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
