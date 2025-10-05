import { Express, Router } from "express";
import multer from "multer"
const router: Router = Router();

import * as controller from "../../controller/admin/upload.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer()


router.post(  // mặc định images_upload_url: 'postAcceptor.php' bên tinymce gửi lên theo phương thức post
    "/",
    upload.single("file"),  // mặc định tinymce gửi link ảnh vô trường file- multer sẽ parse file -> req.file
    uploadCloud.uploadSingle,// hàm upload nhiều file lên cloundiary- upload lên Cloudinary -> gắn link vào req.body.file
    controller.upload // gửi JSON về cho TinyMCE
); 
 






export const uploadRouter: Router = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào  