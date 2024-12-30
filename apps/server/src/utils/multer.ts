import multer from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

const upload_path = path.resolve(__dirname, "./uploads");
if (!fs.existsSync(upload_path)) {
  fs.mkdirSync(upload_path);
}

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, upload_path);
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix); 
  },
});

const upload = multer({ storage: storage });

export default upload;
