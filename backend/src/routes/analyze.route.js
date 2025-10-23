import express from 'express';


const router = express.Router();

router.post('/', (req, res) =>{
    res.send("Upload endpoint");
})


router.post('/api/upload', (req, res) =>{
    res.send("Upload endpoint");
})


export default router;