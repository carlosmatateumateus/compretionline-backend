import multer, { Options } from "multer"
import { resolve } from "path"

export const multerConfig = { 
  dest: resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024
  },
  fileFilter(req, file, callback) {
    const formats = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ]

    if (formats.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Image not accepted'))
    }
  },
} as Options

