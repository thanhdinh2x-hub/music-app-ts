import express , { Router, Request, Response } from "express";

const router: Router = express.Router();//tạo ra 1 nhánh con của đối tượng ứng dụng Express chính "app"

import * as controller from "../../controller/client/favoriteSong.controller"




router.get("/",controller.index);


export const favoriteSongRouter : Router= router;  // router sẽ sử dụng những phương thức vừa đc gắn vào 