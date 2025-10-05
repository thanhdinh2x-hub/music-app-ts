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
exports.index = void 0;
const favarite_song_model_1 = __importDefault(require("../../model/favarite-song.model"));
const song_model_1 = __importDefault(require("../../model/song.model"));
const singers_model_1 = __importDefault(require("../../model/singers.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favariteSongs = yield favarite_song_model_1.default.find({
        deleted: false
    });
    for (const item of favariteSongs) {
        const infoSong = yield song_model_1.default.findOne({
            _id: item.songId,
            deleted: false,
            status: "active"
        });
        const infoSinger = yield singers_model_1.default.findOne({
            _id: infoSong.singerId,
            deleted: false,
            status: "active"
        });
        item["infoSinger"] = infoSinger;
        item["infoSong"] = infoSong;
    }
    res.render("client/pages/favorite-songs/index.pug", {
        pagetitle: "bài hát yêu thích",
        favariteSongs: favariteSongs
    });
});
exports.index = index;
