/** fadeViewerで使用する関数まとめ */
func_fadeViewer = {
    /** 見出し画像を貼り付け */
    setImg: null,
    /** 見出し画像を変更 */
    changeImg: null,
    /** フェードイン表示開始 */
    fadeShow: null,
    /** 見出し表示領域を生成 */
    makeShowArea: null,
    /** 見出し表示領域を削除 */
    deleteShowArea: null,
}


/** fadeTalkViewerで使用するタグまとめ */
fadeViewer_NameObj = {
    fadeFrame: 'fadeFrame',
    fadeBox: 'fadeBox'
}

/**
 * フェードイン表示
 * @param {Array} results 発話と類似した見出し画像の情報
 */
func_fadeViewer.fadeShow = results => {
    // console.log('分割枚数' + result.length);
    // test_result = result.splice(0,4);
    func_fadeViewer.setImg(results);
}

/** 見出し画像表示エリアの生成 */
func_fadeViewer.makeShowArea = () => {

    let fadeFrame = $('<div class="' + fadeViewer_NameObj.fadeFrame + '"></div>');

    fadeFrame.css({
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

    objBody.appendChild(fadeFrame[0]);
    $('#' + fadeViewer_NameObj.fadeBtn).text('会話フェードイン' + btn_flg);
}


/**
 * 見出し画像貼り付け
 * @param {Array} imgs 発話と類似した見出し画像の情報
 */
func_fadeViewer.setImg = imgs => {
    // var fadeBox = $('<ul class=' + fadeViewer_NameObj.fadeBox + '>');

    console.log('分割枚数' + result.length);
    test_result = imgs.splice(0, 4);

    // var fadeFrame = $('<div class="' + fadeViewer_NameObj.fadeFrame + '"></div>');

    for (var i = 0; i < test_result.length; i++) {
        /*見出し画像の情報を取得*/
        imgSrc = test_result[i].path; // パス
        imgWidth = test_result[i].width; // 幅
        imgHeight = test_result[i].height; // 高さ

        // 画像をリサイズする
        // var imgSize = func_trimView.midashiSide.resizeImg(imgWidth, imgHeight); // 画像の縮小後のサイズ (0:幅, 1:高さ)
        var imgSize = [imgWidth, imgHeight];
        var simResultImg = $('<img src=' + talkKenbunPathObj.midashiDirPath + imgSrc + ' name=' + imgSrc
            + ' width=' + imgSize[0] + ' height=' + imgSize[1]
            + 'id="midashi +' + i + '" class="midashi">');

        simResultImg.on('click', clickMidashiImg);

        var fadeBox = $('<div id =' + 'fadeBoxImg' + i + ' class=' + fadeViewer_NameObj.fadeBox + '>');

        document.getElementsByClassName(fadeViewer_NameObj.fadeFrame)[0].appendChild(fadeBox[0]);
        document.getElementById('fadeBoxImg' + i).appendChild(simResultImg[0]);

        // var grid = $('.' + fadeViewer_NameObj.fadeFrame).masonry({
        //     itemSelector: '.' + fadeViewer_NameObj.fadeBox,
        //     columnWidth: '.' + fadeViewer_NameObj.fadeBox,
        //     horizontalOrder: true
        // });

        // // layout Masonry after each image loadss
        // grid.imagesLoaded().progress(function () {
        //     grid.masonry('layout');
        // });

        // masonry　本当使えない
        // var $grid = $('.' + fadeViewer_NameObj.fadeFrame).masonry({
        //     itemSelector: '.' + fadeViewer_NameObj.fadeBox,
        //     columnWidth: 100,
        //     //horizontalOrder: true
        // });

        // var simResultHeight = (windowInH - talkModeBtn.offset().top) * 0.85;

        // // なぜか以下が必要
        // function completePreLayoutruiji() {
        //     console.log("once");
        //     var $area = $("#" + fadeViewer_NameObj.fadeBox);
        //     $area.css({
        //         height: simResultHeight
        //     });
        // }
        // var que_layout = null;
        // clearTimeout(que_layout);
        // que_layout = setTimeout(completePreLayoutruiji, 100);


        fadeBox.css({
            border: 'solid 5px red'
        });
        // document.getElementByclassName(fadeViewer_NameObj.fadeFrame)[0].appendChild(fadeBox[0]);

        // 表示領域に追加
        // document.getElementsByClassName(fadeViewer_NameObj.fadeBox)[0].appendChild(simResultImg[0]);
    }

    // fadeBox.css({ display: 'flex' });
    // fadeBox.children('li').css({
    //     width: 'calc(100% / ' + imgs.length + ')'
    //     // width: '100px'
    // });

    // マス目上に分割
    fadeFrame.css('display', 'grid');
    fadeFrame.css('grid-template-columns', 'repeat(' + imgs.length + ', 1fr)');
    // fadeFrame.css('grid-template-columns', 'repeat(4, 1fr)');


    // fadeFrame.gridTemplateColumns = 'repeat(' + imgs.length + ', 1fr)';

    // 次の見出しを表示
    if (btn_flg == 'ON') {
        var timer = setTimeout(function () {
            $('.' + fadeViewer_NameObj.fadeBox).remove();
            func_fadeViewer.setImg(imgs);
        }, 3000);
    } else {
        clearTimeout(timer);
        btn_flg = 'OFF';
        console.log('会話モードOFF');
    }

}

/** KENBUN上に表示されている見出し表示領域を削除 */
func_fadeViewer.deleteShowArea = () => {
    $('#' + fadeViewer_NameObj.fadeFrame).remove();
}