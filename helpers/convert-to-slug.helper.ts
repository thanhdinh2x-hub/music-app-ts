import unidecode from "unidecode";

export const convertToSlug = (text: string): string => {
  // Loại bỏ dấu tiếng Việt và các ký tự đặc biệt
  const unidecodeText: string = unidecode(text); // thư viện sẽ biến text thành text ko dấu
        // tiếp theo dùng regex .replace...
  const slug: string = unidecodeText
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-"); // Loại bỏ nhiều dấu gạch ngang liên tiếp

  return slug; // trả ra cái slug gồm ký tự ko dấu và cách nhau bởi dấu -
};