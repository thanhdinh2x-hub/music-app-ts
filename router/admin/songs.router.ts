import { Express, Router } from "express";
import multer from "multer"
const router: Router = Router();

import * as controller from "../../controller/admin/songs.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer()


router.get("/", controller.songs);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.fields(          // nếu upload nhiều trường thì phải dùng field của multer()
        [
            { name: 'avatar', maxCount: 1 },
            { name: 'audio', maxCount: 1 }
        ]
    ),
    uploadCloud.uploadFields,// hàm upload nhiều file lên cloundiary
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(       // do bên html gửi phương thức patch nên phải cài thêm "var methodOverride = require('method-override') và ..." ở bên trang index
    "/edit/:id",
    upload.fields(          // nếu upload nhiều trường thì phải dùng field của multer()
        [
            { name: 'avatar', maxCount: 1 },
            { name: 'audio', maxCount: 1 }
        ]
    ),
    uploadCloud.uploadFields,// hàm upload nhiều file lên cloundiary
    controller.editPatch
);







export const songRouter: Router = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào  