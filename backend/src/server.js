import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.listen(PORT, ()=>{
    console.log(`Server runnin on port ${PORT}`);
})
