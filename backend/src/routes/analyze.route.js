import express from 'express';
import {upload} from '../utils/uploadHandle.js';


const router = express.Router();


// upload uysing multer
router.post('/upload', upload, (req, res) =>{
    console.log(req.files);
    res.json({message:"Files uploaded ", files:req.files})
})



// analyze endpoint:todo using hugging face api to analyze the resume and job description
//todo:take in the uploaded files from the request like req.files.resume and req.files.jobDescription and
// process them accordingly and use the hugging face api to analyze them. and then return 
// the analysis result as json response. the response should be a percetange match 
//and the the key skills matched and not matched and give recommendation to improve the resume.
router.post('/analyze', (req, res) =>{
    res.send("Analyze endpoint");
})


export default router;