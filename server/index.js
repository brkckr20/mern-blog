import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        author : "Burak Çakır",
        msg : "Hello server"
    });
})

app.use("/posts",postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    })
    .catch(err => console.log(err.message))