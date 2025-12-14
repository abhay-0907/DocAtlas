import multer from 'multer'
import { Queue } from "bullmq";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

export const upload = multer({ storage: storage });

const queue = new Queue('pdf-queue');
export const fileUploadController = async (req,res)=>{
    await queue.add('pdf-queue',JSON.stringify({
        fileName: req.file.originalname,
        filePath: req.file.path,
        destination: req.file.destination
    }))
    console.log("file uploaded successfully")
    res.status(200).json({message:"File uploaded successfully"})
}