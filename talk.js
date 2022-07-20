/***************************************************************************************************************************/
/*会話モードの処理 (main文)*/
/***************************************************************************************************************************/
// web speech apiの初期準備
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
recognition.lang = 'ja-JP';
recognition.continuous = true; // 連続で聞くことを可能にするため



/**
 * 会話モードを開始する
 * <ul>
 * <li>talkViewer: デフォルト(破損)<br>
 * <li>slideViewer: ↑にスライドしていく(だめ)
 * <li>fadeViewer: ランダムな座標にフェードイン(だめ)
 * <li>talkAddViewer: 話すたびに増えていく(進行中)
 * </ul>
 * @param {String} showMethod どの表示方法を使うか(talkViewer・slideViewer・fadeViewer)
 */
function startTalk(showMethod) {

    let funcs_show = {
        'talkViewer': func_defaultTalkViewer.defaultShow.bind(null, result), // thisは適当なもの
        'slideViewer': func_slideViewer.slideShow.bind(null, result),
        'fadeViewer': func_fadeViewer.fadeShow.bind(null, result),
        'talkAddViewer': func_talkAddViewer.talkAddShow.bind(null, result)
    };

    // 表示方法によって領域を設定
    const func_setting = {
        'talkViewer': func_defaultTalkViewer.suggestNews.makeShowArea,
        'slideViewer': func_slideViewer.makeShowArea,
        'fadeViewer': func_fadeViewer.makeShowArea,
        'talkAddViewer': func_talkAddViewer.makeShowArea
    };

    func_setting[showMethod](); // 見出し表示領域を生成

    var speechRecognitionResult; // 音声認識した結果の格納用

    // 無音区間の計測
    let mesureTimeflg = false;
    let start;
    let end;
    let elapsedTime;

    // 音声認識を開始
    console.log('話して');
    recognition.start();
    recognition.onresult = function (event) { // 音声認識結果を得たときの処理

        recognition.stop(); // 一度止める

        if (event.results[0].isFinal) { // 言葉を言い終えたと判定したら結果を取得

            speechRecognitionResult = event.results[0][0].transcript; // 音声認識の結果を格納
            console.log(`'入力内容: ${speechRecognitionResult}`);

            result = func_pyCom.getHeadline(speechRecognitionResult); // 発話と類似した見出しを取得

            // 表示方法ごとに振り分ける
            // ここで宣言しないとspeechRecognitionResultが空の状態でbindされる
            funcs_show = {
                'talkViewer': func_defaultTalkViewer.defaultShow.bind(null, result), // thisは適当なもの
                'slideViewer': func_slideViewer.slideShow.bind(null, result),
                'fadeViewer': func_fadeViewer.fadeShow.bind(null, result),
                'talkAddViewer': func_talkAddViewer.talkAddShow.bind(null, result)
            };

            funcs_show[showMethod](result); // 見出しを表示

        }

        console.log('無音区間: ' + elapsedTime); // うまく取れない
    }


    recognition.onsoundend = function (event) {
        start = performance.now();
        console.log('無音開始:');
        console.log(start);
        mesureTimeflg = true; // 計測を開始したことを示す

        //        console.log('無音開始時の認識結果: ');
        //        console.dir(event);
    }

    recognition.onsoundstart = function () {
        if (mesureTimeflg == true) { // 計測が開始されていた場合
            end = performance.now();
            console.log('無音終了');
            console.log(end);
            elapsedTime = end - start;
            elapsedTime = elapsedTime.toPrecision(3);
            console.log('無音区間: ' + elapsedTime);

            if (elapsedTime > 5000) {
                console.log('無音が5秒以上');
            }

            mesureTimeflg = false; // 計測が終了したことを示す
        }
    }

    recognition.onend = function () { // 終了したらもう一度音声認識をするようにする

        console.log(btn_flg);
        if (btn_flg == 'ON') { // 会話モードがONの場合は続ける
            console.log('話して');
            recognition.start();
        } else { // OFFの場合は終了する
            recognition.stop();
        }
    }

}
