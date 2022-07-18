/****************************************************************************/
// 
/****************************************************************************/

/**
 * 類似度分析を行うサーバーとの通信で使用するパス
 */
var pyComDefaultPathObj = {
    /**flaskで建てたサーバのパス(例.flaskServerPath + simAnarysisPath)*/
    pythonPath: {
        /**ホスト*/
        flaskServerPath: 'http://127.0.0.1:5000/',
        /**類似度分析*/
        simAnarysisPath: 'similarity_anarysis',
        /**類似度分析の結果を格納したjsonデータ*/
        simResultJsonPath: 'similarity_result_json',
        /**chaplusに返答を要求*/
        chaplusParh: 'chaplus_reply'
    },
    /**見出し画像が格納されているディレクトリのパス*/
    midashiDirPath: 'img/landmark/769_hl_10_trimLandmark/scale0/SNBN/',
    /**ロード画面用のGIF画像パス*/
    loadingGifPath: 'now-loading.gif'
}

/** 類似度分析を行うサーバーとの通信 */
func_pyCom = {
    getHeadline: null,
}

/** 類似度分析が多重にならないように管理するフラグ */
var similarityEndFlg = true;

/**
 * 入力内容に類似した見出しの情報をサーバー側から受け取る
 * @param {String} inputText 発話内容
 * @returns {Object} 類似した記事の情報[{path: 'path', width: 横幅(int), height: 高さ(int)},...]
 */
func_pyCom.getHeadline = function (inputText) {
    if (similarityEndFlg == true) { // ほかに類似度分析が行われていない場合、通信を実行

        console.log('similarityEndFlg: ' + similarityEndFlg);
        similarityEndFlg = false; // ほかの入力に対して応答を受け付けないようにする

        var simResult = []; // 結果格納用
        var fData = new FormData(); // 送信するデータを格納
        fData.append('btn_flg', btn_flg); // FormDataにボタンのON・OFFの情報を格納

        /*-----------------KENBUN側でweb speech api を用いて音声認識を行うパターン-----------------*/
        fData.append('recognition_result', inputText); // FormDataに音声認識の結果を追加

        fData.append('limit_num', 10);

        console.time('類似度分析要求時間');

        var url = pyComDefaultPathObj.pythonPath.flaskServerPath + pyComDefaultPathObj.pythonPath.simAnarysisPath;
        $.ajax({
            // 類似度分析を行うサーバーと通信
            url: url,
            type: 'POST',
            async: false, // 同期処理
            data: fData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (data, dataType) {
                // 非同期通信成功時に読みだされる
                console.log('Python側に送信成功');

                for (var i = 0; i < data.length; i++) {

                    // 類似度が高い順に新聞の情報を格納
                    simResult.splice(i, 0, {
                        path: data[i].path, // 見出しパス
                        width: data[i].width, // 見出しの幅
                        height: data[i].height // 見出しの高さ
                    });
                }

                console.timeEnd('類似度分析要求時間');
                console.log('入力文: ' + inputText + '\n類似した記事の数: ' + simResult.length);
                similarityEndFlg = true; // 類似度分析を再び受け付けるようにする
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 非同期通信失敗時に読みだされる
                console.log('Error: ', errorThrown);
                alert('類似度分析サーバーが起動されていません!!');
            }
        });

        console.log(simResult.length);

    } else { // ほかの入力に対して類似度分析をしてるときの処理
        console.log('類似度分析中のため却下');
    }

    return simResult;
}