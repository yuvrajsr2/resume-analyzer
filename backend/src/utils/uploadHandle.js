import multer from 'multer';
import path from 'path';


const storage = multer.memoryStorage();


const filter = (req, file, cb) =>{
    const allowed = ['application/pdf', 'text/plain'];

    if (allowed.includes(file.mimetype)){
        cb(null, true);
    }

    else{
        cb(new Error("File type not allowed, upload pdf or text"));
    }
}


export const upload = multer({
    storage: storage,
    fileFilter: filter
}).fields([
    {name:'resume', maxCount:1},
    {name:'jobDescription', maxCount:1},
])