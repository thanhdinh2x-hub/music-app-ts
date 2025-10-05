
import { Request, Response } from "express";
import Topic from "../../model/topics.model";
import Song from "../../model/song.model";
import Singer from "../../model/singers.model";
import { systemConfig } from "../../config/system";







//[GET] /admin/songs/
export const songs = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false,

    });

    res.render("admin/pages/songs/index.pug", {
        pagetitle: " Trang quản lý bài hát",
        songs: songs
    });
    // res.send("ok");


}

//[GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false,

    });
    const topics = await Topic.find({
        deleted: false,

    });
    const singers = await Singer.find({
        deleted: false
    })
    res.render("admin/pages/songs/create.pug", {
        pagetitle: " Trang quản lý bài hát",
        songs: songs,
        topics: topics,
        singers: singers
    });
    // res.send("ok");


}

//[POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];

    }

    if (req.body.audio) {
        req.body.audio = req.body.audio[0];

    }
    //    console.log(req.body);
    const song = new Song(req.body);
    await song.save();



    res.redirect(`/${systemConfig.prefixAdmin}/songs`);


}
//[GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;

    const songs = await Song.findOne({
        _id: id,
        deleted: false,

    });
    const topics = await Topic.find({
        deleted: false,

    }).select("title");

    const singers = await Singer.find({
        deleted: false
    }).select("fullName");

    //    console.log(singers);
    //    console.log(topics);
    console.log(songs);



    res.render("admin/pages/songs/edit.pug", {
        pagetitle: " Chỉnh sửa bài hát",
        song: songs,
        topics: topics,
        singers: singers
    });
    // res.send("ok");


}

//[PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];

    }

    if (req.body.audio) {
        req.body.audio = req.body.audio[0];

    }
    //    console.log(req.body);
    const song = await Song.updateOne({
        _id: id
    }, req.body);
    



    res.redirect(`back`);


}