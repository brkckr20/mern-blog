import express from "express";
import mongoose from "mongoose";
import router from './routes/user';


const app = express();
app.use(express.json());


app.use("/api/user", router);

mongoose.connect("mongodb://localhost:27017/mern-blog")
    .then(() => app.listen(5000))
    .then(() => console.log("Veri tabanına bağlanıldı ve server başladı"))
    .catch(e => console.log(e));

app.use("/api", (req, res, next) => {
    res.send("Hello world!");
});





// mongodb://localhost:27017