import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// End cloudinary

const streamUpload = (buffer: any) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: any) => {
  let result = await streamUpload(buffer);
  return result["url"];
}

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {  // hàm upload 1 file lên thôi
  try {
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = result;
  } catch (error) {
    console.log(error);
  }

  next();
};

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {  // hàm upload nhiều file
  try {
    console.log(req["files"]);  // khi upload file theo multer() thì nó sẽ tạo ra 1 tường files trong req

    for (const key in req["files"]) {   //trong object req["files"] sẽ chứa nhiều cặp key và value
      req.body[key] = [];             // tạo trường key cho req.body để là rỗng

      const array = req["files"][key];  //đi vào từng key/value của từng trường trong req["files"] và value ở đây là mảng
      for (const item of array) {     // đi qua từng phần tử trong mảng
        try {
          const result = await uploadToCloudinary(item.buffer);// . vào buffer để gửi link ảnh lên cloudiary và sẽ trả về đường link onl cho result
          req.body[key].push(result);                 // nhét đường link onl đó vô trường key của req.body
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  next();
};