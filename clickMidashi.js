/**
 * 見出し画像がクリックされたときの処理
 * trimViewer.jsのfunc_trimView.midashiSide.clickImg（）を一行を除いてすべて流用
 */
function clickMidashiImg(e) {

    //バブリングの防止(親要素のイベントも実行してしまうことを防ぐ)
    if (event.stopPropagation)
        event.stopPropagation();
    else
        event.cancelBubble = true;

    landmarksideflagcl = true;
    clickimgSrc = this.getAttribute("name");
    clickimgmark = this.getAttribute("tag");
    clickimgwidth = this.getAttribute("width");
    clickimgheight = this.getAttribute("height");
    clickimgxmin = this.getAttribute("xMin");
    clickimgxmax = this.getAttribute("xMax");
    clickimgymin = this.getAttribute("yMin");
    clickimgymax = this.getAttribute("yMax");
    var r = 0;
    console.log("ランドマーククリック!!");
    console.log({
        clickimgSrc: clickimgSrc
    });
    console.log({
        clickimgmark: clickimgmark
    });


    clickimgSrc = 'scale0/SNBN/' + clickimgSrc; // パスに追加して無理矢理できるようにする

    log_save('見出しをクリック: ' + clickimgSrc, 'log_talk_clickMidashi.txt'); // どの見出しをクリックしたかログをとる

    path = clickimgSrc.split('/'); //要素を格納(path[2]新聞社,[3]年,[4]月)
    var file = path[5].split(/-|_|\./); //要素を格納(file[0]日,[1]ay,[2]ページ,[3]ランドマーク番号)
    var pathm = path[4].replace('月', ""); //年
    if (ruijifileflag == false) {
        hightLightTargetMonthArray = [];
        hightLightTargetDayArray = [];
        hightLightTargetMonthDayIdNumFlagArray = [];
    }
    func_trimView.midashiSide.setmonth(clickimgSrc);
    monthnum = onMouseMonthDivObj.num;
    daynum = parseInt(onMouseDayDivObj.day);
    monthDivYearArray[monthnum] = Math.ceil(monthnum / 12) + 1875;
    monthDivMonthArray[monthnum] = parseInt(pathm);
    var year = monthDivYearArray[monthnum];
    var month = monthDivMonthArray[monthnum];
    var pageDataObj = get_pageData_ajaxData.data[year][month][daynum];
    var buttonInputLeftId = buttonInputLeftIdName + "" + monthnum + "_" + daynum;
    var pagenum = getPageNum(monthnum, daynum);
    var clickcount = 0;

    log_save(["ランドマーク:" + clickimgSrc + "を選択"], "log_landmarkside.txt", monthnum, daynum);
    for (var co = 0; co < 27; co++) {
        if (clickimgSrc.indexOf(result_subpath[co][1]) != -1) {
            companystring = result_subpath[co][0];
            //console.log(companystring);
            break;
        }
    }

    var imgsrc_alpha = companystring + "/" + path[3] + "/" + path[4] + "/" + file[0] + "-" + file[1] + "-" + file[2] + "_" + file[3] + ".jpg";

    //console.log("imgsrc_alpha");
    //console.log(imgsrc_alpha);


    //console.log(pagenum);
    for (var i = 0; i < 100; i++) { //100は固定値(要検討)
        if (path[2] == pageDataObj[i].jpCompany) {
            //console.log("新聞社ok");
            if (file[1] == pageDataObj[i].edition) {
                //console.log("刊区分ok");
                if (parseInt(file[2]) == pageDataObj[i].page) {
                    //console.log("ページok");
                    clickcount = i;
                    break;
                }
            }
        }
    }
    if (ruijifileflag == true) {
        if (dayMaxFlag == true && $(".zoomingEle")[0]) {

            console.log("拡大状態の日単位紙面->月単位拡大");

            var macth = $(".zoomingEle")[0].id.match(/^[a-zA-Z]*(\d+)_(\d+)/);
            var zmU = parseInt(macth[1]),
                zmD = parseInt(macth[2]);
            var imgNum = zmU * 100 + zmD;


            var zoomObj = func_get_pageData.get_pageInfo(zmU, zmD);

            //console.log({mes:"拡大中の要素あり && クリック要素が「canvasDay」以外"});
            resetDay(dayDivPosSizeObjArray, dayCanvasPosSizeObjArray, dayInputLPosSizeObjArray, dayInputRPosSizeObjArray);
            //指定した日を拡大
            clickMonthMaxZoom();
            setTimeout(function () {
                clickDayZoom();

                setTimeout(function () {
                    func_trimView.midashiSide.turnpage(year, month, monthnum, daynum, clickcount);
                    //////////////////////////////////////
                    setTimeout(function () {
                        //ランドマークを含む記事まで拡大処理
                        func_trimView.midashiSide.ZoomArticle();
                    }, 500);
                    /////////////////////////////////////

                }, 500);
            }, 2000);
        }
        //月単位拡大
        else if (dayMinFlag == false) {

            console.log("月単位拡大->別の月単位拡大");
            clickMonthMaxZoom();
            setTimeout(function () {

                clickDayZoom();

                setTimeout(function () {
                    func_trimView.midashiSide.turnpage(year, month, monthnum, daynum, clickcount);
                    //////////////////////////////////////
                    setTimeout(function () {
                        //ランドマークを含む記事まで拡大処理
                        func_trimView.midashiSide.ZoomArticle();
                    }, 500);
                    /////////////////////////////////////
                }, 500);
            }, 2000);
        }
        //初期画面 -> 月拡大
        else if (dayMinFlag == true) {

            console.log("初期画面->月単位拡大");

            clickMonthMaxZoom();
            dayMinFlag = false;

            setTimeout(function () {

                clickDayZoom();

                //見出しcanvasをズーム後の変形に合わせる
                //func_trimView.midashi.displayOverDiv(u,true);
                setTimeout(function () {
                    func_trimView.midashiSide.turnpage(year, month, monthnum, daynum, clickcount);
                    //////////////////////////////////////
                    setTimeout(function () {
                        //ランドマークを含む記事まで拡大処理
                        func_trimView.midashiSide.ZoomArticle();
                    }, 500);
                    /////////////////////////////////////
                }, 500);
            }, 2000);
        } else {
            console.log("その他の状態->月単位拡大");
            clickMonthMaxZoom();
            setTimeout(function () {

                clickDayZoom();

                //見出しcanvasをズーム後の変形に合わせる
                //func_trimView.midashi.displayOverDiv(u,true);
                setTimeout(function () {
                    func_trimView.midashiSide.turnpage(year, month, monthnum, daynum, clickcount);
                    //////////////////////////////////////
                    setTimeout(function () {
                        //ランドマークを含む記事まで拡大処理
                        func_trimView.midashiSide.ZoomArticle();
                    }, 500);
                    /////////////////////////////////////
                }, 500);
            }, 2000);
        }
    } else {
        console.log(dayMinFlag);
        if (dayMaxFlag == true && $(".zoomingEle")[0]) {

            console.log("拡大状態の日単位紙面->月単位拡大");

            var macth = $(".zoomingEle")[0].id.match(/^[a-zA-Z]*(\d+)_(\d+)/);
            var zmU = parseInt(macth[1]),
                zmD = parseInt(macth[2]);
            var imgNum = zmU * 100 + zmD;


            var zoomObj = func_get_pageData.get_pageInfo(zmU, zmD);

            //console.log({mes:"拡大中の要素あり && クリック要素が「canvasDay」以外"});
            //resetDay(dayDivPosSizeObjArray,dayCanvasPosSizeObjArray,dayInputLPosSizeObjArray,dayInputRPosSizeObjArray);
            //指定した日を拡大
            clickMonthMaxZoom();
            setTimeout(function () {
                clickDayZoom();

                setTimeout(function () {
                    func_trimView.midashiSide.turnpage(year, month, monthnum, daynum, clickcount);
                    //////////////////////////////////////
                    setTimeout(function () {
                        //ランドマークを含む記事まで拡大処理
                        func_trimView.midashiSide.ZoomArticle();
                    }, 500);
                    /////////////////////////////////////
                }, 500);
            }, 2000);
        }
        //月単位拡大
        else if (monthMaxFlag == true && dayMinFlag == true) {

            console.log("月単位拡大->別の月単位拡大");

            clickMonthMaxZoom();
            setTimeout(function () {
                clickDayZoom();

                setTimeout(function () {
                    func_trimView.midashiSide.turnpage(year, month, monthnum, daynum, clickcount);
                    //////////////////////////////////////
                    setTimeout(function () {
                        //ランドマークを含む記事まで拡大処理
                        func_trimView.midashiSide.ZoomArticle();
                    }, 500);
                    /////////////////////////////////////
                }, 500);
            }, 2000);
        }
        //初期画面 -> 月拡大
        else if (monthMaxFlag == false && dayMinFlag == true) {

            console.log("初期画面->月単位拡大");

            clickMonthMaxZoom();
            dayMinFlag = false;

            setTimeout(function () {
                clickDayZoom();
                //ランドマークを含む記事まで拡大処理

                setTimeout(function () {
                    func_trimView.midashiSide.turnpage(year, month, monthnum, daynum, clickcount);
                    //////////////////////////////////////
                    setTimeout(function () {
                        //ランドマークを含む記事まで拡大処理
                        func_trimView.midashiSide.ZoomArticle();
                    }, 500);
                    /////////////////////////////////////
                }, 500);
            }, 2000);
        } else {
            console.log("その他の状態->月単位拡大");
            clickMonthMaxZoom();
            setTimeout(function () {

                clickDayZoom();

                //見出しcanvasをズーム後の変形に合わせる
                //func_trimView.midashi.displayOverDiv(monthnum,true);
                setTimeout(function () {
                    func_trimView.midashiSide.turnpage(year, month, monthnum, daynum, clickcount);
                    //////////////////////////////////////
                    setTimeout(function () {
                        //ランドマークを含む記事まで拡大処理
                        func_trimView.midashiSide.ZoomArticle();
                    }, 500);
                    /////////////////////////////////////
                }, 500);
            }, 2000);
        }
        func_trimView.midashiSide.ruijisarch();
    }
}
