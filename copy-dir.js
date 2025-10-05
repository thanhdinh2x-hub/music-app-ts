const fs = require("fs-extra");

const listFolderCopy = [  // làm kiểu giống trong hàm promise của fs-extra chỉ khác là tự sáng tạo để add đc nhiều file hơn thôi
  {
    sourceDirectory: "views",
    targetDirectory: "dist/views"
  },
  {
    sourceDirectory: "public",
    targetDirectory: "dist/public"
  }
];

listFolderCopy.forEach(item => { // cũng giống promise của fs-extra 
  fs.copy(item.sourceDirectory, item.targetDirectory, (err) => {
    if (err) {
      console.error(`Lỗi sao chép thư mục ${item.sourceDirectory}:`, err);
    } else {
      console.log(`Sao chép thành công thư mục ${item.sourceDirectory}`);
    }
  });
});