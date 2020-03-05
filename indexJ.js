$(document).ready(function(){
    function changeBg(){
        setTimeout(() => {
            $(".bg").css({"backgroundImage":"url(./source/img/bg_1.png)"});
        }, 35000);
        setTimeout(() => {
            $(".bg").css({"backgroundImage":"url(./source/img/bg_2.png)"});
        }, 70000);
        setTimeout(() => {
            $(".bg").css({"backgroundImage":"url(./source/img/bg_3.png)"});
        }, 105000);
        setTimeout(() => {
            $(".bg").css({"backgroundImage":"url(./source/img/bg_4.png)"});
        }, 185000);
    }  
    //动画效果

    //启动效果动画链
    $("body").fadeIn(5000, function(){
        $(".gl-en").fadeIn(1300, function(){
            $(".gl-cn").html("<span class='ani-1'>作曲</span> 蔡近翰Zoe <span class='ani-1'>作词</span> TetraCalyx <span class='ani-1'>编曲</span> 宫奇Gon<br/>"+
                             "<span class='ani-2'><span class='ani-1'>混音</span> 宫奇Gon <span class='ani-1'>母带处理</span> 宫奇Gon</span>");
                                   
            $(".bg").css({"width":"100%", "height":"100%"});
            $(".bg").fadeIn(2000);
            $(".gl-cn").fadeIn(2000,changeBg());
            
        });
    });

  
 
});