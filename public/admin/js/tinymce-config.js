tinymce.init({
  selector: 'textarea[textarea-mce]',
  license_key: 'gpl', // 👈 thêm dòng này để tắt cảnh báo
  plugins: 'image',
  image_title: true,
  automatic_uploads: true,
  file_picker_types: 'image',
  images_upload_url: '/admin/upload', //1-Tự động tạo một request POST tới URL /admin/upload. 2-Gửi ảnh trong field file (multipart/form-data). 3-Chờ server trả về JSON có dạng:{ "location": "https://.../image.png" } 4-Nếu JSON hợp lệ → TinyMCE chèn ảnh với src = "location".


  // file_picker_callback: function (cb, value, meta) {  //Đây là cách custom cho phép bạn tự định nghĩa cách chọn và upload file. -  đoạn code này thay bằng đoạn code images_upload_url: 'postAcceptor.php' ở trên để upload dễ hơn không cần tự custom nữa
  //   var input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.onchange = function () {
  //     var file = this.files[0];
  //     var reader = new FileReader();
  //     reader.onload = function () {
  //       var id = 'blobid' + (new Date()).getTime();
  //       var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
  //       var base64 = reader.result.split(',')[1];
  //       var blobInfo = blobCache.create(id, file, base64);
  //       blobCache.add(blobInfo);
  //       cb(blobInfo.blobUri(), { title: file.name });
  //     };
  //     reader.readAsDataURL(file);
  //   };
  //   input.click();
  // },
});