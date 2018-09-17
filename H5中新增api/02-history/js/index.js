/*1.ajax异步加载 渲染页面*/
/*2.渲染什么页面需要和后台提供的地址保持一致*/
/*3.切换历史渲染页面*/
$(function () {
    $('.wrapper').on('click', 'a', function () {
        //渲染页面  页面标识
        var page = $(this).parent().data('page');
        render(page);
        /*地址保持一致*/
        /*追加地址  而且这个地址后台一定要存在*/
        var historyUrl = $(this).attr('href');
        history.pushState(null, null, historyUrl);
        return false;
    });
    /*监听切换历史*/
    window.onpopstate = function () {
        /*获取地址栏信息*/
        var pathname = location.pathname;
        var page = 'index';
        if (pathname.indexOf('index.php') > -1) {
            page = 'index';
        } else if (pathname.indexOf('my.php') > -1) {
            page = 'my'
        } else if (pathname.indexOf('friend.php') > -1) {
            page = 'friend';
        }
        render(page);
    }
});
var render = function (page) {
    /*怎么调用ajax 请求方式  请求地址  请求参数  返回数据结构和意义 */
    /*发出请求*/
    $.ajax({
        type: 'get',
        url: 'api/data.php',
        data: {
            page: page
        },
        dataType: 'json',
        success: function (data) {
            /*渲染页面*/
            /*选中样式*/
            $('[data-page]').removeClass('now');
            /*data返回了当前页面的标识*/
            $('[data-page="' + data.page + '"]').addClass('now');
            /*网页内容*/
            $('.content').html(data.html);
        }
    });
};
