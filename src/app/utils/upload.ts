import path from 'path';
import fs from 'fs';
// import  sharp from 'sharp';
import multer from 'multer';

const UPLOADS_FOLDER = './public/uploads/images';

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const deleteImage = (fileName: string) => {
  fs.unlinkSync(`./public/uploads/images/${fileName}`);
};

export default { upload, deleteImage };
