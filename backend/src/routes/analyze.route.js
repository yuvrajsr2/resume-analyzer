import express from 'express';


const router = express.Router();

router.post('/upload', (req, res) =>{
    res.send("Upload endpoint");
})


router.post('/analyze', (req, res) =>{
    res.send("Analyze endpoint");
})


export default router;