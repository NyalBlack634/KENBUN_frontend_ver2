function testTalk(showMethod) {
    // 表示方法によって領域を設定
    const func_setting = {
        'talkViewer': func_defaultTalkViewer.suggestNews.makeShowArea,
        'slideViewer': func_slideViewer.makeShowArea,
        'fadeViewer': func_fadeViewer.makeShowArea,
        'talkAddViewer': func_talkAddViewer.makeShowArea
    };

    func_setting[showMethod]();

    setTimeout(function () {
        testText = "大分";
        result = func_pyCom.getHeadline(testText);

        let funcs_show = {
            'talkViewer': func_defaultTalkViewer.defaultShow.bind(null, result), // thisは適当なもの
            'slideViewer': func_slideViewer.slideShow.bind(null, result),
            'fadeViewer': func_fadeViewer.fadeShow.bind(null, result),
            'talkAddViewer': func_talkAddViewer.talkAddShow.bind(null, result)
        };

        funcs_show[showMethod](result);
    }, 2000);

    setTimeout(function () {
        testText = "別府";
        result = func_pyCom.getHeadline(testText);

        let funcs_show = {
            'talkViewer': func_defaultTalkViewer.defaultShow.bind(null, result), // thisは適当なもの
            'slideViewer': func_slideViewer.slideShow.bind(null, result),
            'fadeViewer': func_fadeViewer.fadeShow.bind(null, result),
            'talkAddViewer': func_talkAddViewer.talkAddShow.bind(null, result)
        };

        funcs_show[showMethod](result);
    }, 5000);

    setTimeout(function () {
        testText = "温泉";
        result = func_pyCom.getHeadline(testText);

        let funcs_show = {
            'talkViewer': func_defaultTalkViewer.defaultShow.bind(null, result), // thisは適当なもの
            'slideViewer': func_slideViewer.slideShow.bind(null, result),
            'fadeViewer': func_fadeViewer.fadeShow.bind(null, result),
            'talkAddViewer': func_talkAddViewer.talkAddShow.bind(null, result)
        };

        funcs_show[showMethod](result);
    }, 9000);
}