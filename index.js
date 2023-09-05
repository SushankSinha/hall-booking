import dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';
import rooms from './router/rooms.js'

dotenv.config({path : './.env'});
const app = express();
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {useUnifiedTopology : true,
  useNewUrlParser : true}).then(() => {
  console.log ("Mongoose connection started")
}).catch((err)=> console.log("Mongoose connection refused", err))

app.listen(PORT, () => console.log("Server starting on port", PORT));

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(rooms)
