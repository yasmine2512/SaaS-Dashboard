import multer from "multer"
import path from "path"

// Save files to "uploads/" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/") // make sure folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

export const upload = multer({ storage })