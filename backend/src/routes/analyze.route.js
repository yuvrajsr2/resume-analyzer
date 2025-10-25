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


    // analyze endpoint:todo using hugging face api to analyze the resume and job description
    //todo:take in the uploaded files from the request like req.files.resume and req.files.jobDescription and
    // process them accordingly and use the hugging face api to analyze them. and then return 
    // the analysis result as json response. the response should be a percetange match 
    //and the the key skills matched and not matched and give recommendation to improve the resume.
    router.post('/analyze', upload, async (req, res) => {

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



            // need to fix the api call to hugging face
            // employ a query func to send the prompt and get the response
            // call the query function with the prompt and model name 



            //todo: get hugging face api, then send a axios req to hugging face with the prompt
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


            const completion = await axios.post(
                "https://router.huggingface.co/v1/chat/completions",
                {
                    model: "deepseek-ai/DeepSeek-V3-0324", // remove :novita unless needed
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