$(function () {
    /*获取需要操作的元素*/
    var $video = $("video");
    /*因为api是属于原生的dom元素的*/
    var video = $video.get(0);

    /*播放和暂停*/
    var $switch = $(".switch");
    /*总时长*/
    var $total = $(".total");
    /*进度条*/
    var $line = $(".line");
    /*当前播放时间*/
    var $current = $(".current");
    /*全屏按钮*/
    var $expand = $(".expand");
    /*灰色进度条*/
    var $bar = $(".bar");

    var formatTime = function (time) {
        /*00:00:00*/
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
    };

    /*1. 需要在加载是时候  显示加载状态*/
    /*当前视频加载到可以播放了就可以隐藏这个状态*/
    video.oncanplay = function () {
        $video.show();
        //总时长获取video.duration
        $total.html(formatTime(video.duration));

    };

    /*2. 播放*/
    /*3. 暂停*/
    $switch.on('click', function () {
        if ($switch.hasClass('fa-play')) {
            video.play();
            $switch.removeClass('fa-play').addClass('fa-pause');
        } else {
            video.pause();
            $switch.removeClass('fa-pause').addClass('fa-play');
        }
    });

    /*4. 进度条显示*/
    video.ontimeupdate = function () {
        $current.html(formatTime(video.currentTime));
        //进度显示,通过长度百分比显示
        var ratio = video.currentTime / video.duration;
        var p = ratio * 100 + "%";
        $line.css("width", p);
    };
    /*7. 全屏操作*/
    $expand.on("click", function () {
        if ($expand.hasClass("fa-arrows-alt")) {
            //全屏和改收起按钮
            video.webkitRequestFullScreen();
            $expand.removeClass("fa-arrows-alt").addClass("fa-compress");
        } else {
            //取消全屏和出现打开按钮
            document.webkitCancelFullScreen();
            $expand.removeClass("fa-compress").addClass("fa-arrows-alt");
        }
    });
    /*8. 视频播放完成重置播放*/
    video.onended = function () {
        video.currentTime = 0;
        $swich.addClass("fa-play").removeClass("fa-pause");
    };

    /*9. 跃进功能*/
    //通过点击的位置和进度条宽度的比例，去计算播放时间，把播放事件设置好了，进度也就会自动改变
    $bar.on("click", function (e) {
        var width = $bar.width();
        var place = e.offsetX;
        var time = place / width * video.duration;
        //设置
        video.currentTime = time;
        //触发播放时间更改事件

        //这个必须加载完才能看到效果，遇到没有跃迁效果时，file形式打开页面

    });


});