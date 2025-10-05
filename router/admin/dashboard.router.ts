import { Express, Router } from "express";
const router: Router  = Router();
import * as controller from "../../controller/admin/dashboard.controller";



    router.get("/", controller.dashboard);


    //    app.use(version + "/user",userRouter);



export const dashboardRouter : Router = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào  