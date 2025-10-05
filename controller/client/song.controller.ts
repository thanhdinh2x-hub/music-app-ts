
import { Request, Response } from "express";

import Topic from "../../model/topics.model";
import Song from "../../model/song.model";
import Singer from "../../model/singers.model";
import FavoriteSong from "../../model/favarite-song.model";





// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
    const slugTopic: string = req.params.slugTopic;
    console.log(req.params.slugTopic);
    const topic = await Topic.findOne({
        slug: slugTopic,
        deleted: false,
        status: "active"

    });
    console.log(topic);
    console.log(topic.id);


    const songs = await Song.find({ // phải tìm nhiều bản ghi bởi vì nhiều bản ghi thuộc 1 topic
        topicId: topic.id,
        deleted: false,
        status: "active"

    });
    console.log(songs);

    for (const song of songs) {
        const infoSinger = await Singer.findOne({// phải tìm đúng 1 ca sĩ mà có singerId trong bài hát náo đó
            _id: song.singerId,
            deleted: false
        });

        song["infoSinger"] = infoSinger;
    }

    console.log(songs);

    res.render("client/pages/songs/list.pug", {
        pagetitle: topic.title,
        songs: songs

    });
}

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {

    const slugSong: string = req.params.slugSong;
    const song = await Song.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    })

    const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active"

    })

    const topic = await Topic.findOne({
        _id: song.topicId,
        deleted: false

    })
    const favorite = await FavoriteSong.findOne({
        userId: "",
        songId: song.id,
    })

    const checkFavorite= favorite ? true : false; // check xem cái bài này có trong thư mục yêu thích không
    song["isFavoriteSong"] = checkFavorite;  // tạo 1 attribute tạm thời để xuất sang pug thôi chứ ko lưu vào database đâu

    console.log(` object singer: ${singer}`);

    res.render("client/pages/songs/detail.pug", {
        pagetitle: "title",
        song: song,
        singer: singer,
        topic: topic,


    });
}

// [PATCH] /songs/like/:type/:idSong  -- Code theo kiểu API
export const like = async (req: Request, res: Response) => {

    const idSong = req.params.idSong;
    let type = req.params.type;


    const song = await Song.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    })

    let updateLike = song.like;
    console.log(type);

    if (type == "yes") {     // nếu đã like rồi thì backend gửi lên là "yes" nếu ko là "no"
        updateLike = updateLike + 1;

    } else {
        updateLike = updateLike - 1;

        ;


    }
    await Song.updateOne({
        _id: idSong
    }, {
        like: updateLike

    })
    console.log(updateLike);

    res.json({
        code: 200,
        message: "thành công!",
        like: updateLike
    })
}

// [PATCH] /songs/favorite/:type/:idSong  -- Code theo kiểu API để bên front-end fetch API
export const favorite = async (req: Request, res: Response) => {

    const idSong = req.params.idSong;
    let type = req.params.type;
    if (type == "yes") {     // nếu đã like rồi thì backend gửi lên là "yes" nếu ko là "no"

        const existRecording = await FavoriteSong.findOne({  // phải check xem trong databsae có tồn tại bản ghi đó chưa
            userId: "",
            songId: idSong,
        })

        if (!existRecording) {  // trong mục favorite ko có thì thêm    
            const record = new FavoriteSong({
                userId: "",
                songId: idSong,
            });
            await record.save();
        }

    } else {

        await FavoriteSong.deleteOne({  // xoá cứng luôn nhá tại vì ít quan trọng
            userId: "",
            songId: idSong,
        })
    }




    res.json({
        code: 200,
        message: "thành công!",

    })
}

// [PATCH] /songs/:idSong  -- Code theo kiểu API để bên front-end fetch API
export const listen = async (req: Request, res: Response) => {
const idSong: string =req.params.idSong;

const song= await Song.findOne({  // tìm song
    _id: idSong
});

// await Song.updateMany({}, { $set: { listen: 0 } }); // muốn cập nhật trường listen vô tất cả các dữ liệu nhưng đang chưa chạy đc


const listen : number = song.listen + 1; // khi nghe xong 1 bài thì công thêm 1 vào tổng số bài đã được nghe trong listen(do chỉ dùng số để biểu diễn số bài đã nghe nên đơn giản)

await   Song.updateOne({
    _id:idSong
},{
    listen: listen

});

res.json({ // res.json(...) có nghĩa là trả về JSON cho client (ví dụ trình duyệt, Postman, hoặc fetch trong frontend). Nó không log ra console.
        code: 200,
        message: "thành công!",
        listen: listen  // show ra cho bên front-end số lượt nghe bài đó (để bên front-end làm sâu hơn các chức năng số lượt nghe)
    })

}
