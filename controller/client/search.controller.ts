import { Request, Response } from "express";

import { convertToSlug } from "../../helpers/convert-to-slug.helper";
import Song from "../../model/song.model";
import Singer from "../../model/singers.model";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`; // lấy theo query bởi vì bên form search gửi phương thức get

  let songs = []; // tạo 1 danh mục chứa bài hát

  if(keyword) {
    const keywordRegex = new RegExp(keyword, "i"); // dùng regex để tìm theo đúng tên người ta nhập

    const slug = convertToSlug(keyword);// tìm kiếm nâng cao cần cái này
    const keywordSlugRegex = new RegExp(slug, "i");// lại dùng regex để tìm theo slug

    songs = await Song.find({
      $or: [   // dùng or để xem người dùng tìm theo  title hoặc slug 
        { title: keywordRegex },
        { slug: keywordSlugRegex },
      ] 
    });

    if(songs.length > 0) {
      for (const song of songs) { // khi tìm được nhiều songs theo form serch thì lấy ra thông tin của từng ca sĩ của songs đó
        const infoSinger = await Singer.findOne({
          _id: song.singerId,
          deleted: false
        });

        song["infoSinger"] = infoSinger; // gán toàn bộ thông tin vào song để suất sang file pug cho dễ
      }
    }
  }

  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    keyword: keyword,
    songs: songs
  });
};