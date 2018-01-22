var conSlid = $("#container");
var sld = $("#imageContainer");

var nextB = $("#next");
var backB = $("#back");

var sldElm = $(".slImg");
var i = 0;
while (i<sldElm.length) {
  sldElm[i].setAttribute("draggable", false);
  i++
}

var x = 0, maxX = 400, diff = 0 ;

function slide(){
   x-=100;
  if( x <= -maxX ){ x = 0 ;}
  sld.animate({"margin-left" : x + "%"},800);
}

function slideBack(){
  x += 100;
  if ( x > 0 ) { x=-300; }
  sld.animate({"margin-left" : x + "%"},800);
}

nextB.click(slide);
backB.click(slideBack);

$(document).on("mousedown touchstart", sld, function(e) {

  var startX = e.pageX || e.originalEvent.touches[0].pageX;
  diff = 0;

  $(document).on("mousemove touchmove", function(e) {

      var xt = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (xt - startX) * 100 / window.innerWidth;
    if( x == 0 && diff > 4 ) {
      event.preventDefault() ;
    } else if (  x == -maxX + 100 && diff < -4 ) {
       event.preventDefault();
    } else {
      sld.css("margin-left", x + diff + "%");
    }
  });
});

$(document).on("mouseup touchend", function(e) {
  $(document).off("mousemove touchmove");
  if(  x == 0 && diff > 4 ) {
      sld.animate({"margin-left" :  0 + "%"},100);
   } else if (  x == -maxX + 100 && diff < 4 ){
       sld.animate({"margin-left" : -maxX + 100 + "%"},100);
   } else {
      if (diff < -10) {
        slide();
      } else if (diff > 10) {
        slideBack();
      } else {
        sld.animate({"margin-left" :  x + "%"},300);
      }
  }
});
