/**
 * talkAddViewer.jsの関数
 */
var func_talkAddViewer = {
    /** 見出し表示領域を生成 */
    makeShowArea: null,
    /** 見出し提示開始 */
    talkAddShow: null,
    /** 見出し移動アニメーション */
    moveTalkBox: null,
    /** 発話に伴い見出しを増加 */
    addTalk: null,
    /** ボックスの色を変化 */
    changeColorId: null,
    /** 見出し表示領域を削除 */
    deleteShowArea: null,
};

/**
 * talkAddViewer.jsで使用するタグ名
 */
var talkAddViewer_NameObj = {
    talkAddFrame: 'talkAddFrame',
    talkAddBox: 'talkAddBox'
};

/** 発話によってどんどん増えていくため、グローバル変数としてIDを用意しておく */
var talkAddBoxId = 0;

/** 見出しを格納するボックスの色を管理 */
var colors = [
    'rgba(128,128,0,0.6)', // 黄色
    'rgba(0,128,128,0.6)', // 青
    'rgba(0,128,0,0.6)' // 緑
];
// ↑の色を順番に回していくためのもの
var colorId = 0;

/** 次の色に変える準備 */
func_talkAddViewer.changeColorId = () => {
    if (colors.length === colorId + 1) {
        colorId = 0;
    } else {
        colorId++;
    }
};

/**
 * 見出し画像表示領域を生成
 */
func_talkAddViewer.makeShowArea = () => {

    // var talkAddFrame = $(`<div class="${talkAddViewer_NameObj.talkAddFrame}"></div>`);
    let talkAddFrame = document.createElement('div');
    talkAddFrame.className = talkAddViewer_NameObj.talkAddFrame;
    talkAddFrame.style.top = `${zoomViewPort.top + window.pageXOffset}px`;
    talkAddFrame.style.left = `${zoomViewPort.left + window.pageYOffset}px`;
    talkAddFrame.style.width = `${zoomViewPort.clientWidth}px`;
    talkAddFrame.style.height = `${zoomViewPort.clientHeight}px`;
    talkAddFrame.style.marginTop = '5px';
    talkAddFrame.style.border = '1px solid #000000';
    talkAddFrame.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // 背景のみ透明
    talkAddFrame.style.position = 'absolute';
    talkAddFrame.style.zIndex = 100;

    // talkAddFrame.css({
    //     // top: 0,
    //     top: `${zoomViewPort.top + window.pageXOffset}px`,
    //     // left: 0,
    //     left: `${zoomViewPort.left + window.pageYOffset}px`,
    //     // width: `${2000}px`,
    //     width: `${zoomViewPort.clientWidth}px`,
    //     // height: `${1350}px`,
    //     height: `${zoomViewPort.clientHeight}px`,
    //     marginTop: `${5}px`,
    //     border: '1px solid #000000',
    //     backgroundColor: 'rgba(0,0,0,0.8)', // 背景のみ透明
    //     position: 'absolute',
    //     zIndex: 100
    // });

    // objBody.appendChild(talkAddFrame[0]);
    objBody.appendChild(talkAddFrame);
    // $(`.${talkAddViewer_NameObj.talkAddBtn}`).text(`発話スライド${btn_flg}`);
    document.getElementsByClassName(talkAddViewer_NameObj.talkAddBtn).innerText = `発話スライド${btn_flg}`;
}

/** 発話ボックスを管理する配列 */
var talkAddBoxs = [];

/**
 * 発話に類似した見出しを表示(発話するたびに増やす形で)
 * ん？これどうやって増やすんだ…？
 * @param {Array} simResultInfo 
 */
func_talkAddViewer.talkAddShow = simResultInfo => {
    // console.log(simResultInfo.length);

    // if (document.getElementById(talkAddViewer_NameObj.talkAddBox + talkAddBoxId) != null) {

    //     for (var i = 0; i < talkAddBoxId; i++) {
    //         moveTalkBox(talkAddBoxId, 1000);
    //     }
    // }

    /** 発話に対する見出しを格納しておくボックス */
    // let talkAddBox = $(`<div class="${talkAddViewer_NameObj.talkAddBox}" id="${talkAddViewer_NameObj.talkAddBox + talkAddBoxId}">`);
    // talkAddBox.css({
    //     display: 'box',
    //     position: 'absolute',
    //     top: `${zoomViewPort.clientTop}px`,
    //     // display: 'flex',
    //     // backgroundColor: 'rgba(255,255,0,0.8)',
    //     backgroundColor: colors[colorId],
    //     zIndex: 200,
    //     border: '1px solid #000000',
    //     // width: '1000px',
    //     width: `${zoomViewPort.clientWidth}px`,
    //     height: '500px'
    // });

    let talkAddBox = document.createElement('div');
    talkAddBox.className = talkAddViewer_NameObj.talkAddBox;
    talkAddBox.id = talkAddViewer_NameObj.talkAddBox + talkAddBoxId;
    talkAddBox.style.display = 'block';
    talkAddBox.style.position = 'absolute';
    talkAddBox.style.top = `${zoomViewPort.clientTop}px`;
    talkAddBox.style.backgroundColor = colors[colorId];
    talkAddBox.style.zIndex = 200;
    talkAddBox.style.border = '1px solid #000000';
    talkAddBox.style.width = `${zoomViewPort.clientWidth}px`
    talkAddBox.style.height = '500px';


    // 次に使う色に変化させておく
    func_talkAddViewer.changeColorId();
    // ボックスを画面上に生成
    document.getElementsByClassName(talkAddViewer_NameObj.talkAddFrame)[0].appendChild(talkAddBox);

    /** 見出し画像をリストとして格納する場所の設定 */
    let simResultList = document.createElement('ul');
    simResultList.className = 'simResultList';
    simResultList.id = `simrResultList${talkAddBoxId}`;
    simResultList.style.display = 'flex';
    simResultList.style.flexWrap = 'no-wrap';
    simResultList.style.listStyle = 'none';

    // 画像管理用変数(for分内で変数宣言するのが不細工に見えた…なおこれがきれいとは言えない模様)
    /** 画像パス */
    let imgSrc
    /** 画像サイズ */
    let imgWidth, imgHeight, imgSize;
    /** 画像要素 */
    let simResultImg;

    /** ボックスの高さを管理 */
    let maxHeight = 0;

    for (var i = 0; i < simResultInfo.length; i++) {
        /* 見出し画像の情報を取得 */
        imgSrc = simResultInfo[i].path; // 画像パス
        imgWidth = simResultInfo[i].width; // 画像の幅
        imgHeight = simResultInfo[i].height; // 画像の高さ

        // 見出しの中で最大の高さを選ぶ
        if (maxHeight < imgHeight) {
            maxHeight = imgHeight * 1.05;
        }

        // console.log(imgSrc);
        // console.log(talkAddBoxId);

        // 画像サイズを変更
        imgSize = func_trimView.midashiSide.resizeImg(imgWidth, imgHeight); // 画像の縮小後のサイズ (0:幅, 1:高さ)

        // 見出しの中で最大の高さを選ぶ
        // if (maxHeight < imgSize[1]) {
        //     maxHeight = imgSize[1];
        // }

        // simResultImg = $(`<img src=${talkKenbunPathObj.midashiDirPath + imgSrc} name=${imgSrc} width=${imgWidth} height=${imgHeight} class="midashi" id ="midashi${talkAddBoxId}">`);
        // simResultImg = $(`<img src=${talkKenbunPathObj.midashiDirPath + imgSrc} name=${imgSrc} width=${imgSize[0]} height=${imgSize[1]} class="midashi" id ="midashi${talkAddBoxId}">`);
        simResultImg = document.createElement('img');
        simResultImg.src = talkKenbunPathObj.midashiDirPath + imgSrc;
        simResultImg.setAttribute('name', imgSrc);
        simResultImg.style.width = imgWidth;
        // simResultImg.style.width = imgSize[0];
        simResultImg.style.height = imgHeight;
        // simResultImg.style.height = imgSize[1];
        simResultImg.className = "midashi";
        simResultImg.id = `midashi${talkAddBoxId}`;

        // クリックした見出しが含まれる紙面を表示
        // simResultImg.on('click', clickMidashiImg);
        simResultImg.addEventListener('click', clickMidashiImg);

        // 見出し画像を追加
        let li_tag = document.createElement('li');
        li_tag.style.width = '20%';
        li_tag.style.height = '20%';
        // li_tag.appendChild(simResultImg[0]);
        li_tag.appendChild(simResultImg);
        simResultList.appendChild(li_tag);

        // document.getElementById(talkAddViewer_NameObj.talkAddBox + talkAddBoxId).appendChild(simResultImg[0]);
    }
    // ボックスの高さを見出しに合わせる
    // talkAddBox.css({ height: maxHeight });
    talkAddBox.style.height = `${maxHeight}px`;
    console.log(`maxHeight: ${maxHeight}`);


    func_talkAddViewer.addTalk(maxHeight); // 今描画されているボックスを, 新しく挿入されるボックスの高さ分下に移動

    // 新しく追加したボックスを配列に格納
    talkAddBoxs.splice(talkAddBoxId, 0, talkAddBox);
    document.getElementById(talkAddViewer_NameObj.talkAddBox + talkAddBoxId).appendChild(simResultList);

    talkAddBoxId++; // IDナンバーを増やしておく

    // func_talkAddViewer.moveTalkBox(talkAddBoxId - 1, 500);



    // // アニメーションテスト用
    // setTimeout(() => {
    //     func_talkAddViewer.moveTalkBox(talkAddBox, talkAddBoxId - 1, 500);
    // }, 5000);

}


/**
 * 見出しを格納したボックスを上下に移動
 * @param {Element} talkAddBox talkAddBoxを操作するElement
 * @param {int} moveY 移動させる距離
 */
func_talkAddViewer.moveTalkBox = (talkAddBox, moveY) => {

    console.log(`moveY: ${moveY}`)

    // 移動前
    console.log(`${talkAddBox.id} Top(移動前): ${talkAddBox.style.top}`);
    console.log(`${talkAddBox.id} clientTop(移動前): ${talkAddBox.clientTop}`);
    console.log(`${talkAddBox.id} offsetTop(移動前): ${talkAddBox.offsetTop}`);

    // let talkAddBox = document.getElementById(talkAddViewer_NameObj.talkAddBox + idNum);

    // let beforeY = talkBox.offsetTop + window.pageYOffset;
    // let beforeY = talkAddBox.clientTop;
    let beforeY = talkAddBox.offsetTop;

    talkAddBox.animate(
        [ // keyframe
            { transform: `translateY(${beforeY}px)` },
            // { transform: `translateY(${beforeY + moveY}px)` }
            { transform: `translateY(${moveY}px)` }
        ],
        {
            duration: 2000, // 再生時間
            fill: 'forwards' // アニメーション後の状態を維持
        }
    );
    console.log(`${talkAddBox.id}: ${beforeY}`);

    // talkAddBox.style.transition = 'all 500ms liner'
    // talkAddBox.style.transform = `translateY(${moveY}px)`;

    talkAddBox.style.top = `${beforeY + moveY}px`;
    // talkAddBox.style.top = `${moveY}px`;

    // setTimeout(function(){
    //     console.log(document.getElementById(talkAddViewer_NameObj.talkAddBox + idNum).clientTop);
    // }, 5000);

    console.log(`${talkAddBox.id} Top(移動後,もしくは移動中): ${talkAddBox.style.top}`);
    console.log(`${talkAddBox.id} clientTop(移動後,もしくは移動中): ${talkAddBox.clientTop}`);
    console.log(`${talkAddBox.id} offsetTop(移動後,もしくは移動中): ${talkAddBox.offsetTop}`);

}

/**
 * 存在する見出しボックスを上下に移動
 * @param {int} moveY Y座標に動かす量
 */
func_talkAddViewer.addTalk = (moveY) => {

    console.log(talkAddBoxs);

    talkAddBoxs.forEach(talkAddBox => {
        func_talkAddViewer.moveTalkBox(talkAddBox, moveY);
    });
}

/** KENBUN上に表示されている見出し表示領域を削除 */
func_talkAddViewer.deleteShowArea = () => {
    // 領域削除
    document.getElementsByClassName(talkAddViewer_NameObj.talkAddFrame).item(0).remove();
    // ボックスIDを初期化
    talkAddBoxId = 0;
}