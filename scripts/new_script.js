$(function(){
  /* 样式调整 */
  // 获取基本视图高度
  var basic_height=$(window).height()-$('header.navi').height();
  var curScroll;
  var body=$('body');


  //初始化首页大图高度
  $('.bg-carousel').height(basic_height);
  $('.slide-main li').width($('html').width());

  /*========================================================*/
  /* 动画效果 */

  /* 遮罩动画效果 */
/*  setTimeout(function(){
    $('.head-cover').fadeOut(2500);
    $('.cover-text').fadeOut(3400);
  },10);*/


  //首页大图轮播
  var bgCarousel={
    element:$('.bg-content li'),
    len: 0,
    curIndex:0,
    nextIndex:1
  };
  bgCarousel.len=bgCarousel.element.length;
  setInterval(function(){
    bgCarousel.element.eq(bgCarousel.curIndex).fadeOut(1000);
    bgCarousel.element.eq(bgCarousel.nextIndex).fadeIn(1100,function(){
      if(bgCarousel.curIndex==bgCarousel.len-1){
        bgCarousel.curIndex=0;
      }
      else{
        bgCarousel.curIndex++;
      }
      if(bgCarousel.nextIndex==bgCarousel.len-1){
        bgCarousel.nextIndex=0;
      }
      else{
        bgCarousel.nextIndex++;
      }
    })
  },4000);

  //设计师轮播效果
  (function () {
    var aPiece=$('.carousel-inner .item');
    var num=aPiece.length;
    var curIndex=0;
    var nextIndex=1;

    setInterval(function () {
      aPiece.eq(curIndex).fadeOut(1600,function(){

      });
      setTimeout(function(){
        aPiece.eq(nextIndex).fadeIn(2200);
        if(curIndex==num-1){
          curIndex=0;
        }
        else
          curIndex+=1;
        if(nextIndex==num-1)
          nextIndex=0;
        else
          nextIndex+=1;
      },500)
    },3000);
  })();



/*交互效果*/
  //导航栏下拉效果
  var nav=$('.slide-nav');
  var navSlide=function(){
    if(!nav.data('slide')){
      nav.height(nav.find('ul').height());
      nav.data('slide',true)
    }
    else{
      nav.height(0);
      nav.data('slide',false)
    }
  };
  $('.menu-toggle-btn').on('click',navSlide);


  /* 细节页划出效果 */
  var slidePageIndex=0;
  var slideLength=0;
  var slideIndex=0;
  var slideMain=$('.designer-slide .slide-main');
  $('.case-list li').on('click', function () {
  //$('.designer-list li').on('click', function () {

    if($('.slide-nav').data('slide')){
      return;
    }

    /*记录当时的scroll*/
    curScroll=$('body').scrollTop();

    slideIndex=$(this).index();
    $('.designer-slide').show();
    $('.workflow-slide').hide();
    if(!slideMain.children().length){
      $('.slide-content').css('left',0);

      var load_content = ($('html').hasClass('en-ver'))?'designer-info-list.html':'designer-info-list.html';
      slideMain.load(load_content, function () {
        $('.designer-slide .slide-main li').width($('body').width());
        $('.designer-slide .slide-main>ul').eq(slideIndex).show(function(){
          slideLength=$(this).find('li').length;
        }).siblings().hide();

      })
    }
    else{
      $('.designer-slide .slide-main>ul').eq(slideIndex).show(function(){
        slideLength=$(this).find('li').length;
        $('.slide-content').css('left',0);
        slideLength=$(this).find('li').length;
      })
        .siblings().hide()
    }
    setTimeout(function(){
      $('.huge-white').show();
    },400);


  });

  var workIndex=0;

  $('.workflow-list li').on('click',function(){
    if($('.slide-nav').data('slide')){
      return;
    }



    var curIndex=$(this).index();
    workIndex=curIndex;
    /*记录当时的scroll*/
    curScroll=$('body').scrollTop();


    $('.designer-slide').hide();
    $('.workflow-slide').show().data('toggle',true);

    $('.workflow-slide .slide-main>div').eq($(this).index()).show(function () {
      $('.slide-content').css('left',0);

      /* 背景滑动效果 */
      var _this=$(this);
      var contain = _this.find('.workflow-animate');
      var image_area=_this.find('.workflow-image').eq(0).find('img');
      var little_img = _this.find('.little-img');     //小图片
      var route = image_area.width()-contain.width();
      var little_len = little_img.length; //小图片数量
      var delay_time= 1000;
      contain.animate({'left':-route+'px'},12000);

      if(little_len<7) {
        delay_time = 3500;
      }

      for(var i=0;i<little_len;i++){
        $(little_img).eq(i).delay(i*delay_time).fadeIn(1100)
      }


    })
      .siblings().hide();

    setTimeout(function(){
      $('.huge-white').show();
    },400);
  });





  //细节页左滑效果
  $('.prev-btn').on('click',function(){
    /* 向右按钮出现 */
    $('.next-btn').show();

    if(slidePageIndex===0){
      $('body').scrollTop(curScroll);
      $('.workflow-animate').stop().css('left',0)
      $('.huge-white').hide();

      $('.slide-content').css('left','100%');

      $('.little-img').stop().hide();

      $('.workflow-slide').data('toggle',false);
    }
    else{
      slidePageIndex-=1;
      $('.slide-main ul').eq(slideIndex).css('left',-slidePageIndex+'00%');
    }

  });


  //细节页右滑
  $('.next-btn').on('click', function () {
    if (slidePageIndex === slideLength-2){
      $(this).hide()
    }

    if(slidePageIndex!==slideLength-1){
      slidePageIndex+=1;
      $('.slide-main ul').eq(slideIndex).css('left',-slidePageIndex+'00%');
    }
  });
  $('.slide-main').on('swipeone',function(_,event){
    if(event.delta[0].lastX<-100){
      $('.next-btn').trigger('click');
    }
    else if(event.delta[0].lastX>100){
      $('.prev-btn').trigger('click')
    }
  });

  // 锁屏和解锁
  function lock(isLock) {
    if(isLock) {
      body.height('100%').css('overflow','hidden');
      html.height('100%');
    }
    else {
      body.height('auto').css('overflow','auto');
      html.height('auto');
    }
  }




  //点击外部隐藏导航栏
  body.on('click', function (e) {
    if($(e.target).closest('.slide-nav,.menu-toggle-btn').length==0){
      if($('.slide-nav').data('slide')){
        $('.menu-toggle-btn').trigger('click');
      }
    }
  });
  $(window).on('scroll',function(){
    if($('.slide-nav').data('slide')){
      $('.menu-toggle-btn').trigger('click');
    }
  });
  //点击滚动导航栏
  $('.slide-nav li').on('click',function(){
    $('html,body').stop().animate({'scrollTop':$('.index-main>section').eq($(this).index()+1).offset().top-$('.navi').height()+'px'})
    $('.menu-toggle-btn').trigger('click');
  });
  $('.nav-bar li').on('click',function(){
    $('html,body').stop().animate({'scrollTop':$('.index-main>section').eq($(this).index()+1).offset().top-$('.navi').height()+'px'})
    $('.menu-toggle-btn').trigger('click');
  });

  /* 导航栏切换效果 */
  $(window).on('scroll', function () {
    var curIndex=0;

    $('.wrapper-title').each(function(i){
      var offsetTop=$(this).position().top;
      var follow_bar=$('.nav-bar');
      var scroll=$('body').scrollTop()+$('.navi').height()+1;
      /* test */
      $('.test').html(offsetTop);

      if((offsetTop <= scroll+ follow_bar.height()+ 1)
        &&(offsetTop>-(scroll+ follow_bar.height()+$('.index-main section').eq(i+1).height()))){
        curIndex=i;

      }
      if ( (offsetTop <= scroll+ follow_bar.height()+ 1)&&(offsetTop>scroll)) {
        $('.bar-list').css('top',(-curIndex)*follow_bar.height()+offsetTop-scroll+'px');


      }
      else if((curIndex===i)&&(offsetTop<scroll+ follow_bar.height())){
        $('.bar-list').css('top',(-curIndex)*follow_bar.height()+'px');
      }
      else if(curIndex===i){
        $('.bar-list').css('top',(1-curIndex)*follow_bar.height()+'px');
      }
    })
  });





  //TODO 提交表单部分
  $('.buttonstyle').on('click',function(){
    var formData = $('.caa-form').serializeArray();
    var name_input = $('input[name=name]').val();
    var email_input = $('input[name=email]').val();
    var phone_input = $('input[name=phone]').val();
    var address_input = $('input[name=address]').val();
    var square_input = $('select[name=square]').val();
    var house_input = $('select[name=house]').val();
    var other_text_input = $('input[name=other_text]').val();
    var require_list = [name_input,email_input,square_input,house_input];

    var ajaxData = {};
    var text = '';
    for (var i = 0; i < formData.length; i++) {
        if (formData[i].name === 'workflow_option') {
          switch (formData[i].value) {
            case 0:
                  text += '沟通需求,';
                  break;
            case 1:
                  text += '现场测量，';
                  break;
            case 2:
                  text += '空间规划，';
                  break;
            case 3:
                  text += '深入设计，';
                  break;
            case 4:
                  text += '工程指导，';
                  break;
            case 5:
                  text += '家居配饰。';
                  break;
          }
        }
    };
    ajaxData.workflow_option = text;
    ajaxData.name = name_input;
    ajaxData.email = email_input;
    ajaxData.phone = phone_input;
    ajaxData.address = address_input;
    ajaxData.square = square_input;
    ajaxData.house = house_input;
    ajaxData.other = other_text_input;
    //验证是否为空
    var status = true;
    if(ajaxData.name === '') {
      alert('名字不可以为空！');
      status = false;
    }
    else if(ajaxData.email === '') {
      alert('邮箱不可以为空！');
      status = false;
    }
    else if(ajaxData.square === 0) {
      alert('请选择住宅面积！');
      status = false;
    }
    else if(ajaxData.house === '') {
      alert('请选择住宅类型！');
      status = false;
    }
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(ajaxData.email)) {
      alert('您的电子邮件格式不正确');
      status = false;
    }
	//console.log(JSON.stringify(formData));
    var formHTML = '<table><tbody><tr><td>编号</td><td>' +
        'XXXXXXXXXXX' +
        '</td></tr><tr><td>姓名</td><td>' +
        ajaxData.name +
        '</td></tr><tr><td>邮箱</td><td>' +
        ajaxData.email +
        '</td></tr><tr><td>电话</td><td>' +
        ajaxData.phone +
        '</td></tr><tr><td>地址</td><td>' +
        ajaxData.address +
        '</td></tr><tr><td>住宅面积</td><td>' +
        ajaxData.square +
        'm&sup2;</td></tr><tr><td>住宅类型</td><td>' +
        ajaxData.house +
        '</td></tr><tr><td>其他</td><td>' +
        ajaxData.workflow_option + ajaxData.other +
        '</td></tr></tbody></table><p>PS:通过WWW.CAAHOME.COM提交</p>';
    if(status) {
      $.ajax({
        url: '/mail.php',
        type: 'POST',
        data: {
          'html': formHTML
        },
        success: function (data) {
          var result = $.parseJSON(data);
          if (result.message === 'success') {
            alert('发送成功！');
          }
        }

      });
    }
  })
});

/*$('.body').css({
  height: window.screen.height + 'px'
});*/
$('.slide-main li img').css({
  height: window.screen.height + 'px'
});