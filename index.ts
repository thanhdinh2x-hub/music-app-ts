import express,{Express, Request, Response} from "express";

import dotenv from "dotenv"
import { connect as connectDatabase } from "./config/database";
// import Topic from "./model/topics.model";
import adminRouter from "./router/admin/index.router";
import clientRouter from "./router/client/index.router";
import {systemConfig } from "./config/system"
import path from "path";
import bodyParser from "body-parser";
import methodOverride from "method-override"; 


dotenv.config();
connectDatabase();
const app: Express = express();

const port: string | number = process.env.PORT;  // typescript nó định nghĩa kiểu dữ liệu như thế vì port từ env nó là string trong khi nhập trực tiếp vào thì là number


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // giúp lấy dữ liệu từ form của HTML dưới dạng 'parse application/x-www-form-urlencoded' thành mã js nghĩa là bên backend có thể truy cấp req.body từ form

// override with POST having ?_method=DELETE or PATCH ,...
app.use(methodOverride('_method'))// dùng để gửi form html theo phương thức khác get và post theo thư viên method-override

app.set("views",`${__dirname}/views`);
app.set("view engine","pug");

app.use(express.static(`${__dirname}/public`));

//TinyMCE
app.use(
    '/tinymce',
    express.static(path.join(__dirname, 'node_modules', 'tinymce'))
    ); // tạo đoạn code chứa router cho tinymce

//End TinyMCE



// App local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin; // khởi tạo biến local để dùng được trong file pug
//Router
adminRouter(app);

clientRouter(app);



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
