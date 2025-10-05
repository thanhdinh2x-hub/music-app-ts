
import { Request, Response } from "express";

import Topic from "../../model/topics.model";






export const index = async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted:false
    })
    console.log(topics);
    res.render("client/pages/topics/index.pug",{
        pagetitle:" Chủ đề bài hát",
        topics: topics
    });
}