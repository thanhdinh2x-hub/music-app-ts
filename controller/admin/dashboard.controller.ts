
import { Request, Response } from "express";







//[GET] /admin/dashboard/
export const dashboard  = async (req: Request, res: Response) => {
   
    res.render("admin/pages/dashboard/index.pug",{
        pagetitle:" Trang tổng quát"
    });
    // res.send("ok");
    
    
}