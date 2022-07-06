/** 
 * KENBUNとの対話システムにおいて各プログラムで共通して使用するグローバル変数的なものをここに書く 
 * */

/** KENBUNで使用する画像のパス */
var talkKenbunPathObj = {
    /** 見出し画像が格納されているディレクトリのパス */
    midashiDirPath: 'img/landmark/769_hl_10_trimLandmark/scale0/SNBN/',
    /** ロード画面用のGIF画像パス */
    loadingGifPath: 'now-loading.gif',
    /** 設定アイコンの画像パス */
    configImgPath: 'config_icon.png',
};

/** 会話サービスapi(keyの直書き何とか直したい) */
var talkApiKeys = {
    /**chaplus*/
    chaPlus: {
        api_key: '6081062dec629',
        url: 'https://www.chaplus.jp/v1/chat?apikey=6081062dec629'
    },
    /**talk api*/
    a3rtTalkApi: {
        url: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
        api_key: 'DZZo8Go9ktpGnMg4g75OhEFzXbEvE6wc'
    }
};

/** body全体のオブジェクト */
var objBody = document.getElementsByTagName('body').item(0);

/** KENBUNの表示領域 */
var zoomViewPort = document.getElementById('viewport');
