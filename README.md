https://music-app-ts-sage.vercel.app/admin/songs
https://music-app-ts-sage.vercel.app/topics

## 📖 Mô tả dự án

Đây là một **Ứng dụng nghe nhạc trực tuyến** được phát triển bằng **TypeScript, Express.js, MongoDB (Mongoose)** và sử dụng **Pug** làm template engine để render giao diện.
Mục tiêu chính của dự án là mô phỏng một nền tảng nghe nhạc cơ bản, nơi người dùng có thể duyệt theo **chủ đề**, xem **danh sách bài hát**, tìm hiểu về **ca sĩ**, và quản lý **danh sách yêu thích** của riêng mình.

### 🎯 Mục đích

Dự án được xây dựng nhằm thể hiện khả năng thiết kế và triển khai một hệ thống backend hoàn chỉnh, với cơ sở dữ liệu có cấu trúc, kiến trúc code rõ ràng, và giao diện động render từ server.

### 🧩 Các chức năng chính

1. **Quản lý Chủ đề (Topics)**

   * Hiển thị danh sách các chủ đề nhạc (ví dụ: Nhạc trẻ, Nhạc trữ tình, Pop).
   * Mỗi chủ đề liên kết với nhiều bài hát.

2. **Quản lý Bài hát (Songs)**

   * Liệt kê danh sách bài hát theo từng chủ đề.
   * Xem chi tiết một bài hát cụ thể (tiêu đề, slug, liên kết, chủ đề liên quan, ca sĩ).

3. **Quản lý Ca sĩ (Singers)**

   * Lưu trữ thông tin ca sĩ.
   * Liên kết ca sĩ với các bài hát.
   * Cung cấp thông tin chi tiết về ca sĩ khi xem bài hát.

4. **Danh sách Yêu thích (Favorite Songs)**

   * Cho phép người dùng thêm bài hát vào danh sách yêu thích.
   * Cho phép xoá bài hát khỏi danh sách yêu thích.
   * Lưu dữ liệu yêu thích trong MongoDB để đảm bảo tính lâu dài.

5. **Chức năng Tìm kiếm (dự kiến)**

   * Trong code đã có **search controller** để mở rộng.
   * Hướng tới việc cho phép người dùng tìm kiếm bài hát, ca sĩ hoặc chủ đề.

6. **View với Pug Template Engine**

   * Các trang web được render động bằng Pug, kết hợp dữ liệu từ MongoDB.
   * Hỗ trợ tổ chức layout và page riêng biệt, dễ tái sử dụng.

7. **Tài nguyên tĩnh (Static Assets)**

   * Hỗ trợ phục vụ CSS, JavaScript, hình ảnh từ thư mục `public/`.
   * Giúp hoàn thiện giao diện cho người dùng cuối.

### ⚙️ Kiến trúc & Công nghệ

* **Kiến trúc:** MVC (Model – View – Controller) rõ ràng, tách biệt từng phần.
* **Backend:** Express.js viết bằng TypeScript, đảm bảo an toàn kiểu dữ liệu.
* **Cơ sở dữ liệu:** MongoDB với Mongoose ODM, quản lý quan hệ giữa Bài hát – Chủ đề – Ca sĩ.
* **View Engine:** Pug để render HTML động trên server.
* **Quản lý môi trường:** dotenv để cấu hình và bảo mật thông tin nhạy cảm.

### 🚀 Luồng hoạt động

1. Người dùng truy cập vào trang chủ → hiển thị danh sách **chủ đề nhạc**.
2. Chọn một chủ đề → hiển thị danh sách **bài hát** thuộc chủ đề đó.
3. Chọn một bài hát → xem chi tiết bài hát và thông tin **ca sĩ liên quan**.
4. Thao tác **thích/huỷ thích** → thêm hoặc xoá bài hát khỏi danh sách yêu thích.
5. Truy cập trang yêu thích → hiển thị toàn bộ các bài hát đã được đánh dấu.

### 🛠️ Khả năng mở rộng

Dự án được thiết kế để dễ dàng mở rộng với các tính năng:

* Đăng nhập và quản lý người dùng.
* Playlist cá nhân hoá và gợi ý nhạc.
* Tìm kiếm nâng cao theo bài hát, ca sĩ, album.
* REST API hoặc GraphQL cho client khác (mobile/web).
* Tích hợp CI/CD và triển khai production.

---

👉 Với phần mô tả này, nhà tuyển dụng chỉ cần đọc qua là hiểu rõ:

* **Ứng dụng này là gì** → Một web app nghe nhạc.
* **Dùng công nghệ gì** → TypeScript + Express + MongoDB + Pug.
* **Có chức năng gì** → Chủ đề, bài hát, ca sĩ, yêu thích, tìm kiếm (chuẩn bị).
* **Điểm mạnh** → Code sạch theo MVC, có tổ chức, dễ mở rộng.

---
Tốt 👌. Mình sẽ thêm phần **How It Works** với sơ đồ luồng bằng ASCII diagram, để nhà tuyển dụng dễ hình dung cách ứng dụng của bạn hoạt động từ lúc người dùng gửi request đến lúc hiển thị giao diện. Bạn có thể thêm phần này vào README sau phần mô tả dự án.

---

## 🔄 How It Works

Dưới đây là sơ đồ luồng xử lý trong ứng dụng:

```plaintext
 [👤 User] 
     │ Gửi request (ví dụ: /songs/123, /topics, /favorites)
     ▼
 [🌐 Express Router] 
     │ Xác định route và gọi Controller tương ứng
     ▼
 [🧩 Controller] 
     │ Xử lý logic nghiệp vụ (topics, songs, singers, favorites)
     │ Gọi Model để truy vấn / ghi dữ liệu
     ▼
 [🗄️ Model (Mongoose + MongoDB)] 
     │ Tương tác với database (tìm, lưu, cập nhật, xóa)
     ▼
 [🧱 Controller] 
     │ Nhận dữ liệu từ Model, xử lý & gửi sang View
     ▼
 [🎨 View (Pug Templates)] 
     │ Render HTML động (danh sách chủ đề, bài hát, ca sĩ, yêu thích)
     ▼
 [👤 User] 
     Hiển thị giao diện cuối cùng trên trình duyệt
```

---

### 📌 Ví dụ luồng thao tác

1. **Người dùng mở trang chủ**

   * Request: `GET /`
   * Router gọi `topics.controller.index`
   * Controller truy vấn MongoDB để lấy danh sách chủ đề → render `views/client/pages/topics/index.pug`.

2. **Người dùng mở một chủ đề nhạc**

   * Request: `GET /songs/:slugTopic`
   * Controller gọi `song.controller.list`
   * Truy vấn tất cả bài hát thuộc chủ đề → render danh sách trong Pug.

3. **Người dùng nhấn thích một bài hát**

   * Request: `POST /songs/like/:id`
   * Controller gọi `song.controller.like`
   * Thêm bài hát vào collection `favorite_songs` trong MongoDB → trả về JSON hoặc redirect.

4. **Người dùng mở trang yêu thích**

   * Request: `GET /favorites`
   * Controller lấy toàn bộ bài hát từ collection `favorite_songs`
   * Render ra danh sách yêu thích trong giao diện Pug.

---

👉 Với phần sơ đồ và ví dụ này, nhà tuyển dụng sẽ thấy ngay:

* Ứng dụng của bạn tuân thủ **luồng MVC chuẩn**.
* Các chức năng được tổ chức rõ ràng, có khả năng mở rộng.
* Bạn hiểu cách kết nối giữa **User – Router – Controller – Model – View**.

---

Bạn có muốn mình vẽ thêm **sơ đồ cấu trúc thư mục** dưới dạng cây minh họa (để đi kèm với sơ đồ luồng này) không?

