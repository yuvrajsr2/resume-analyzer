import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


import analyzeRoute from './routes/analyze.route.js';



const app = express();
const PORT = process.env.PORT;
const HF_TOKEN = process.env.HF_TOKEN;

app.use("/api", analyzeRoute(HF_TOKEN));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.listen(PORT, ()=>{
    console.log(`Server runnin on port ${PORT}`);
 
})
