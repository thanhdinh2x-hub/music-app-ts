// Aplayer
const elementAplayer = document.getElementById(`aplayer`);
if (elementAplayer) {
    let dataSong = elementAplayer.getAttribute(`data-song`);
    dataSong = JSON.parse(dataSong); // để chuyển chuỗi JSON trước đó thành object của js
    let dataSinger = elementAplayer.getAttribute(`data-singer`);
    dataSinger = JSON.parse(dataSinger);// để chuyển chuỗi JSON trước đó thành object của js

    const ap = new APlayer({ //cài đặt riêng cho thẻ aplayer
        container: document.getElementById('aplayer'),
        autoplay: true,  // thuộc tính của Aplayer
        lrcType: 1, // có 3 kiểu lyric thì đây là kiểu 1
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
            lrc: dataSong.lyrics // kiểu chèn lyrics thứ 1 từ database vào 


        }// nếu để thêm 1 audio nữa thì nó sẽ thành bài tiếp theo

        ]
    });
    const avatar = document.querySelector(".singer-detail .inner-avatar")
    ap.on('ended', function () {       // đây là chức năng khi nghe hết bài hát
        const link = `/songs/listen/${dataSong._id}`// sẽ tạo ra API để lưu bài đã nghe 
        console.log(link);

        fetch(link, { // fetch API đến đường link bên back end
            method: "PATCH"  // do back-end gửi lên phương thức patch thì front-end phải chuyển thành method patch nếu không mặc định hàm fetch sẽ gửi lên bằng method: get
        }) // mỗi lần call API thì bên back-end tự động công thêm/trừ 1
            .then(res => res.json())// cái res.json() sẽ đi vào biến data bên dưới
            .then((data) => {
                console.log(data)

            })
    });

    ap.on('play', function () {       // đây là chức năng lắng nghe sự kiện của aplayer
        avatar.style.animationPlayState = "running" // để điều chỉnh trong css phải .style  và phải chấm vào thuộc tính cần sửa(nhớ là phải viết theo cammelcase)
    });
    ap.on('pause', function () {       // đây là chức năng lắng nghe sự kiện của aplayer
        avatar.style.animationPlayState = "paused"// để điều chỉnh trong css phải .style  và phải chấm vào thuộc tính cần sửa(nhớ là phải viết theo cammelcase)
    });
}
//end  Aplayer

//button like
const buttonLike = document.querySelector(`[button-like]`); // thuộc tính tự đặt thì phài trong dấu []\


if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        console.log(buttonLike);
        const isActive = buttonLike.classList.contains("active"); // contains để check xem trong class đo có active ko nếu đúng thì trả về true và ngược lại
        console.log(isActive);

        const typeLike = isActive ? "no" : "yes";  // nếu isActive là true thì người ta đang muốn click cái nữa để huỷ like đi thfi hiện lên chữ "no"
        console.log(typeLike);

        const idSong = buttonLike.getAttribute("button-like");
        const link = `/songs/like/${typeLike}/${idSong}`; // nhớ phải "/" trước đường dẫn ko là nó hiểu sai đường dẫn đấy
        console.log(link);

        fetch(link, {
            method: "PATCH"  //
        }) // mỗi lần call API thì bên back-end tự động công thêm/trừ 1
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                const spanlike = buttonLike.querySelector(`[data-like]`);
                spanlike.innerHTML = data.like; // tối về fix tiếp

            })

        buttonLike.classList.toggle("active"); // nếu chưa like thì sau khi fetch thì bật active lên để biết đã like và ngược lại
    })
}

//end button like

//button favorite
const ListButtonFavorite = document.querySelectorAll(`[button-favorite]`); // tìm tất cả các nút button-favorite trong màn hình và chọn ra để gán sự kiện/


if (ListButtonFavorite.length > 0) {
    ListButtonFavorite.forEach(buttonFavorite => {
        buttonFavorite.addEventListener("click", () => {
            console.log(buttonFavorite);
            const isActive = buttonFavorite.classList.contains("active"); // contains để check xem trong class đo có active ko nếu đúng thì trả về true và ngược lại
            console.log(isActive);

            const typeLike = isActive ? "no" : "yes";  // nếu isActive là true thì người ta đang muốn click cái nữa để huỷ like đi thfi hiện lên chữ "no"
            console.log(typeLike);

            const idSong = buttonFavorite.getAttribute("button-favorite");
            const link = `/songs/favorite/${typeLike}/${idSong}`; // nhớ phải "/" trước đường dẫn ko là nó hiểu sai đường dẫn đấy
            console.log(link);

            fetch(link, {
                method: "PATCH"  // do back-end gửi lên phương thức patch thì front-end phải chuyển thành method patch nếu không mặc định hàm fetch sẽ gửi lên bằng method: get
            }) // mỗi lần call API thì bên back-end tự động công thêm/trừ 1
                .then(res => res.json())// cái res.json() sẽ đi vào biến data bên dưới
                .then((data) => {
                    console.log(data)

                })
            buttonFavorite.classList.toggle("active"); // nếu chưa like thì sau khi fetch thì bật active lên để biết đã like và ngược lại

        })
    })

}

//end button favorite

// // tìm kiếm show ra gợi ý (tự làm thêm ) sau khi back-end trả ra data thì front-end show ra list gợi ý và thiết kế lại khung chứa các gợi ý- có thể tìm hiểu set thời gian hiển thị khi người ta gỡ xong

// inputSearch.addEventListener("keyup", () => {
//     const value = inputSearch.value;
//     const link = `/search/keyword/${value}`;
//     fetch(link, {
//         method: "GET"
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
// })

// // end tìm kiếm show ra gợi ý (tự làm thêm )
