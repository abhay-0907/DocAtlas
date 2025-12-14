
import express from 'express'
import multer from 'multer'
import {upload, fileUploadController } from '../controllers/fileUpload.controller.js'

const router = express.Router()


router.post('/upload/pdf',upload.single('pdf'),fileUploadController)

export default router
