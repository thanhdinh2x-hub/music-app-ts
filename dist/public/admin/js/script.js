console.log("ok")
// Preview Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (event) => {
        console.log(uploadImageInput);
        console.log(event);
        const [file] = uploadImageInput.files; // event.target chính là uploadImageInput----Cú pháp [file] là một cách sử dụng destructuring assignment để lấy tệp tin đầu tiên từ FileList. Nó tương đương với const file = uploadImageInput.files[0];
        // Trình duyệt sẽ gắn danh sách file được chọn vào thuộc tính .files của phần tử <input type="file">. files là một mảng-like object, nên bạn có thể lấy file đầu tiên bằng uploadImageInput.files[0]
        console.log(file);
        if (file) { // nếu lấy được ra cái file thì gắn lại src cho ô img

            uploadImagePreview.src = URL.createObjectURL(file);//Biến URL không phải do bạn khai báo, mà là một đối tượng toàn cục (global object) do trình duyệt cung cấp.
            // URL.createObjectURL(file) sẽ tạo 1 đường link giả cho cái file vừa up lên 
            //URL.createObjectURL là một phương thức trong JavaScript, được sử dụng để tạo một URL đặc biệt (blob URL hoặc data URL) đại diện cho một đối tượng blob hoặc file.
        }                                                    //Khi bạn muốn hiển thị hình ảnh hoặc nội dung của tệp tin trong trình duyệt mà không cần tải nó từ máy chủ, bạn có thể sử dụng URL.createObjectURL để tạo một URL dựa trên nội dung của file đó.
    });                                                       // nghĩa là gán  URL.createObjectURL(file) vào src của thẻ <img> trong file pug
}
// End Preview Image

// Preview audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadImage) {
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
    const source = uploadAudioPlay.querySelector("source");

    uploadAudioInput.addEventListener("change", (event) => {
        console.log(uploadAudioInput);
        console.log(event);
        const audio = URL.createObjectURL(event.target.files[0]); // event.target chính là uploadAudioInput----Cú pháp [file] là một cách sử dụng destructuring assignment để lấy tệp tin đầu tiên từ FileList. Nó tương đương với const file = uploadAudioInput.files[0];
        // Trình duyệt sẽ gắn danh sách file được chọn vào thuộc tính .files của phần tử <input type="file">. files là một mảng-like object, nên bạn có thể lấy file đầu tiên bằng uploadImageInput.files[0] //Biến URL không phải do bạn khai báo, mà là một đối tượng toàn cục (global object) do trình duyệt cung cấp.
        // URL.createObjectURL(file) sẽ tạo 1 đường link giả cho cái file vừa up lên 
        //URL.createObjectURL là một phương thức trong JavaScript, được sử dụng để tạo một URL đặc biệt (blob URL hoặc data URL) đại diện cho một đối tượng blob hoặc file. //Khi bạn muốn hiển thị hình ảnh hoặc nội dung của tệp tin trong trình duyệt mà không cần tải nó từ máy chủ, bạn có thể sử dụng URL.createObjectURL để tạo một URL dựa trên nội dung của file đó.
        // nghĩa là gán  URL.createObjectURL(file) vào src của thẻ <img> trong file pug
        console.log(audio);
        if (audio) { // nếu lấy được ra cái file thì gắn lại src cho ô audio

            source.src = audio;
            uploadAudioPlay.load(); // đối với file audio thì muốn bật được nó lên thì phải có hàm load()
        }
    });
}
// End Preview audio