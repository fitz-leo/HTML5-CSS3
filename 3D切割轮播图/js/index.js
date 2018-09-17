$(function () {
    /*1.点击切换图片*/
    /*定义一个索引*/
    /*看第2张图 -90deg  看第4张图 90deg */
    var index = 0;
    /*开关*/
    var flag = true;
    /*2.点击左边的按钮 上一张*/
    $('.left').on('click', function () {

        if (!flag) return false;
        flag = false;

        index--;
        console.log(index);
        var angle = -index * 90;
        $('li').css('transform', 'rotateX(' + angle + 'deg)').each(function (i, item) {
            /*设置不同的延时*/
            $(this).css('transition-delay', i * 0.25 + 's');
        });
    });
    /*3.点击右边的按钮 下一张*/
    $('.right').on('click', function () {

        if (!flag) return false;
        flag = false;

        index++;
        console.log(index);
        var angle = -index * 90;
        $('li').css('transform', 'rotateX(' + angle + 'deg)').each(function (i, item) {
            /*设置不同的延时*/
            $(this).css('transition-delay', i * 0.25 + 's');
        });
    });
    /*4.优化 重复点击的时候动画会层叠的执行  节流阀 */
    $('li:last').on('transitionend', function () {
        /*最后一部分张图片旋转完毕*/
        flag = true;
    });

});