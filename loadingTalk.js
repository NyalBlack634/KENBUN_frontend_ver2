/***************************************************************************************************************************/
/*ロード画面(結局使わなくなったからここで供養しとこ)*/
/***************************************************************************************************************************/
/**
 * ロード画面を表示
 * @param parent {string} - ロード画面を表示したいブロック
 */
func_defaultTalkViewer.loading.talkModeLoading = parent => {

    var jParent = $(parent);

    var gifArea = $('<div class="' + defaultTalkViewerNameObj.loadGifArea + '"></div>');
    var loadingImgGif = $('<img src="' + talkKenbunPathObj.loadingGifPath + '">');

    gifArea.css({
        //        position: 'absolute',
        //        textAlign: 'center',
        //        margin: 'auto',
        paddingLeft: 35 + '%',
        paddingTop: 35 + '%'
        //        border: '1px solid #000000'
    });

    jParent.append(gifArea[0]);
    gifArea.append(loadingImgGif);
}

/**
 * ロード画面を終了
 */
func_defaultTalkViewer.loading.endLoading = () => {

    var gifArea = $('<div class="' + defaultTalkViewerNameObj.loadGifArea + '"></div>');
    gifArea.remove();
}