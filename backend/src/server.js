import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import analyzeRoute from './routes/analyze.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api", analyzeRoute)


app.listen(PORT, ()=>{
    console.log(`Server runnin on port ${PORT}`);
})
