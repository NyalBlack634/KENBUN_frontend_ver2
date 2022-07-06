/** defaultTalkViewerで使用するタグまとめ */
var defaultTalkViewerNameObj = {
    /**見出し画像を表示*/
    midashi: {
        /**画像を格納するブロック*/
        talkModeFrame: 'talk_mode_frame',
        simResultArea: 'sim_result_area',
        simResultDiv: 'sim_result_div',
        /**見出し画像*/
        simResultImg: 'sim_result_img',
    },
    /**会話モードの切り替えを行うボタン*/
    talkModeBtn: 'talkModeBtn',
    /**ロード画面に使用するGIF画像を配置するブロック*/
    loadGifArea: 'loadGifArea'
}

/** defaultTalkViewerで使用する関数まとめ(実質クラス) */
func_defaultTalkViewer = {
    /**見出しの表示を行う関数*/
    suggestNews: {
        /** 見出し表示領域を生成 */
        makeShowArea: null,
        /** 切り替える際に領域が一瞬消えるのでそれをごまかす領域を生成(もっといい手があるだろ) */
        makeFrame: null,
        /** masonry用の領域を生成(なぜ2重に使うのか…) */
        makeResultArea: null,
        /** 類似した見出しを貼り付け */
        setImg: null,
        /** 見出しをタイル上に配置 */
        tillingImg: null,
        /** 見出しを削除 */
        deleteResultImg: null,
        /**見出し画像をクリックしたときの処理*/
        clickImg: null,
    },
    /**ロード画面の処理*/
    loading: {
        talkModeLoading: null,
        endLoading: null,
    },
    /** 表示 */
    defaultShow: null,
    /** 領域を削除 */
    deleteShowArea: null,
}

/***************************************************************************************************************************/
/*受け取ったデータをもとに画像を表示*/
/***************************************************************************************************************************/

/**見出しを表示するフレームを生成*/
func_defaultTalkViewer.suggestNews.makeFrame = () => {
    console.log('defaultTalkViewerのフレーム作成');

    //    var objBody = document.getElementsByTagName('body').item(0);

    // ウィンドウズのは幅によって枠の幅を調整
    // (ウィンドウの幅 - ボタンのx座標) * 0.95
    var simResultAreaWidth = (windowInW - allButton.offset().left) * 0.95;
    // ウィンドウズのは高さによって枠の高さを調整
    // (ウィンドウの高さ - ボタンのy座標) * 0.85
    var simResultHeight = (windowInH - allButton.offset().top) * 0.85;
    var talkModeFrame = $('<div id="' + defaultTalkViewerNameObj.midashi.talkModeFrame + '"></div>');

    talkModeFrame.css({
        display: 'none',
        top: allButton.offset().top * 1.07,
        left: allButton.offset().left,
        width: simResultAreaWidth,
        //width : 95+'px',
        height: simResultHeight,
        //height : 95+'px',
        marginTop: 5 + 'px',
        border: '1px solid #000000',
        backgroundColor: '#FFF',
        //        padding: 2 + 'px',
        position: 'absolute',
        zIndex: 100
    });

    //allButton.appendChild(talkModeFrame[0]);
    //    $('#' + defaultTalkViewerNameObj.allButton).append(talkModeFrame[0]);
    objBody.appendChild(talkModeFrame[0]);
}

/**
 * 画像を表示する枠を生成
 * フレームの子要素として見出しを表示するための枠を生成(masonryのため)
 */
func_defaultTalkViewer.suggestNews.makeResultArea = () => {

    var simResultArea = $('<div id="' + defaultTalkViewerNameObj.midashi.simResultArea + '"></div>');

    //    var talkModeButton = $('#' + defaultTalkViewerNameObj.allButton);
    // ウィンドウのは幅によって枠の幅を調整
    // (ウィンドウの幅 - ボタンのx座標) * 0.95
    var simResultAreaWidth = (windowInW - allButton.offset().left) * 0.95;
    // ウィンドウのは高さによって枠の高さを調整
    // (ウィンドウの高さ - ボタンのy座標) * 0.85
    var simResultHeight = (windowInH - allButton.offset().top) * 0.85;

    simResultArea.css({
        display: 'none',
        left: 0,
        top: 0,
        width: simResultAreaWidth,
        //width : 95+'px',
        height: simResultHeight,
        //height : 95+'px',
        //        marginTop: 5 + 'px',
        border: '1px solid #000000',
        backgroundColor: '#FFF',
        //        padding: 2 + 'px',
        //        overflow: 'scroll',
        'overflow-x': "hidden", //横方向のスクロールバーを表示しない
        'overflow-y': "scroll",
        position: 'absolute',
        zIndex: 100
    });

    $('#' + defaultTalkViewerNameObj.midashi.talkModeFrame).append(simResultArea[0]);
}

/**
 * 見出し表示領域の生成
 */
func_defaultTalkViewer.suggestNews.makeShowArea = () => {
    console.log("setting");
    // こいつらの位置もどうにかできないか…
    func_defaultTalkViewer.suggestNews.makeFrame(); // フレーム
    func_defaultTalkViewer.suggestNews.makeResultArea(); // 表示枠を生成
    // 枠を作るアニメーション
    $('#' + defaultTalkViewerNameObj.midashi.talkModeFrame).show('normal');
    // $('#' + defaultTalkViewerNameObj.midashi.simResultArea).show('normal')
    //     .queue(function () {
    //         $(function () {
    //             func_defaultTalkViewer.loading.talkModeLoading('#' + defaultTalkViewerNameObj.midashi.simResultArea)
    //         });
    //     });

    $('#' + defaultTalkViewerNameObj.midashi.simResultArea).show('normal');
}

/**
 * 画像のパスをhtmlに埋め込み, 表示
 * @param {Array} simResultInfo 画像のパスを格納したリスト
 */
func_defaultTalkViewer.suggestNews.setImg = simResultInfo => {

    console.log('*********setImg*********');

    // func_defaultTalkViewer.loading.endLoading(); // ロード画面を削除

    for (var i = 0; i < simResultInfo.length; i++) {
        /*見出し画像の情報を取得*/
        imgSrc = simResultInfo[i].path; // パス
        imgWidth = simResultInfo[i].width; // 幅
        imgHeight = simResultInfo[i].height; // 高さ

        // console.log('path: ' + imgSrc);

        //        console.log('元画像　幅:' + imgWidth + ' 高さ:' + imgHeight);

        // 画像をリサイズする
        var imgSize = func_trimView.midashiSide.resizeImg(imgWidth, imgHeight); // 画像の縮小後のサイズ (0:幅, 1:高さ)

        //        console.log('縮小後　幅:' + imgSize[0] + ' 高さ:' + imgSize[1]);

        // 1つの見出しを格納する枠
        var simResultDiv = $('<div id=simResultDivId' + i + ' class=' + defaultTalkViewerNameObj.midashi.simResultDiv + '>');

        simResultDiv.css({
            display: 'grid',
            //            top: 0 + 'px',
            //            left: 0 + 'px',
            //            maxWidth: 100 + '%',
            //            heigth: autoHeigth + 'px',
            //            width: autoWidth + 'px',
            //margin: 5 + 'px',
            //            width: 98 + 'px',
            width: imgSize[0],
            //            width: 100 + "px",
            //            height: 98 + 'px',
            height: imgSize[1],
            //            height: 100 + "px",
            //            size: 100 + 'px',
            position: 'absolute',
            border: "1px solid #000000",
            //            padding: 0,
            cursor: 'ponter'
        });
        //        var simResultImg = $('<div class="' + defaultTalkViewerNameObj.midashi.simResultImg + '"><img src=' + talkKenbunPathObj.midashiDirPath + imgSrc + ' name=' + imgSrc + ' width=' + 90 + ' height=' + 90 + '></div>');

        var simResultImg = $('<img src=' + talkKenbunPathObj.midashiDirPath + imgSrc + ' name=' + imgSrc + ' width=' + imgSize[0] + ' height=' + imgSize[1] + '>');

        // console.log(simResultImg.attr('src'));

        //        var simResultImg = $('<img src=' + talkKenbunPathObj.midashiDirPath + imgSrc + ' name=scale0/SNBN/' + imgSrc + ' width=' + imgSize[0] + ' height=' + imgSize[1] + '>');

        /*
        見出し画像クリック時の処理
        
        今回はpython側にバブリングの防止とクリックした画像の情報を送るためにtrimViewer.jsのものをコピペし一部付け加えたが, 
        nameに与えるパスの先頭に'scale0/SNBN/'を追加すればオリジナルのままでもでも動く
        ('name=scale0/SNBN/' + imgSrc)
        
        これは間違い
        そもそもイベントの管轄が違うから無理ぽ
        */
        simResultImg.on('click', clickMidashiImg);

        //$('#' + defaultTalkViewerNameObj.midashi.simResultArea).append(simResultDiv[0]);
        //        $('.' + defaultTalkViewerNameObj.midashi.simResultDiv).append(simResultImg[0]);
        //$('#simResultDivId' + i).append(simResultImg);

        document.getElementById(defaultTalkViewerNameObj.midashi.simResultArea).appendChild(simResultDiv[0]);
        document.getElementById("simResultDivId" + i).appendChild(simResultImg[0]);

        //        simResultImg.fadeIn('slow'); // 画像を表示するアニメーション
    }

    // 見出しが見つからなかった場合
    if (simResultInfo.length === 0) {
        $('#' + defaultTalkViewerNameObj.midashi.simResultArea).text("");
    }
}


/**画像をタイル状配置*/
func_defaultTalkViewer.suggestNews.tillingImg = () => {
    //    var $grid = $('#' + defaultTalkViewerNameObj.midashi.simResultArea).masonry({
    //        itemSelector: '.' + defaultTalkViewerNameObj.midashi.simResultImg,
    //        columnWidth: 100,
    //        horizontalOrder: true
    //    });

    var $grid = $('#' + defaultTalkViewerNameObj.midashi.simResultArea).masonry({
        itemSelector: '.' + defaultTalkViewerNameObj.midashi.simResultDiv,
        columnWidth: 100,
        //horizontalOrder: true
    });

    var simResultHeight = (windowInH - allButton.offset().top) * 0.85;

    // なぜか以下が必要
    // function completePreLayoutruiji() {
    completePreLayoutruiji = () => {
        console.log("once");
        var $area = $("#" + defaultTalkViewerNameObj.midashi.simResultArea);
        $area.css({
            height: simResultHeight
        });
    }
    var que_layout = null;
    clearTimeout(que_layout);
    que_layout = setTimeout(completePreLayoutruiji, 100);

}

/**表示されている見出し画像を削除(現在は使用していない)*/
func_defaultTalkViewer.suggestNews.deleteResultImg = () => {

    if ($('.' + defaultTalkViewerNameObj.midashi.simResultImg).length) { // このクラスが存在する場合

        //        $('.' + defaultTalkViewerNameObj.midashi.simResultImg).fadeOut('slow'); // 画像が消えるアニメーション
        $('.' + defaultTalkViewerNameObj.midashi.simResultImg).remove(); // 前に表示した画像を削除
    }
}

/**
 * KENBUN上に表示
 * @param {Array} result 発話と類似した見出しの情報 
 */
func_defaultTalkViewer.defaultShow = result => {
    // console.log(speechRecognitionResult);
    // result = func_pyCom.getHeadline(speechRecognitionResult);
    console.log(result.length);
    func_defaultTalkViewer.suggestNews.setImg(result);
    func_defaultTalkViewer.suggestNews.tillingImg();
}

/** KENBUN上に表示されている見出し表示領域を削除 */
func_defaultTalkViewer.deleteShowArea = () => {
    /*
        会話モードON時に生成した枠と画像を削除
        queue()を使いアニメーションが終わってから枠を消すようにする
        */
    $('#' + defaultTalkViewerNameObj.midashi.simResultArea).hide('normal')
        .queue(function () {
            $('#' + defaultTalkViewerNameObj.midashi.simResultArea).remove();
        });
    $('#' + defaultTalkViewerNameObj.midashi.talkModeFrame).hide('normal')
        .queue(function () {
            $('#' + defaultTalkViewerNameObj.midashi.talkModeFrame).remove();
        });
}