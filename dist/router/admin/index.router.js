"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../config/system");
const dashboard_router_1 = require("./dashboard.router");
const topics_router_1 = require("./topics.router");
const songs_router_1 = require("./songs.router");
const upload_router_1 = require("./upload.router");
const adminRouter = (app) => {
    const prefixAdmin = system_1.systemConfig.prefixAdmin;
    app.use(`/${prefixAdmin}/dashboard`, dashboard_router_1.dashboardRouter);
    app.use(`/${prefixAdmin}/topics`, topics_router_1.topicRouter);
    app.use(`/${prefixAdmin}/songs`, songs_router_1.songRouter);
    app.use(`/${prefixAdmin}/upload`, upload_router_1.uploadRouter);
};
exports.default = adminRouter;
