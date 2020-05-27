

$(document).ready(function(){

    //testimonials swiper
    let i = 0, j = 0;
    let photo_items = document.getElementsByClassName('testimonials-slider__item');
    let info_items = document.getElementsByClassName('testimonials__info');
    let info_container = document.getElementsByClassName('vert-flexbox');
    let info_height = 0, h = 0;
    //высота info контэйнера
    info_height_check();
    $(window).on('resize', function(){
        info_height_check();
    });

    function info_height_check(){
        for(let i = 0; i < info_items.length; i++){
            h = info_items[i].offsetHeight;
            if(h > info_height) info_height = h; 
        }
        info_container[0].style.height = h + "px";
    }

    if(photo_items != null && photo_items.length > 1 && info_items.length > 1){
        slide(0);
    }

    $('#testimonials__nav-bt_left').click(function(){
        t_nav_click(-1);
    })

    $('#testimonials__nav-bt_right').click(function(){
        t_nav_click(1);
    })

    function t_nav_click(step) {
        if(photo_items != null && photo_items.length > 1 && info_items.length > 1){ 
            photo_items[i].classList.remove('testimonials-slider__item_active');
            info_items[i].classList.remove('testimonials__info_active');
            if(i == 0 && step == -1){
                i = photo_items.length - 1;
            }
            else if(i == photo_items.length - 1 && step == 1){
                i = 0;
            }
            else{
                i += step;
            }
            photo_items[i].classList.add('testimonials-slider__item_active');
            info_items[i].classList.add('testimonials__info_active');
            slide(++j);
        }
    }

    function slide(index){
        setTimeout(function() {
            if(j == index)
                t_nav_click(1);
        }, 5000);
    }

    //features swiper
    let f_i = 0, f_j = 0;
    let features_items = document.getElementsByClassName('features__sliderItem');
    let status = document.getElementsByClassName('slider-status');

    if(features_items != null && features_items.length > 1){
        f_nav_slide(0);
    }

    $('#features__nav-bt_left').click(function(){
        f_nav_click(-1);
    })

    $('#features__nav-bt_right').click(function(){
        f_nav_click(1);
    })

    function f_nav_click(step) {
        if(features_items != null && features_items.length > 1){ 
            features_items[f_i].classList.remove('features__sliderItem_active');
            if(f_i == 0 && step == -1){
                f_i = features_items.length - 1;
            }
            else if(f_i == features_items.length - 1 && step == 1){
                f_i = 0;
            }
            else{
                f_i += step;
            }
            features_items[f_i].classList.add('features__sliderItem_active');
            if(status.length > 0) status[0].textContent = (f_i + 1) + " / " + features_items.length;
            f_nav_slide(++f_j);
        }
    }

    function f_nav_slide(index){
        setTimeout(function() {
            if(f_j == index)
                f_nav_click(1);
        }, 5000);
    }
    

    //block navigation
    var scrollspeed = 650; // время прокрутки
    
    jQuery('#scroll-bt').click(function() {
        jQuery('html').animate({
        scrollTop: jQuery('.scroll-container').outerHeight() }, scrollspeed + 5000); // плавная медленная прокрутка всего сайта вниз
    });

    jQuery('#scroll-bt-0').click(function() {
        jQuery('html').animate({
        scrollTop: jQuery('#block-0').outerHeight() + jQuery('#block-0').offset().top - 60 }, scrollspeed);
    });

    jQuery('#scroll-bt-1').click(function() {
        jQuery('html').animate({
        scrollTop: jQuery('#block-1').outerHeight() + jQuery('#block-1').offset().top }, scrollspeed);
    });

    jQuery('#scroll-bt-2').click(function() {
        jQuery('html').animate({
        scrollTop: jQuery('#block-2').outerHeight() + jQuery('#block-2').offset().top - 140 }, scrollspeed);
    });

    jQuery('#scroll-bt-3').click(function() {
        jQuery('html').animate({
        scrollTop: jQuery('#block-3').outerHeight() + jQuery('#block-3').offset().top}, scrollspeed);
    });

    jQuery('#page-up-bt').click(function() {
        jQuery('html').animate({
        scrollTop: -jQuery('.scroll-container').outerHeight() - jQuery('.scroll-container').offset().top }, scrollspeed + 3000); // плавная прокрутка в вверх
    });


     //menu bt click
     let click = false;
     let menu = document.getElementById('menu');
     $('#menu-bt').click(function(){
         menu_click();
     })
 
     $('#menu').click(function(){
         if(!menu.classList.contains('float-nav-mobile-show')) return;
         menu_click();
     })
 
     function menu_click(){
         if(!click && menu != null){
            click = true;
            if(!menu.classList.contains('float-nav-mobile-show')){
                menu.style.display = 'flex';                
                menu.classList.remove('float-nav-mobile-hide');
                menu.classList.add('float-nav-mobile-show') 
                setTimeout(function() {
                    click = false;
                }, 1000);                    
             }
             else{
                menu.classList.remove('float-nav-mobile-show'); 
                menu.classList.add('float-nav-mobile-hide');                  
                scrollPrev = 0;   
                setTimeout(function() {
                    menu.style.display = 'none';
                    click = false;
                }, 500);
             }    
             check_scroll_position();        
         }
     }
 
     // Прослушка события изменения ориентации
     let mql = window.matchMedia("(orientation: portrait)");    
     mql.addListener(function(m) {
        //  if(menu.classList.contains('float-nav-mobile-show'))
        //      menu_click();
         if(m.matches) {
             // Изменено на портретный режим
         }
         else {
             // Изменено на горизонтальный режим
             if(screen.width >= 768){
                scrollPrev = 0;
                menu.classList.remove('float-nav-mobile-show'); 
                menu.classList.add('float-nav-mobile-hide');                                     
                menu.style.display = 'none';
                if($(window).scrollTop() < 60){
                    header.addClass('float-nav_transparent');
                    header.removeClass('float-nav_out');
                }
             }
         }
     });

    // floating top bar
    let header = $('.float-nav'),
    scrollPrev = 0;
    check_scroll_position();

    function check_scroll_position(){
        let scrolled = $(window).scrollTop();
        if(menu.classList.contains('float-nav-mobile-show')){
            header.removeClass('float-nav_transparent');
            header.addClass('float-nav_out');
        }
        else{
            if(scrolled < 60){
                header.addClass('float-nav_transparent');
                header.removeClass('float-nav_out');
            }
            else{
                header.removeClass('float-nav_transparent');
            }
        }

        if ( scrolled > 100 && scrolled > scrollPrev ) {
            header.addClass('float-nav_out');
        } else {
            // if(menu.classList.contains('float-nav-mobile-hide'))
            //     header.removeClass('float-nav_out');
        }
        scrollPrev = scrolled;
    }

    $(window).scroll(function() {    
        check_scroll_position();       
    });
    
});