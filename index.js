import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import conn from './Connection/index.js';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import jwt from 'jsonwebtoken'
import defineRouter from './Routes/index.js';
import cors from 'cors'
import path from 'path'
import env from './utils/CONST/index.js'
import { send } from 'process';
import fs from 'fs';
import mongoose from 'mongoose';
  
const app = express();




const startServert = async () => {
    // const server = new ApolloServer({
    //     typeDefs,
    //     resolvers,
        
    //     context: async ({req, res}) => {
    //         const token = req.headers.authorization || '';
    //         const user =  jwt.verify(token, "mykey")
    //         console.log(123)
    //         return
    //     },
    //     includeStacktraceInErrorResponses: false,
    //     formatError: (formattedError, error) => {
    //         // Return a different error message
           
    //         return formattedError;
    //     }
       
    // })

    // await server.start(); 
    
    // server.applyMiddleware({app}) 
    // rest api endpoints 
    
    app.use(cors({
        origin: ["https://food-ec.netlify.app","http://localhost:3001", "http://localhost:3000", "https://homefooddriver.netlify.app", "http://127.0.0.1:5173", "https://dashboardv22.netlify.app", "https://the-coffee-house-v1.netlify.app"]
    }))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())


    app.use('/static', express.static(path.join(path.resolve(), '/uploads')));


    defineRouter(app)

    
    app.use("/", (req, res) => {
        res.send("hello world!");
    })

    // mongoose.set("debug", (collectionName, method, query, doc) => {
    //     console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    // });

    const PORT = env.PORT || 8000

    app.listen(PORT, (error) => {
        if(error) return send(error)
        else console.log(`listening on port ${PORT}`);
    })
}

conn.createConnection(env.URL_DATABASE || 'mongodb://localhost:27017', (error) => {
    if(error) {
        console.log(error);
    } else { 
        startServert() 
    } 
})

