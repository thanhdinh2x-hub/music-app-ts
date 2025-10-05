import { Express, Router } from "express";
const router: Router  = Router();

import * as controller from "../../controller/admin/topics.controller";



    router.get("/", controller.topics);


    //    app.use(version + "/user",userRouter);



export const topicRouter : Router = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào  