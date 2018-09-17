$(function () {
    /*��ȡ��Ҫ������Ԫ��*/
    var $video = $("video");
    /*��Ϊapi������ԭ����domԪ�ص�*/
    var video = $video.get(0);

    /*���ź���ͣ*/
    var $switch = $(".switch");
    /*��ʱ��*/
    var $total = $(".total");
    /*������*/
    var $line = $(".line");
    /*��ǰ����ʱ��*/
    var $current = $(".current");
    /*ȫ����ť*/
    var $expand = $(".expand");
    /*��ɫ������*/
    var $bar = $(".bar");

    var formatTime = function (time) {
        /*00:00:00*/
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
    };

    /*1. ��Ҫ�ڼ�����ʱ��  ��ʾ����״̬*/
    /*��ǰ��Ƶ���ص����Բ����˾Ϳ����������״̬*/
    video.oncanplay = function () {
        $video.show();
        //��ʱ����ȡvideo.duration
        $total.html(formatTime(video.duration));

    };

    /*2. ����*/
    /*3. ��ͣ*/
    $switch.on('click', function () {
        if ($switch.hasClass('fa-play')) {
            video.play();
            $switch.removeClass('fa-play').addClass('fa-pause');
        } else {
            video.pause();
            $switch.removeClass('fa-pause').addClass('fa-play');
        }
    });

    /*4. ��������ʾ*/
    video.ontimeupdate = function () {
        $current.html(formatTime(video.currentTime));
        //������ʾ,ͨ�����Ȱٷֱ���ʾ
        var ratio = video.currentTime / video.duration;
        var p = ratio * 100 + "%";
        $line.css("width", p);
    };
    /*7. ȫ������*/
    $expand.on("click", function () {
        if ($expand.hasClass("fa-arrows-alt")) {
            //ȫ���͸�����ť
            video.webkitRequestFullScreen();
            $expand.removeClass("fa-arrows-alt").addClass("fa-compress");
        } else {
            //ȡ��ȫ���ͳ��ִ򿪰�ť
            document.webkitCancelFullScreen();
            $expand.removeClass("fa-compress").addClass("fa-arrows-alt");
        }
    });
    /*8. ��Ƶ����������ò���*/
    video.onended = function () {
        video.currentTime = 0;
        $swich.addClass("fa-play").removeClass("fa-pause");
    };

    /*9. Ծ������*/
    //ͨ�������λ�úͽ�������ȵı�����ȥ���㲥��ʱ�䣬�Ѳ����¼����ú��ˣ�����Ҳ�ͻ��Զ��ı�
    $bar.on("click", function (e) {
        var width = $bar.width();
        var place = e.offsetX;
        var time = place / width * video.duration;
        //����
        video.currentTime = time;
        //��������ʱ������¼�

        //��������������ܿ���Ч��������û��ԾǨЧ��ʱ��file��ʽ��ҳ��

    });


});