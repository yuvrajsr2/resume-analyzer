import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads/')

    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
})


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