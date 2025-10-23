import express from 'express';
import multer from 'multer';
import {upload} from '../utils/uploadHandle.js';
import axios from 'axios';
import {PDFParse} from "pdf-parse";




const router = express.Router();


// upload uysing multer
// router.post('/upload', upload, (req, res) =>{
//     console.log(req.files);
//     res.json({message:"Files uploaded ", files:req.files})
// });
// im gonna combine upload and analyze in one route only 


// analyze endpoint:todo using hugging face api to analyze the resume and job description
//todo:take in the uploaded files from the request like req.files.resume and req.files.jobDescription and
// process them accordingly and use the hugging face api to analyze them. and then return 
// the analysis result as json response. the response should be a percetange match 
//and the the key skills matched and not matched and give recommendation to improve the resume.
router.post('/analyze', upload, async (req, res) =>{


    if (!req.files || !req.files["resume"] || !req.files["jobDescription"]){
        return res.status(400).json({error:"Invalid plz enter both files gang"})
    }


    const resume = req.files['resume'][0];
    const jobDes = req.files['jobDescription'][0];


    const extractData = async (data)=>{
        if (data.mimetype === "application/pdf"){
            const p = new PDFParse({data:data.buffer});
            const res = await p.getText();
            await p.destroy();
            return res.text;
        }
        else{
            return data.buffer.toString("utf-8");
        }
    }


    const resumeData = await extractData(resume);
    const jobData = await extractData(jobDes);



    //todo: get hugging face api, then send a axios req to hugging face with the prompt
    


    // return formated res

   



    res.json({message:"Analyze endpoint hit", resume:resumeData, jobDescription:jobData});
    console.log(resumeData, jobData);


    
})


export default router;