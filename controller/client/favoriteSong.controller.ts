
import { Request, Response } from "express";
import FavoriteSong from "../../model/favarite-song.model";
import Song from "../../model/song.model";
import Singer from "../../model/singers.model";


// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
    
    const favariteSongs= await FavoriteSong.find({
        // userId:"",// nếu có tính năng đang nhập thì sẽ lưu trang ưa thích của từng người riêng
        deleted:false
    })
    
    for (const item of favariteSongs) {
        const infoSong= await Song.findOne({
            _id:item.songId,
            deleted:false,
            status:"active"
        })

        const infoSinger= await Singer.findOne({
            _id: infoSong.singerId,
            deleted:false,
            status:"active"
        })

        item["infoSinger"]= infoSinger; // gán hết thông tin vừa tìm được vào item cho đỡ cần phải xuất từng dữ liệu từ Singer sang file pug
        item["infoSong"]= infoSong;// gán hết thông tin vừa tìm được vào item cho đỡ cần phải xuất từng dữ liệu từ Song sang file pug

    }
    res.render("client/pages/favorite-songs/index.pug", {
        pagetitle: "bài hát yêu thích",
        favariteSongs: favariteSongs

    });
}




 