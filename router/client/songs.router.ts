import express , { Router, Request, Response } from "express";

const router: Router = express.Router();//tạo ra 1 nhánh con của đối tượng ứng dụng Express chính "app"

import * as controller from "../../controller/client/song.controller"




router.get("/:slugTopic",controller.list);

router.get("/detail/:slugSong",controller.detail);

router.patch("/like/:type/:idSong",controller.like);

router.patch("/favorite/:type/:idSong",controller.favorite);

router.patch("/listen/:idSong",controller.listen);









export const songRouter : Router= router;  // router sẽ sử dụng những phương thức vừa đc gắn vào 