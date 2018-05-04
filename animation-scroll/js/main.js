$(function() {

  var elems = $('.hide-scroll');

  var threshold = [];
  var increment = 0.01;
  for (let i=0; i<1; i+=increment) {
    threshold.push(i);
  }

  // $('.hide-scroll h1').each(function(){
  //   $(this).html(explodeText($(this).text()))
  // })

  $('.hide-scroll h1').each(function(){
    $(this).html(explodeChars($(this).text()))
  })


  TweenMax.set('.hide-scroll h1, .hide-scroll img, .hide-scroll p', {opacity: 0, y: 100});

  var config = {
    root: null,
    rootMargin: '0px', // top right bottom left
    threshold: threshold
  };
  //https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#The_root_element_and_root_margin


  function showBox(t, r, b, l){
    $('body').append('<div id="box" style="width:'+($(window).width()-r-l)+'px;height:'+($(window).height()-t-b)+'px;left:'+l+'px;top:'+t+'px;background:rgba(0,0,0,.5);position:fixed;z-index:10000;"></div>');
  }

  function onIntersection(els) {
    els.forEach(function(el){
      if (el.intersectionRatio > 0) {
        observer.unobserve(el.target);
        //fai qualche cosa su el.target
        ratio = Math.round(el.intersectionRatio * 100);
        // $(el.target).find('span').html(ratio)
        //console.log(el);
        //quando l'elemento è nella viewport
        if(ratio >= 10){
          //l'elemento è entrato
          checkTransitions($(el.target), true);
        }
        else{
          //l'elemento è uscito
          checkTransitions($(el.target), false);
        }
      }
    });
  }

  if (!('IntersectionObserver' in window)) {
    //FALLBACK
    elems.css({opacity : 1});
  } else {

    //showBox(400, 100, 100, 100);
    var observer = new IntersectionObserver(onIntersection, config);
    elems.each(function(index, elem){
      observer.observe(elem);
    });
    $(window).on({
      scroll:function(){
        elems.each(function(index, elem){
          observer.observe(elem);

        });
      }
    });
  }

});

$('html').removeClass('scroll-dir-up').addClass('scroll-dir-down');
//variabile globale che mi dice in che direzione eseguo lo scroll
window.scrollDir = 'down';


var position = $(window).scrollTop();
$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  if (scroll > position) {
    $('html').removeClass('scroll-dir-up').addClass('scroll-dir-down');
    window.scrollDir = 'down';
  }
  else{
    $('html').removeClass('scroll-dir-down').addClass('scroll-dir-up');
    window.scrollDir = 'up';
  }
  position = scroll;
})

function checkTransitions(el, isInViewport){
  if(isInViewport == true){
    //el deve apparire
    checkTransitionsEnterUp(el);
    checkTransitionsEnterDown(el);
  }else {
    //el deve scomparire
    checkTransitionsExitUp(el)
    checkTransitionsExitDown(el);
  }
}


function checkTransitionsEnterDown(el) {
  if($('html').hasClass('scroll-dir-down') && !$(el).hasClass('show')){
    $(el).addClass('show enterDown').removeClass('enterUp').removeClass('exitUp').removeClass('exitDown')
    //inserire transizioni
    //eliminare le possibili transizioni già presenti
    TweenMax.to($(el).find('img, h1, p'), 1.5, {opacity: 1, y:0, ease:Expo.easeOut});
    // TweenMax.staggerFrom($(el).find('span'), 0.8, {opacity:0, y:-80, rotateX:-180, transformOrigin:"0% 50% -50", ease:Back.easeOut}, 0.08);
    TweenMax.staggerFrom($(el).find('span'), 0.8, {opacity:0, scale:0, perspective:400, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.05);
  }
}
function checkTransitionsExitUp(el) {
  if($('html').hasClass('scroll-dir-down') && $(el).hasClass('show')){
    $(el).addClass('show exitUp').removeClass('enterDown').removeClass('enterUp').removeClass('exitDown').removeClass('show')
    //inserire transizioni
    //eliminare le possibili transizioni già presenti
    TweenMax.to($(el).find('img, h1, p'), 1.5, {opacity: 0, y:-100, ease:Expo.easeOut});
    TweenMax.staggerFrom($(el).find('span'), 0.8, {opacity:0, scale:0, perspective:400, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.05);

  }
}

function checkTransitionsEnterUp(el) {
  if($('html').hasClass('scroll-dir-up') && !$(el).hasClass('show')){
    $(el).addClass('show enterUp').removeClass('enterDown').removeClass('exitUp').removeClass('exitDown')
    //inserire transizioni
    //eliminare le possibili transizioni già presenti
     TweenMax.to($(el).find('img, h1, p'), 1.5, {opacity: 1, y:0, ease:Expo.easeOut});
  }
}

function checkTransitionsExitDown(el) {
  if($('html').hasClass('scroll-dir-up') && $(el).hasClass('show')){
    $(el).addClass('show exitDown').removeClass('enterDown').removeClass('enterUp').removeClass('exitUp').removeClass('show')
    //inserire transizioni
    //eliminare le possibili transizioni già presenti
    TweenMax.to($(el).find('img, h1, p'), 1.5, {opacity: 0, y:100, ease:Expo.easeOut});
  }
}


//scroll obbligato ---> snap scroll
//css4
//pure css snap scroll


/*
https://jsfiddle.net/ZzaichikK/MUvsG/

dato lo script modificarlo in modo che allo scroll di pagina gli elementi interessati
entrino nella viewport con un animazione realizata con gsap
allo stesso modo gli elementi dovranno uscire dalla viewport in maniera consona
alla direzione dello scroll di pagina.
*/
