import express, { raw } from 'express';
import { upload } from '../utils/uploadHandle.js';
import axios from 'axios';
import { PDFParse } from "pdf-parse";
// import { InferenceClient } from '@huggingface/inference';



export default function analyzeRoute(token) {
    const router = express.Router();


    // upload uysing multer
    // router.post('/upload', upload, (req, res) =>{
    //     console.log(req.files);
    //     res.json({message:"Files uploaded ", files:req.files})
    // });
    // im gonna combine upload and analyze in one route only 


    //analyze route using hugging face api
    router.post('/analyze', upload, async (req, res) => {


        //todo fix the if statement below so that we can add both files and normal text input and make it optional
        // maybe check if text input exists then use that else use file upload

        

        // check if files are there and then extract the data from the files
        try {

            if (!req.files || !req.files["resume"] || !req.files["jobDescription"]) {
                return res.status(400).json({ error: "Invalid plz enter both files gang" })
            }


            const resume = req.files['resume'][0];
            const jobDes = req.files['jobDescription'][0];


            const extractData = async (data) => {
                if (data.mimetype === "application/pdf") {
                    const p = new PDFParse({ data: data.buffer });
                    const res = await p.getText();
                    await p.destroy();
                    return res.text;
                }
                else {
                    return data.buffer.toString("utf-8");
                }
            }


            const resumeData = await extractData(resume);
            const jobData = await extractData(jobDes);



          
            const prompt = `
            You are a resume analyzer. Compare the following resume and job description.
            Return:
            - A percentage match (0–100%)
            - 5 key matching skills
            - 5 missing or weak skills
            - 3 short recommendations to improve the resume.

            Resume:
            ${resumeData}

            Job Description:
            ${jobData}
            `;

            // call hugging face api for analysis
            const completion = await axios.post(
                "https://router.huggingface.co/v1/chat/completions",
                {
                    model: "deepseek-ai/DeepSeek-V3-0324", 
                    messages: [{ role: "user", content: prompt }],
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    },
                }
            );

            const analysis = completion.data?.choices?.[0]?.message?.content || "No analysis returned";


            // parse analysis to json (doesnt work properly right now, todo: fix it later)
            let parsedAnal;
            try {
                parsedAnal = JSON.parse(analysis);
            } catch (error) {
                parsedAnal = { error: "Failed to parse analysis", raw: analysis };
            }

            // return formated res
            res.json({
                success: true,
                analysis: parsedAnal,
            });



            console.log("Hugging face response:", analysis);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal error", details: error.message });
        }


    })


    return router;

}