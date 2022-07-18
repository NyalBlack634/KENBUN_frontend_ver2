/**
 * ボタンを統合した際の処理をここに書く
 */

/** ボタンの名前 */
buttonNameObj = {
    talkButton: 'all-button',
    configButton: 'config_button',
    configImg: 'config_img',
    modeSelect: 'mode_select',
}

/** ボタンのON・OFF管理 */
var btn_flg = 'OFF';

/** 表示形式に関するモード(現状の仮名) */
const talkModes = {
    'talkViewer': '会話モード',
    'slideViewer': '会話スライド',
    'fadeViewer': '会話フェードイン',
    'talkAddViewer': '会話増える'
};

/** 表示領域の削除処理を管理 */
let funcs_areaDelete = {
    'talkViewer': func_defaultTalkViewer.deleteShowArea,
    'slideViewer': func_slideViewer.deleteShowArea,
    'fadeViewer': func_fadeViewer.deleteShowArea,
    'talkAddViewer': func_talkAddViewer.deleteShowArea,
};

/** 表示形式を管理(デフォルトとしてtalkViewer) */
var talkMode = 'talkViewer'

/****************/
// 会話ボタンの準備
/****************/
var allButton = $(`<div class="talkButton" id="${buttonNameObj.talkButton}"></div>`);

var allButtonTop = windowInH * 0.59; // ウィンドウの高さに合わせた位置(windowInHはLocalZooming.jsより拝借)
var allButtonleft = windowInW * 0.8 // ウィンドウの幅に合わせた位置(windowInWはLocalZooming.jsより拝借)

allButton.css({
    position: 'absolute',
    top: allButtonTop,
    //    left: 2050 + 'px', // もとは2450px
    left: allButtonleft,
    // width: 150 + 'px',
    width: '10em',
    // height: 50 + 'px',
    height: '3em',
    zIndex: 2000,
    //lineWidth : 480 + 'px',
    textAlign: 'center',
    lineHeight: 50 + 'px',
    color: '#ffffff',
    backgroundColor: '#2980b9',
    cursor: 'pointer'
});
objBody.appendChild(allButton[0]);

// なんかjQueryが気に入らなくて分けたけどこれはこれで…でもCSSはjQueryの方が書きやすいんだよなぁ…
var allButton_native = document.getElementById(buttonNameObj.talkButton);
allButton_native.innerText = `${talkModes[talkMode] + btn_flg}`;
// 対話ボタンを押したときの挙動
allButton_native.addEventListener('click', () => {
    if(btn_flg === 'OFF'){
        btn_flg = 'ON';
        allButton_native.innerText = `${talkModes[talkMode] + btn_flg}`;

        testTalk(talkMode);

    } else {
        btn_flg = 'OFF';
        allButton_native.innerText = `${talkModes[talkMode] + btn_flg}`;

        // 音声認識停止
        // recognition.stop();

        // 表示領域を削除
        funcs_areaDelete[talkMode]();
    }
});


/****************/
// 設定ボタンの準備
/****************/
/** セレクタの準備 */
const modeSelector = document.createElement('select');
modeSelector.className = buttonNameObj.modeSelect;
modeSelector.style.position = 'relative';
modeSelector.style.marginTop = '4em';
// modeSelector.style.top = `${(allButtonTop + allButton_native.clientHeight) * 1.02}`;
// modeSelector.style.left = `${allButton_native.clientLeft}`;
// modeSelector.style.display = 'none';
modeSelector.style.visibility = 'hidden'; // 初期状態では隠す

// モード選択用の画面
let mode;
// セレクタの中身を用意
Object.keys(talkModes).forEach(key => {
    mode = document.createElement('option');
    mode.value = key;
    mode.text = talkModes[key];
    modeSelector.appendChild(mode);
});

// セレクタが変化した際の処理
modeSelector.onchange = () => {
    talkMode = modeSelector.value; // モードを変更
    allButton_native.innerText = `${talkModes[talkMode] + btn_flg}`;
};

/** 設定ボタン */
var configButton = $(`<div class="${buttonNameObj.configButton}"><div>`);
configButton.css({
    position: 'absolute',
    top: allButtonTop,
    left: (allButtonleft + allButton_native.clientWidth) * 1.01,
    width: '3em',
    height: '3em',
    zIndex: 2000,
    textAlign: 'center',
    backgroundColor: '#2980b9',
    cursor: 'pointer',
    // margin: 'auto',
});

// var configButton = document.createElement('div');
// configButton.style.position = 'absolute';
// configButton.style.top = allButtonTop;
// configButton.style.left = (allButtonleft + allButton_native.clientWidth) * 1.01;
// configButton.style.width = '3em';
// configButton.style.height = '3em';
// configButton.style.zIndex = '2000';
// configButton.style.textAlign = 'center';
// configButton.style.backgroundColor = '#2980b9';
// configButton.style.cursor = 'pointer';

/** 設定ボタンの画像 */
var configImg = $(`<img class="${buttonNameObj.configImg}" src=${talkKenbunPathObj.configImgPath}>`);
configImg.css({
    display: 'block',
    width: '2.5em',
    height: '2.5em',
    // border: "1px solid #000000",
    // margin: 'auto',
    padding: '0.25em 0.25em'
});
// 設定ボタンを画面上に生成
configButton.append(configImg[0]);
objBody.appendChild(configButton[0]);

// 設定ボタンを押したときの挙動
document.getElementsByClassName(buttonNameObj.configImg)[0]
        .addEventListener('click', () => {
            console.log('設定ボタンクリック');

            // 設定を押した際にボタンを出現させる
            if(getComputedStyle(modeSelector).visibility === 'hidden'){
                modeSelector.style.visibility = 'visible'; // 出現
            } else {
                modeSelector.style.visibility = 'hidden'; // 隠す
            }
});
// セレクタを画面上に生成
configButton.append(modeSelector);
