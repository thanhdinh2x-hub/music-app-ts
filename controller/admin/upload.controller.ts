
import { Request, Response } from "express";
import Topic from "../../model/topics.model";







//[POST] /admin/upload/
export const upload = async (req: Request, res: Response) => {

    console.log(req.body);

    res.json({
        location: req.body.file  // Nghĩa là server của bạn upload ảnh xong, lấy được URL online (ví dụ từ Cloudinary) → bạn gói nó vào JSON với key location. TinyMCE sẽ lấy giá trị trong location: "https://...jpg" này để render ảnh trong editor. 
    });


}