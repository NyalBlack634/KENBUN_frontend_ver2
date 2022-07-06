/**
 * ボタンを統合した際の処理をここに書く
 */

/** ボタンのON・OFF管理 */
var btn_flg = 'OFF';

var allButton = $(`<div class="talkButton" id="${'allButton'}"></div>`);

var allButtonTop = windowInH * 0.65; // ウィンドウの高さに合わせた位置(windowInHはLocalZooming.jsより拝借)
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
var allButton_native = document.getElementById('allButton');
allButton_native.innerText = `対話モード${btn_flg}`;

allButton_native.addEventListener('click', () => {
    if(btn_flg === 'OFF'){
        btn_flg = 'ON';
        allButton_native.innerText = `対話モード${btn_flg}`;
    } else {
        btn_flg = 'OFF';
        allButton_native.innerText = `対話モード${btn_flg}`;
    }
});

// ボタンの設定
var configButton = $(`<div class="config_button"><div>`);
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

var configImg = $(`<img src=${talkKenbunPathObj.configImgPath}>`);
configImg.css({
    display: 'block',
    width: '2.5em',
    height: '2.5em',
    // border: "1px solid #000000",
    // margin: 'auto',
    padding: '0.25em 0.25em'
});
configButton.append(configImg);
objBody.appendChild(configButton[0]);
