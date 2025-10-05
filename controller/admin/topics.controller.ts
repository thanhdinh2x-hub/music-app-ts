
import { Request, Response } from "express";
import Topic from "../../model/topics.model";







//[GET] /admin/topics/
export const topics  = async (req: Request, res: Response) => {
   const topics= await Topic.find({
    deleted: false,

   });

    res.render("admin/pages/topics/index.pug",{
        pagetitle:" Trang quản lý chủ đề",
        topics: topics
    });
    // res.send("ok");
    
    
}