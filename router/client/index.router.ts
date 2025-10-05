import { Express } from "express";
import { topicRouter } from "./topics.router";
import { songRouter } from "./songs.router";
import { favoriteSongRouter } from "./favoriteSongs.router";
import { searchRoutes } from "./search.router";


const clientRouter= (app: Express)=>{         //đây là cú phát common js có tác dụng giống với "export const RouteOfClient=()=>{} "

 
    
   app.use("/topics",topicRouter);
   app.use("/songs",songRouter);
   app.use("/favorite-songs",favoriteSongRouter);
   app.use("/search",searchRoutes);




//    app.use(version + "/user",userRouter);


   

}

export default clientRouter;