import express from 'express';
import {upload} from '../utils/uploadHandle.js';


const router = express.Router();


// upload uysing multer
router.post('/upload', upload, (req, res) =>{
    console.log(req.files);
    res.json({message:"Files uploaded ", files:req.files})
})



// analyze endpoint:todo using hugging face api to analyze the resume and job description
router.post('/analyze', (req, res) =>{
    res.send("Analyze endpoint");
})


export default router;