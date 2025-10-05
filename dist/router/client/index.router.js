"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topics_router_1 = require("./topics.router");
const songs_router_1 = require("./songs.router");
const favoriteSongs_router_1 = require("./favoriteSongs.router");
const search_router_1 = require("./search.router");
const clientRouter = (app) => {
    app.use("/topics", topics_router_1.topicRouter);
    app.use("/songs", songs_router_1.songRouter);
    app.use("/favorite-songs", favoriteSongs_router_1.favoriteSongRouter);
    app.use("/search", search_router_1.searchRoutes);
};
exports.default = clientRouter;
