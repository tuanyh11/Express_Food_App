import {Router} from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const router = Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  })

const upload = multer({ dest: 'uploads/', storage: storage })

router.post('/single_image', upload.single('single_image'), (req, res) => {
  try {
    res.status(200).json({success: true, message: 'uploaded  image successfully', data: req.file.filename})
    
  } catch (error) {
    console.log(error)
    res.status(403).json({success: false, message: 'uploaded image field', data: null})
  }
   
})
 
router.post('/multiple_image', upload.array('multiple_image'), (req, res) => {
    
    try {
      const files = req.files.map(({filename, originalname}) => ({originalname, filename}))
     res.status(200).json({success: true, message: 'Successfully uploaded  image successfully', data: files})
    } catch (error) {
      res.status(403).json({success: false, message: 'uploaded image field', data: null})
    }
     
})

router.delete('/delete_image/:id',  (req, res) => {

    if(req.params.id ) {
      const fileId = `${path.resolve()}/uploads/${req.params.id}`
      fs.unlink(fileId, (error) => {
        console.log(error)
        if (error) {
          return res.status(403).json({success: false, message: 'deleted image field', data: null})
        }
        
        return res.status(200).json({success: true, message: 'uploaded product image successfully', data: null})
      })
    }
    
})

export default router