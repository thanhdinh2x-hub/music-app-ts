import { Express } from "express";

import {systemConfig } from "../../config/system"

import { dashboardRouter } from "./dashboard.router";
import { topicRouter } from "./topics.router";
import { songRouter } from "./songs.router";
import { uploadRouter } from "./upload.router";



const adminRouter= (app: Express)=>{         //đây là cú phát common js có tác dụng giống với "export const RouteOfClient=()=>{} "
   const prefixAdmin = systemConfig.prefixAdmin;

   app.use(`/${prefixAdmin}/dashboard`,dashboardRouter);
   app.use(`/${prefixAdmin}/topics`,topicRouter);
   app.use(`/${prefixAdmin}/songs`,songRouter);
   app.use(`/${prefixAdmin}/upload`,uploadRouter);







//    app.use(version + "/user",userRouter);


   

}

export default adminRouter;