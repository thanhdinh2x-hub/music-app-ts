"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topics_model_1 = __importDefault(require("../../model/topics.model"));
const song_model_1 = __importDefault(require("../../model/song.model"));
const singers_model_1 = __importDefault(require("../../model/singers.model"));
const favarite_song_model_1 = __importDefault(require("../../model/favarite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    console.log(req.params.slugTopic);
    const topic = yield topics_model_1.default.findOne({
        slug: slugTopic,
        deleted: false,
        status: "active"
    });
    console.log(topic);
    console.log(topic.id);
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        deleted: false,
        status: "active"
    });
    console.log(songs);
    for (const song of songs) {
        const infoSinger = yield singers_model_1.default.findOne({
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
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    });
    const singer = yield singers_model_1.default.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active"
    });
    const topic = yield topics_model_1.default.findOne({
        _id: song.topicId,
        deleted: false
    });
    const favorite = yield favarite_song_model_1.default.findOne({
        userId: "",
        songId: song.id,
    });
    const checkFavorite = favorite ? true : false;
    song["isFavoriteSong"] = checkFavorite;
    console.log(` object singer: ${singer}`);
    res.render("client/pages/songs/detail.pug", {
        pagetitle: "title",
        song: song,
        singer: singer,
        topic: topic,
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    let type = req.params.type;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    let updateLike = song.like;
    console.log(type);
    if (type == "yes") {
        updateLike = updateLike + 1;
    }
    else {
        updateLike = updateLike - 1;
        ;
    }
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        like: updateLike
    });
    console.log(updateLike);
    res.json({
        code: 200,
        message: "thành công!",
        like: updateLike
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    let type = req.params.type;
    if (type == "yes") {
        const existRecording = yield favarite_song_model_1.default.findOne({
            userId: "",
            songId: idSong,
        });
        if (!existRecording) {
            const record = new favarite_song_model_1.default({
                userId: "",
                songId: idSong,
            });
            yield record.save();
        }
    }
    else {
        yield favarite_song_model_1.default.deleteOne({
            userId: "",
            songId: idSong,
        });
    }
    res.json({
        code: 200,
        message: "thành công!",
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong
    });
    const listen = song.listen + 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        listen: listen
    });
    res.json({
        code: 200,
        message: "thành công!",
        listen: listen
    });
});
exports.listen = listen;
