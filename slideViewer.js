var func_slideViewer = {
    start_slideTalk: null,
    getHeadline: null,
    setImg: null,
    slideShow: null,
    makeShowArea: null,
}

var slideViewer_NameObj = {
    slideBtn: "slideBtn",
    slideFrame: "slideFrame"
}

var slideBtn = $(`<div id="${slideViewer_NameObj.slideBtn}"></div>`);

// var btn_flg = 'OFF';

var slideButtontop = windowInH * 0.8; // ウィンドウの高さに合わせた位置(windowInHはLocalZooming.jsより拝借)
var slideButtonleft = windowInW * 0.8; // ウィンドウの幅に合わせた位置(windowInWはLocalZooming.jsより拝借)

slideBtn.css({
    position: 'absolute',
    top: slideButtontop,
    //    left: 2050 + 'px', // もとは2450px
    left: slideButtonleft,
    width: `${150}px`,
    height: `${50}px`,
    zIndex: 2000,
    //lineWidth : 480 + 'px',
    textAlign: 'center',
    lineHeight: `${50}px`,
    color: '#ffffff',
    backgroundColor: '#2980b9',
    cursor: 'pointer'
});

objBody.appendChild(slideBtn[0]);
$(`#${slideViewer_NameObj.slideBtn}`).text(`会話スライド${btn_flg}`);

$(`#${slideViewer_NameObj.slideBtn}`).click(function (event) {
    console.log("スライドボタン");

    if (btn_flg === 'OFF') { // 会話モード起動処理
        btn_flg = 'ON';
        console.log('会話モードON');

        // slideFrame = $('<div id="' + slideViewer_NameObj.slideFrame + '"></div>');

        // slideFrame.css({
        //     // display: 'none',
        //     // top: talkModeBtn.offset().top * 1.07,
        //     top: 0,
        //     // left: talkModeBtn.offset().left,
        //     left: 0,
        //     // width: simResultAreaWidth,
        //     width: 2000 + 'px',
        //     // height: simResultHeight,
        //     height: 1350 + 'px',
        //     marginTop: 5 + 'px',
        //     border: '1px solid #000000',
        //     // backgroundColor: '#FFF',
        //     backgroundColor: 'rgba(0,0,0,0.8)', // 背景のみ透明
        //     //        padding: 2 + 'px',
        //     position: 'absolute',
        //     zIndex: 100,
        // });

        // objBody.appendChild(slideFrame[0]);
        // $('#' + slideViewer_NameObj.slideBtn).text('会話スライド' + btn_flg);

        // func_slideViewer.start_slideTalk();
        // startTalk('slideViewer');
        testTalk('slideViewer');

    } else { // 会話モード終了処理
        btn_flg = 'OFF';
        console.log('会話モードOFF');

        $(`#${slideViewer_NameObj.slideFrame}`).remove();
        $(`#${slideViewer_NameObj.slideBtn}`).text(`会話スライド${btn_flg}`);

    }
});

func_slideViewer.makeShowArea = function () {
    slideFrame = $(`<div id="${slideViewer_NameObj.slideFrame}"></div>`);

    slideFrame.css({
        // display: 'none',
        // top: talkModeBtn.offset().top * 1.07,
        top: 0,
        // left: talkModeBtn.offset().left,
        left: 0,
        // width: simResultAreaWidth,
        width: 2000 + 'px',
        // height: simResultHeight,
        height: 1350 + 'px',
        marginTop: 5 + 'px',
        border: '1px solid #000000',
        // backgroundColor: '#FFF',
        backgroundColor: 'rgba(0,0,0,0.8)', // 背景のみ透明
        //        padding: 2 + 'px',
        position: 'absolute',
        zIndex: 100,
    });

    objBody.appendChild(slideFrame[0]);
    $(`#${slideViewer_NameObj.slideBtn}`).text(`会話スライド${btn_flg}`);
}

/**
 * スライド表示
 * @param {Object} simResultInfo 発言と類似した見出し画像の情報を格納した連想配列
 */
func_slideViewer.slideShow = function (simResultInfo) {
    // console.log(speechRecognitionResult);
    // result = func_pyCom.getHeadline(speechRecognitionResult);
    console.log(simResultInfo.length);
    func_slideViewer.setImg(simResultInfo);
}

/**
 * 見出し画像をフレーム内に配置
 * @param {Object} simResultInfo 発言と類似した見出し画像の情報を格納した連想配列
 */
func_slideViewer.setImg = function (simResultInfo) {
    console.log('*********setImg*********');

    $('#midashi').remove();

    slider = $('<ul class=slider>');
    document.getElementById(slideViewer_NameObj.slideFrame).appendChild(slider[0]);

    for (var i = 0; i < simResultInfo.length; i++) {
        /*見出し画像の情報を取得*/
        imgSrc = simResultInfo[i].path; // パス
        imgWidth = simResultInfo[i].width; // 幅
        imgHeight = simResultInfo[i].height; // 高さ

        console.log(`path: ${imgSrc}`);

        //        console.log('元画像　幅:' + imgWidth + ' 高さ:' + imgHeight);

        // 画像をリサイズする
        var imgSize = func_trimView.midashiSide.resizeImg(imgWidth, imgHeight); // 画像の縮小後のサイズ (0:幅, 1:高さ)

        //        console.log('縮小後　幅:' + imgSize[0] + ' 高さ:' + imgSize[1]);

        // 1つの見出しを格納する枠
        // var simResultDiv = $('<div id=simResultDivId' + i + ' class=' + slideViewer_NameObj.slideFrame + '>');

        // simResultDiv.css({
        //     //            display: 'none',
        //     //            top: 0 + 'px',
        //     //            left: 0 + 'px',
        //     //            maxWidth: 100 + '%',
        //     //            heigth: autoHeigth + 'px',
        //     //            width: autoWidth + 'px',
        //     //margin: 5 + 'px',
        //     //            width: 98 + 'px',
        //     width: imgSize[0],
        //     //            width: 100 + "px",
        //     //            height: 98 + 'px',
        //     height: imgSize[1],
        //     //            height: 100 + "px",
        //     //            size: 100 + 'px',
        //     position: 'absolute',
        //     border: "1px solid #000000",
        //     //            padding: 0,
        //     cursor: 'ponter'
        // });

        // var simResultImg = $('<li><img src=' + talkKenbunPathObj.midashiDirPath + imgSrc + ' name=' + imgSrc + ' width=' + imgSize[0] + ' height=' + imgSize[1] + ' class="midashi"></li>');
        var simResultImg = $(`<li><img src=${talkKenbunPathObj.midashiDirPath + imgSrc} name=${imgSrc} width=${imgSize[0]} height=${imgSize[1]} class="midashi"></li>`);

        simResultImg.on('click', clickMidashiImg);

        // document.getElementsByClassName('slider')[0].appendChild(simResultDiv[0]);
        // document.getElementById("simResultDivId" + i).appendChild(simResultImg[0]);
        document.getElementsByClassName('slider')[0].appendChild(simResultImg[0]);

    }



    $(".slider").slick({
        arrows: false, //左右の矢印はなし
        autoplay: true, //自動的に動き出すか。初期値はfalse。
        autoplaySpeed: 0, //自動的に動き出す待ち時間。初期値は3000ですが今回の見せ方では0
        slidesPerRow: 6, // rowsの値が2以上のとき、1行あたりに表示させるスライド数
        speed: 7000, //スライドのスピード。初期値は300。
        infinite: true, //スライドをループさせるかどうか。初期値はtrue。
        pauseOnHover: false, //オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
        pauseOnFocus: false, //フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
        cssEase: "linear", //動き方。初期値はeaseですが、スムースな動きで見せたいのでlinear
        slidesToShow: 100, //スライドを画面に4枚見せる
        slidesToScroll: 100, //1回のスライドで動かす要素数
        responsive: [
            {
                breakpoint: 769, //モニターの横幅が769px以下の見せ方
                settings: {
                    slidesToShow: 2, //スライドを画面に2枚見せる
                },
            },
            {
                breakpoint: 426, //モニターの横幅が426px以下の見せ方
                settings: {
                    slidesToShow: 1.5, //スライドを画面に1.5枚見せる
                },
            },
        ],
        rows: 2,
        vertical: true, // 縦方向へのスライドを有効化
    });
}
